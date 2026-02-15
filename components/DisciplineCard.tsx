"use client";

import { Button } from "@heroui/button";
import { Discipline } from "@/types";

type Props = {
  discipline: Discipline;
  onDone: () => void;
  onEdit: () => void;
};

export default function DisciplineCard({ discipline, onDone, onEdit }: Props) {
  const { name, task, isLongTerm } = discipline;

  let color = "text-green-500";

  if (isLongTerm) color = "text-purple-500";
  else if (task) color = "text-red-500";

  return (
    <div className="bg-white/70 shadow-none rounded-3xl p-3 flex gap-2 justify-between">
      <div className="flex flex-col">
          <h3 className={`font-semibold text-lg line-clamp-2 leading-5 ${color}`}>{name}</h3>
          {task && (
            <p className="text-base text-gray-600 mt-1 whitespace-pre-wrap">
              {task}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {task && (
            <Button size="lg" color="primary" radius="full"  onPress={onDone} className="font-medium">
              Готово
            </Button>
          )}

          <Button size="lg" variant="flat" radius="full" onPress={onEdit} className="font-medium">
            Ред.
          </Button>
        </div>
    </div>
  );
}
