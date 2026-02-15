import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Discipline = {
  id: string;
  name: string;
  task: string;
  isLongTerm: boolean;
  days?: number[]; // ← новое
};
