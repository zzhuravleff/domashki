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
import {Tabs, Tab} from "@heroui/tabs";
import { Checkbox } from "@heroui/checkbox";
import { useEffect, useState } from "react";
import { Discipline } from "@/types";
import { Chip } from "@heroui/chip";

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

const daysLabels = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
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
  const [selectedTab, setSelectedTab] = useState("task");

  // обновляем состояние, когда открываем другую дисциплину
  useEffect(() => {
    if (!discipline) return;
    setTask(discipline.task ?? "");
    setLongTerm(discipline.isLongTerm ?? false);
    setSchedule(discipline.schedule ?? {});
  }, [discipline?.id]);

  if (!discipline) return null;

  // function toggleDay(day: number) {
  //   setSchedule((prev) => {
  //     const copy = { ...prev };
  //     if (copy[day]) delete copy[day]; // выключаем день
  //     else copy[day] = []; // включаем день без пар
  //     return copy;
  //   });
  // }

  function togglePair(day: number, pair: number) {
    setSchedule((prev) => {
      const dayPairs = prev[day] ?? [];

      let newPairs: number[];

      if (dayPairs.includes(pair)) {
        // убираем пару
        newPairs = dayPairs.filter((p) => p !== pair);
      } else {
        // добавляем пару
        newPairs = [...dayPairs, pair];
      }

      const updated = { ...prev };

      if (newPairs.length === 0) {
        // если пар не осталось — удаляем день
        delete updated[day];
      } else {
        updated[day] = newPairs;
      }

      return updated;
    });
  }


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="rounded-xl"
      placement="bottom"
      shouldBlockScroll={true}
      hideCloseButton={true}
      classNames={{
        base: "m-2",
        wrapper: "max-w-screen"
      }}
      >
      <ModalContent className="p-4 gap-4 rounded-4xl">
        <ModalHeader className="p-0 m-0 line-clamp-2 leading-3 max-w-72 text-xl">
          {discipline.name}
        </ModalHeader>

        <ModalBody className="p-0 m-0 space-y-4">

          <Tabs className="w-full" classNames={{tabList:"w-full"}} color="primary" radius="full" size="lg" selectedKey={selectedTab} onSelectionChange={(key) => setSelectedTab(key as string)}>
            <Tab title="Задание" key="task" />
            <Tab title="Дни занятий" key="days" />
          </Tabs>

          {selectedTab === "task" && 
          <Textarea
            variant="flat"
            value={task}
            placeholder="Введите ваше задание"
            size="lg"
            radius="lg"
            minRows={6}
            onValueChange={setTask}
            classNames={{
              label: "text-lg",
              input: "text-base",
            }}
            />
          }

          {selectedTab === "task" && (
            <Checkbox isSelected={longTerm} onValueChange={setLongTerm} size="lg">
              Долгосрочно
            </Checkbox>
          )}

          {/* дни недели и пары */}
          {selectedTab === "days" && (
          <div className="w-full">
            {/* <p className="text-lg mb-2">Дни занятий</p> */}

            <div className="flex flex-wrap gap-1 items-center w-full">
              {daysLabels.map((label, i) => {
                const day = i + 1;
                // const dayActive = !!schedule[day];

                return (
                  <div key={day} className="flex w-full items-center gap-3">
                    {/* кнопка дня */}
                    <Chip
                      className="font-medium items-center text-center"
                      classNames={{
                        content: "w-10"
                      }}
                      size="lg"
                      radius="full"
                      variant="flat"
                      color={schedule[day]?.length ? "primary" : "default"}
                    >
                      {label}
                    </Chip>

                    {/* кнопки пар под выбранным днём */}
                    {/* {dayActive && ( */}
                      <div className="flex gap-2 items-center">
                        {pairs.map((p) => {
                          const pairActive = schedule[day]?.includes(p);
                          return (
                            <Button
                              key={p}
                              radius="sm"
                              variant={pairActive ? "bordered" : "flat"}
                              color={pairActive ? "primary" : "default"}
                              onPress={() => togglePair(day, p)}
                              className="flex items-center justify-center w-9 h-9 p-0 min-w-0 text-xs font-medium"
                            >{pairActive && p}
                            </Button>
                          );
                        })}
                      </div>
                    {/* )} */}
                  </div>
                );
              })}
            </div>
          </div>
          )}
          
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
            color="primary"
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
