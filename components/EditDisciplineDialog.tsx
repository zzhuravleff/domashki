"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import {Checkbox} from "@heroui/checkbox";
import { useEffect, useState } from "react";
import { Discipline } from "@/types";

type Props = {
  discipline: Discipline | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: string, isLongTerm: boolean) => void;
  onDelete?: () => void;
};

export default function EditDisciplineDialog({
  discipline,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: Props) {
  const [task, setTask] = useState(discipline?.task ?? "");
  const [longTerm, setLongTerm] = useState(discipline?.isLongTerm ?? false);


  if (!discipline) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="rounded-3xl" placement="auto">
      <ModalContent className="p-4">
        <ModalHeader className="p-0 m-0 pb-2 line-clamp-2 leading-5 max-w-72">{discipline.name}</ModalHeader>

        <ModalBody className="p-0 m-0">
          <Textarea
            label="Задание"
            value={task}
            onValueChange={setTask}
            className=""
          />

          <Checkbox
            isSelected={longTerm}
            onValueChange={setLongTerm}
          >
            Долгосрочно
          </Checkbox>
        </ModalBody>

        <ModalFooter className="p-0 m-0 pt-2 flex justify-between">
          {onDelete && (
            <Button color="danger" radius="full" size="lg" variant="flat" onPress={onDelete} className="font-medium">
              Удалить
            </Button>
          )}

          <Button variant="flat" radius="full" size="lg" onPress={onClose} className="font-medium">
            Отмена
          </Button>

          <Button
            color="primary" radius="full" size="lg" className="font-medium"
            onPress={() => {
              onSave(task, longTerm);
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
