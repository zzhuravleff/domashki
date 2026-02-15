"use client";

import { Button } from "@heroui/button";
import {Chip} from "@heroui/chip";
import { Discipline } from "@/types";

const daysLabels = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

type Props = {
  discipline: Discipline;
  onDone: () => void;
  onEdit: () => void;
};

export default function DisciplineCard({ discipline, onDone, onEdit }: Props) {
  const { name, task, isLongTerm, days } = discipline;

  let color = "text-green-500";

  if (isLongTerm) color = "text-purple-500";
  else if (task) color = "text-red-500";

  return (
    <div className="bg-white/70 shadow-none rounded-3xl p-3 flex gap-2 justify-between">
      <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <h3 className={`font-semibold text-lg line-clamp-2 leading-5 ${color}`}>{name}</h3>
            {task && (
              <p className="text-base text-gray-600 mt-1 whitespace-pre-wrap">
                {task}
              </p>
            )}
          </div>
          {/* 🔹 Отображаем дни недели */}
        {days && days.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {days.map((d) => (
              <Chip
                key={d}
                radius="full"
                variant="faded"
              >
                {daysLabels[d - 1]} {/* d: 1..7 */}
              </Chip>
            ))}
          </div>
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
