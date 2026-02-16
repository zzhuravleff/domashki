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
import { ClearAllButton } from "@/components/ClearDisciplineButton";
import { Chip } from "@heroui/chip";

// Время пар
const PAIR_TIMES: Record<number, [number, number]> = {
    1: [9, 0],
    2: [10, 30],
    3: [12, 40],
    4: [14, 20],
    5: [15, 50],
    6: [17, 50],
  };
  const BUFFER = 15; // 15 минут после начала пары

export default function Home() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [edit, setEdit] = useState<Discipline | null>(null);

  useEffect(() => {
    setDisciplines(getDisciplines());
  }, []);

  const update = (data: Discipline[]) => {
    setDisciplines(data);
    saveDisciplines(data);
  };

  // вычисляем "расстояние" до ближайшей пары с учётом 15 минут буфера
  // возвращает "расстояние до ближайшей пары" или Infinity, если все пары уже прошли
  const getNearestPairDistance = (schedule?: Record<number, number[]>) => {
    if (!schedule) return Infinity;

    const now = new Date();
    const today = now.getDay() === 0 ? 7 : now.getDay(); // 1-7
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    let minDistance = Infinity;

    for (const dayStr in schedule) {
      const day = parseInt(dayStr, 10);
      const pairs = schedule[day] ?? [];

      for (const p of pairs) {
        const [hour, minute] = PAIR_TIMES[p];
        const pairMinutes = hour * 60 + minute;

        let diffDays = day - today;
        if (diffDays < 0) diffDays += 7;

        const totalMinutes = diffDays * 24 * 60 + pairMinutes - currentMinutes;

        // Если пара прошла больше 15 минут назад — игнорируем
        if (totalMinutes >= -BUFFER) {
          if (totalMinutes < minDistance) minDistance = totalMinutes;
        }
      }
    }

    return minDistance;
  };

  const sortFn = (a: Discipline, b: Discipline) =>
    getNearestPairDistance(a.schedule) - getNearestPairDistance(b.schedule);

  const sorted = useMemo(() => {
    const red: Discipline[] = [];
    const purple: Discipline[] = [];
    const green: Discipline[] = [];

    disciplines.forEach((d) => {
      if (d.isLongTerm) purple.push(d);
      else if (d.task) red.push(d);
      else green.push(d);
    });

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
      schedule: {},
    };

    update([...disciplines, newD]);
    setEdit(newD);
  };

  const countWithTasks = disciplines.filter(d => d.task.trim() !== "").length;

  return (
    <main className="min-h-screen bg-gray-100 p-4 flex flex-col gap-4 items-center relative">
      <Chip variant="flat">Версия: {version}</Chip>
      <h1 className="text-3xl font-bold -mb-2">Домашки</h1>
      <p className="mb-4">Всего дисциплин: {disciplines.length}</p>

      {countWithTasks > disciplines.length / 2 && (
        <div className="bg-amber-200/60 text-amber-800 shadow-none rounded-3xl p-4 flex flex-col gap-2 justify-between sticky top-4 backdrop-blur-sm z-10">
          <p className="text-lg font-medium">У тебя много невыполненных заданий!</p>
        </div>
      )}

      {countWithTasks === 0 && disciplines.length > 0 && (
        <div className="bg-green-200/60 text-green-800 shadow-none rounded-3xl p-4 flex flex-col gap-2 justify-between sticky top-4 backdrop-blur-sm z-10">
          <p className="text-lg font-medium">Так держать! У тебя нет невыполненных заданий.</p>
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

      <div className="flex flex-col gap-2">
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

        {disciplines.length > 0 && <ClearAllButton onClear={() => setDisciplines([])} />}
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
        onSave={(task, isLongTerm, schedule) => {
          update(
            disciplines.map((x) =>
              edit && x.id === edit.id
                ? { ...x, task, isLongTerm, schedule }
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
