"use client";

import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

const DISCIPLINES = [
  "Иностранный язык",
  "Информатика",
  "История России",
  "Линейная алгебра и аналитическая геометрия",
  "Математический анализ",
  "Объектно-ориентированное программирование",
  "Ознакомительная практика",
  "Основы российской государственности",
  "Русский язык и культура речи",
  "Системы искусственного интеллекта и большие данные",
  "Структуры и алгоритмы обработки данных",
  "Физика",
  "Физика.ЛАБ",
  "Физическая культура и спорт (элективная дисциплина)",
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (name: string) => void;
};

export default function AddDisciplineDialog({
  isOpen,
  onClose,
  onSelect,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="auto" className="rounded-3xl">
      <ModalContent className="p-4">
        <ModalHeader className="m-0 p-0 pb-2">Добавить дисциплину</ModalHeader>

        <ModalBody className="p-0 m-0">
          <Autocomplete
            label="Выберите дисциплину"
            onSelectionChange={(key) => {
              if (!key) return;
              onSelect(String(key));
              onClose();
            }}
          >
            {DISCIPLINES.map((d) => (
              <AutocompleteItem key={d}>{d}</AutocompleteItem>
            ))}
          </Autocomplete>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
