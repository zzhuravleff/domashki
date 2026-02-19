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

export const TrashIcon = ({fill = "currentColor", ...props}) => {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.23075 1.86207H6.7692C6.42933 1.86207 6.15381 2.13996 6.15381 2.48276V3.10345H9.84613V2.48276C9.84613 2.13996 9.57061 1.86207 9.23075 1.86207ZM11.6923 3.10345V2.48276C11.6923 1.11157 10.5902 0 9.23075 0H6.7692C5.40972 0 4.30765 1.11157 4.30765 2.48276V3.10345H3.07837H1.23061H0.92308C0.413277 3.10345 0 3.52029 0 4.03448C0 4.54868 0.413277 4.96552 0.92308 4.96552H1.30753L1.69856 14.4309C1.78096 16.4256 3.40825 18 5.38768 18H10.6121C12.5915 18 14.2188 16.4256 14.3012 14.4309L14.6922 4.96552H15.0769C15.5867 4.96552 16 4.54868 16 4.03448C16 3.52029 15.5867 3.10345 15.0769 3.10345H14.7691H12.9214H11.6923ZM12.8444 4.96552H11.6923H9.84613H6.15381H4.30765H3.1553L3.54312 14.3534C3.58432 15.3508 4.39796 16.1379 5.38768 16.1379H10.6121C11.6018 16.1379 12.4154 15.3508 12.4566 14.3534L12.8444 4.96552ZM5.23049 7.44828V13.6552C5.23049 14.1694 5.64376 14.5862 6.15357 14.5862C6.66337 14.5862 7.07665 14.1694 7.07665 13.6552V7.44828C7.07665 6.93408 6.66337 6.51724 6.15357 6.51724C5.64376 6.51724 5.23049 6.93408 5.23049 7.44828ZM9.84589 6.51724C10.3557 6.51724 10.769 6.93408 10.769 7.44828V13.6552C10.769 14.1694 10.3557 14.5862 9.84589 14.5862C9.33608 14.5862 8.92281 14.1694 8.92281 13.6552V7.44828C8.92281 6.93408 9.33608 6.51724 9.84589 6.51724Z" fill={fill}/>
    </svg>
  );
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
      <ModalContent className="p-4 gap-4 rounded-4xl mb-8">
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
          <div className="flex gap-2">
            {onDelete && (
              <Button
                color="danger"
                radius="full"
                size="lg"
                variant="flat"
                onPress={onDelete}
                className="font-medium"
                isIconOnly
              >
                <TrashIcon />
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
          </div>

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
