"use client";

import { Button } from "@heroui/button";
import { saveDisciplines } from "@/lib/storage";

type Props = {
  onClear?: () => void; // колбэк для обновления UI после очистки
};

export function ClearAllButton({ onClear }: Props) {
  const handleClear = () => {
    if (!confirm("Вы уверены, что хотите удалить все дисциплины?")) return;

    saveDisciplines([]); // очищаем localStorage
    onClear?.(); // обновляем состояние в компоненте, если передан колбэк
  };

  return (
    <Button
      color="danger"
      size="lg"
      variant="light"
      radius="full"
      onPress={handleClear}
    >
      Удалить все
    </Button>
  );
}
