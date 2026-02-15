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
    days: number[]
  ) => void;
  onDelete?: () => void;
};

const daysLabels = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export default function EditDisciplineDialog({
  discipline,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: Props) {
  const [task, setTask] = useState("");
  const [longTerm, setLongTerm] = useState(false);
  const [days, setDays] = useState<number[]>([]);

  // обновляем состояние, когда открываем другую дисциплину
  useEffect(() => {
    if (!discipline) return;
    setTask(discipline.task ?? "");
    setLongTerm(discipline.isLongTerm ?? false);
    setDays(discipline.days ?? []);
  }, [discipline?.id]);

  if (!discipline) return null;

  function toggle(day: number) {
    setDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="rounded-3xl"
      placement="auto"
    >
      <ModalContent className="p-4 gap-4">
        <ModalHeader className="p-0 m-0 pb-2 line-clamp-2 leading-5 max-w-72">
          {discipline.name}
        </ModalHeader>

        <ModalBody className="p-0 m-0 space-y-4">
          <Textarea
            label="Задание"
            value={task}
            onValueChange={setTask}
          />

          <Checkbox isSelected={longTerm} onValueChange={setLongTerm}>
            Долгосрочно
          </Checkbox>

          {/* дни недели */}
          <div>
            <p className="text-sm mb-2 text-default-500">
              Дни занятий
            </p>

            <div className="flex gap-2 flex-wrap">
              {daysLabels.map((label, i) => {
                const day = i + 1;
                const active = days.includes(day);

                return (
                  <Button
                    key={day}
                    className="font-medium px-0"
                    size="md"
                    radius="full"
                    variant={active ? "solid" : "flat"}
                    color={active ? "primary" : "default"}
                    onPress={() => toggle(day)}
                  >
                    {label}
                  </Button>
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
              onSave(task, longTerm, days);
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
