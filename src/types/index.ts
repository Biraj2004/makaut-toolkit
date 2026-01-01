export type UpdateCategory = "General" | "Event" | "Exam" | "Scholarship";

export interface UniversityUpdate {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string or formatted
  category: UpdateCategory;
  source: string;
  link?: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface NoticeItem {
  id: number;
  notice_date: string;
  notice_title: string;
  file_path: string;
  status: string;
  new_path?: string | null;
  imp?: string;
}
