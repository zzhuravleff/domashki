"use client";

import { Discipline } from "@/types";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";

const daysLabels = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
const PAIRS = [1, 2, 3, 4, 5, 6]; // номера пар

type Props = {
  discipline: Discipline;
  onDone: () => void;
  onEdit: () => void;
};

export default function DisciplineCard({ discipline, onDone, onEdit }: Props) {
  const { name, task, isLongTerm, schedule } = discipline;

  let color = "text-green-500";
  if (isLongTerm) color = "text-purple-500";
  else if (task) color = "text-red-500";

  // фильтруем дни, в которых есть хотя бы одна пара
  const activeDays = Object.keys(schedule || {})
    .map(Number)
    .filter((day) => (schedule?.[day]?.length ?? 0) > 0);

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
          
          {/* Дни недели с кружками пар */}
          <div className="flex flex-wrap gap-1 mt-2">
            {activeDays.map((day) => {
              const dayPairs = schedule?.[day] ?? [];

              return (
                <div key={day} className="flex flex-col items-center gap-[2px]">
                  {/* День недели */}
                  <Chip radius="full" variant="faded">
                    {daysLabels[day - 1]}
                  </Chip>

                  {/* Кружки пар */}
                  <div className="flex gap-[2px]">
                    {PAIRS.map((p) => {
                      const hasClass = dayPairs.includes(p);
                      return (
                        <span
                          key={p}
                          className={`w-1 h-1 rounded-full ${
                            hasClass ? "bg-blue-500" : "bg-gray-300"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
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


