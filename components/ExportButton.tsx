import { Button } from "@heroui/button";
import { Discipline } from "@/types";
import { getDisciplines } from "@/lib/storage";

export function ExportButton() {
  const handleExport = () => {
    const data: Discipline[] = getDisciplines();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "domashki.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Button color="primary" size="lg" variant="solid" radius="full" className="font-medium" onPress={handleExport}>
      Экспорт
    </Button>
  );
}
