import { LayoutDashboard, Calculator, FileText, Info } from "lucide-react";
import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Calculators",
    href: "/calculators",
    icon: Calculator,
  },
  {
    title: "Updates",
    href: "/updates",
    icon: FileText,
  },
  {
    title: "About",
    href: "/about",
    icon: Info,
  },
];
