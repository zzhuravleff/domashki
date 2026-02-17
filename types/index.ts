import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Discipline = {
  id: string;
  name: string;
  task: string;
  isLongTerm: boolean;

  /** Расписание: ключ — день недели (1 = Пн, ..., 6 = Сб), значение — массив выбранных номеров пар */
  schedule?: Record<number, number[]>; 
};