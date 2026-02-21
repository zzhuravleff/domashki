"use client";

import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import { ScrollShadow } from "@heroui/scroll-shadow";

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
      <ModalContent className="p-4 rounded-4xl mb-8">
        <ModalHeader className="m-0 p-0 pb-2 text-xl">Добавить дисциплину</ModalHeader>

        <ModalBody className="p-0 m-0">
          {/* <Autocomplete
            label="Выберите дисциплину"
            radius="lg"
            size="lg"
            onSelectionChange={(key) => {
              if (!key) return;
              onSelect(String(key));
              onClose();
            }}
          >
            {DISCIPLINES.map((d) => (
              <AutocompleteItem key={d}>{d}</AutocompleteItem>
            ))}
          </Autocomplete> */}
          <ScrollShadow className="h-[300px]">
            {DISCIPLINES.map((d) => (
              <Button
                key={d}
                className="my-1"
                size="lg"
                variant="flat"
                fullWidth={true}
                onPress={() => {
                  onSelect(d);
                  onClose();
                }}
              >
                <p className="truncate">{d}</p>
              </Button>
            ))}
          </ScrollShadow>

          
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
