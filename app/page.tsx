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
  useEffect(() => {
  setDisciplines(getDisciplines());
  }, []);
  const [addOpen, setAddOpen] = useState(false);
  const [edit, setEdit] = useState<Discipline | null>(null);

  const update = (data: Discipline[]) => {
    setDisciplines(data);
    saveDisciplines(data);
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
      a.name.localeCompare(b.name);

    return [
      ...red.sort(sortFn),
      ...purple.sort(sortFn),
      ...green.sort(sortFn),
    ];
  }, [disciplines]);

  const handleSelect = (name: string) => {
    const existing = disciplines.find((d) => d.name === name);

    if (existing) {
      // логика: не создаём дубликат, открываем редактирование
      setEdit(existing);
      return;
    }

    const newD: Discipline = {
      id: Date.now().toString(),
      name,
      task: "",
      isLongTerm: false,
    };

    update([...disciplines, newD]);
    setEdit(newD);
  };

  

  return (
    <main className="min-h-screen bg-gray-100 p-4 flex flex-col gap-2 items-center">
      <h1 className="text-3xl font-bold mb-4">Домашки</h1>

      <section className="max-w-3xl flex flex-col gap-2">
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

      <Button color="default" className="font-medium" variant="light" size="lg" onPress={() => setAddOpen(true)}>
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
        onSave={(task, isLongTerm) => {
          update(
            disciplines.map((x) =>
              edit && x.id === edit.id ? { ...x, task, isLongTerm } : x
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
