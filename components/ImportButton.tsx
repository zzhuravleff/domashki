import { Button } from "@heroui/button";
import { Discipline } from "@/types";
import { saveDisciplines } from "@/lib/storage";

type Props = {
  onImport?: (data: Discipline[]) => void;
};

export function ImportButton({ onImport }: Props) {
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result;
        if (!content) return;

        const data: Discipline[] = JSON.parse(content.toString());
        saveDisciplines(data); // сохраняем в localStorage
        onImport?.(data); // если нужно обновить UI
      } catch (err) {
        alert("Ошибка при загрузке файла. Проверьте формат JSON.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <input
        type="file"
        accept=".json"
        onChange={handleImport}
        id="import-input"
        style={{ display: "none" }}
      />
      <Button
        color="primary"
        className="font-medium"
        size="lg"
        variant="solid"
        radius="full"
        onPress={() => document.getElementById("import-input")?.click()}
      >
        Импорт
      </Button>
    </>
  );
}
