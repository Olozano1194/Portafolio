export type ProjectCategory = "webapp" | "landing";

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  tag: string;
  description: string;
  image: string;
}