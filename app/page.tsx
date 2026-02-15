"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@heroui/button";
import AddDisciplineDialog from "@/components/AddDisciplineDialog";
import EditDisciplineDialog from "@/components/EditDisciplineDialog";
import DisciplineCard from "@/components/DisciplineCard";
import { Discipline } from "@/types";
import { getDisciplines, saveDisciplines } from "@/lib/storage";
import { version } from "@/lib/version";
import { ExportButton } from "@/components/ExportButton";
import { ImportButton } from "@/components/ImportButton";

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

  // вычисляем ближайший день пары
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

  // сортировка
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

  const handleSelect = (name: string) => {
    const existing = disciplines.find((d) => d.name === name);
    if (existing) {
      setEdit(existing);
      return;
    }

    const newD: Discipline = {
      id: Date.now().toString(),
      name,
      task: "",
      isLongTerm: false,
      days: [],
    };

    update([...disciplines, newD]);
    setEdit(newD);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 flex flex-col gap-2 items-center">
      <p>Версия: {version}</p>
      <h1 className="text-3xl font-bold -mb-2">Домашки</h1>
      <p className="mb-4">Всего дисциплин: {disciplines.length}</p>

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
        variant="flat"
        size="lg"
        radius="full"
        onPress={() => setAddOpen(true)}
      >
        Добавить дисциплину
      </Button>

      <div className="flex gap-2">
        <ExportButton />
        <ImportButton onImport={(data) => setDisciplines(data)} />
      </div>

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
