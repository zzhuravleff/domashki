"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@heroui/button";
import AddDisciplineDialog from "@/components/AddDisciplineDialog";
import EditDisciplineDialog from "@/components/EditDisciplineDialog";
import DisciplineCard from "@/components/DisciplineCard";
import { Discipline } from "@/types";
import { getDisciplines, saveDisciplines } from "@/lib/storage";

export default function Home() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [edit, setEdit] = useState<Discipline | null>(null);

  // загрузка из localStorage
  useEffect(() => {
    setDisciplines(getDisciplines());
  }, []);

  const update = (data: Discipline[]) => {
    setDisciplines(data);
    saveDisciplines(data);
  };

  /**
   * Вычисляем через сколько дней будет ближайшая пара
   * меньше = выше в списке
   */
  const getNearestDayDistance = (days?: number[]) => {
    if (!days || days.length === 0) return 999;

    const today = new Date().getDay(); // 0 вс, 1 пн ...
    const normalizedToday = today === 0 ? 7 : today; // делаем 1-7

    let min = 999;

    for (const d of days) {
      const diff = d >= normalizedToday
        ? d - normalizedToday
        : 7 - normalizedToday + d;

      if (diff < min) min = diff;
    }

    return min;
  };

  // 🔥 новая сортировка
  const sorted = useMemo(() => {
    const red: Discipline[] = [];
    const purple: Discipline[] = [];
    const green: Discipline[] = [];

    disciplines.forEach((d) => {
      if (d.isLongTerm) purple.push(d);
      else if (d.task) red.push(d);
      else green.push(d);
    });

    const sortFn = (a: Discipline, b: Discipline) =>
      getNearestDayDistance(a.days) - getNearestDayDistance(b.days);

    return [
      ...red.sort(sortFn),
      ...purple.sort(sortFn),
      ...green.sort(sortFn),
    ];
  }, [disciplines]);

  // выбор дисциплины из автокомплита
  const handleSelect = (name: string) => {
    const existing = disciplines.find((d) => d.name === name);

    if (existing) {
      // если есть → редактируем
      setEdit(existing);
      return;
    }

    const newD: Discipline = {
      id: Date.now().toString(),
      name,
      task: "",
      isLongTerm: false,
      days: [], // важно
    };

    update([...disciplines, newD]);
    setEdit(newD);
  };

  // обновление
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const handler = () => setUpdateAvailable(true);
    window.addEventListener("sw-update", handler);
    return () => window.removeEventListener("sw-update", handler);
  }, []);

  const refreshApp = () => {
    navigator.serviceWorker.getRegistration().then((reg) => {
      reg?.waiting?.postMessage("SKIP_WAITING");
      window.location.reload();
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 flex flex-col gap-2 items-center">
      <h1 className="text-3xl font-bold mb-4">Домашки</h1>

      {updateAvailable && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-xl shadow-xl flex gap-3 items-center">
          <span>Доступно обновление</span>

          <Button size="sm" color="primary" onPress={refreshApp}>
            Обновить
          </Button>
        </div>
      )}

      <section className="max-w-3xl w-full flex flex-col gap-2">
        {sorted.map((d) => (
          <DisciplineCard
            key={d.id}
            discipline={d}
            onDone={() => {
              update(
                disciplines.map((x) =>
                  x.id === d.id ? { ...x, task: "" } : x
                )
              );
            }}
            onEdit={() => setEdit(d)}
          />
        ))}
      </section>

      <Button
        color="default"
        className="font-medium"
        variant="light"
        size="lg"
        radius="full"
        onPress={() => setAddOpen(true)}
      >
        Добавить дисциплину
      </Button>

      <AddDisciplineDialog
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onSelect={handleSelect}
      />

      <EditDisciplineDialog
        key={edit?.id}
        discipline={edit}
        isOpen={!!edit}
        onClose={() => setEdit(null)}
        onSave={(task, isLongTerm, days) => {
          update(
            disciplines.map((x) =>
              edit && x.id === edit.id
                ? { ...x, task, isLongTerm, days }
                : x
            )
          );
        }}
        onDelete={() => {
          if (!edit) return;
          update(disciplines.filter((x) => x.id !== edit.id));
          setEdit(null);
        }}
      />
    </main>
  );
}
