"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { useEffect, useState } from "react";
import { Discipline } from "@/types";

type Props = {
  discipline: Discipline | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    task: string,
    isLongTerm: boolean,
    schedule: Record<number, number[]>
  ) => void;
  onDelete?: () => void;
};

const daysLabels = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const pairs = [1, 2, 3, 4, 5, 6]; // номера пар

export default function EditDisciplineDialog({
  discipline,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: Props) {
  const [task, setTask] = useState("");
  const [longTerm, setLongTerm] = useState(false);
  const [schedule, setSchedule] = useState<Record<number, number[]>>({});

  // обновляем состояние, когда открываем другую дисциплину
  useEffect(() => {
    if (!discipline) return;
    setTask(discipline.task ?? "");
    setLongTerm(discipline.isLongTerm ?? false);
    setSchedule(discipline.schedule ?? {});
  }, [discipline?.id]);

  if (!discipline) return null;

  function toggleDay(day: number) {
    setSchedule((prev) => {
      const copy = { ...prev };
      if (copy[day]) delete copy[day]; // выключаем день
      else copy[day] = []; // включаем день без пар
      return copy;
    });
  }

  function togglePair(day: number, pair: number) {
    setSchedule((prev) => {
      const dayPairs = prev[day] ?? [];
      const newPairs = dayPairs.includes(pair)
        ? dayPairs.filter((p) => p !== pair)
        : [...dayPairs, pair];
      return { ...prev, [day]: newPairs };
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="rounded-3xl" placement="auto">
      <ModalContent className="p-4 gap-4">
        <ModalHeader className="p-0 m-0 pb-2 line-clamp-2 leading-5 max-w-72">
          {discipline.name}
        </ModalHeader>

        <ModalBody className="p-0 m-0 space-y-4">
          <Textarea label="Задание" value={task} onValueChange={setTask} />

          <Checkbox isSelected={longTerm} onValueChange={setLongTerm}>
            Долгосрочно
          </Checkbox>

          {/* дни недели и пары */}
          <div>
            <p className="text-sm mb-2 text-default-500">Дни занятий</p>

            <div className="flex flex-wrap gap-1">
              {daysLabels.map((label, i) => {
                const day = i + 1;
                const dayActive = !!schedule[day];

                return (
                  <div key={day} className="flex gap-1">
                    {/* кнопка дня */}
                    <Button
                      className="font-medium"
                      size="md"
                      radius="full"
                      variant={dayActive ? "solid" : "flat"}
                      color={dayActive ? "primary" : "default"}
                      onPress={() => toggleDay(day)}
                    >
                      {label}
                    </Button>

                    {/* кнопки пар под выбранным днём */}
                    {dayActive && (
                      <div className="flex gap-1 flex-wrap">
                        {pairs.map((p) => {
                          const pairActive = schedule[day]?.includes(p);
                          return (
                            <Button
                              key={p}
                              size="sm"
                              radius="full"
                              variant={pairActive ? "bordered" : "flat"}
                              color={pairActive ? "primary" : "default"}
                              onPress={() => togglePair(day, p)}
                              className="flex items-center justify-center w-6 h-6 p-0 min-w-0 text-xs"
                            >{pairActive && p}
                            </Button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="p-0 m-0 pt-2 flex justify-between">
          {onDelete && (
            <Button
              color="danger"
              radius="full"
              size="lg"
              variant="flat"
              onPress={onDelete}
              className="font-medium"
            >
              Удалить
            </Button>
          )}

          <Button
            variant="flat"
            radius="full"
            size="lg"
            onPress={onClose}
            className="font-medium"
          >
            Отмена
          </Button>

          <Button
            color="success"
            radius="full"
            size="lg"
            className="font-medium"
            onPress={() => {
              onSave(task, longTerm, schedule);
              onClose();
            }}
          >
            Сохранить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
