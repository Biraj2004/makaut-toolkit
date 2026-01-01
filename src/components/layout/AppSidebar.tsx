"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/config/nav";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Github, Settings2 } from "lucide-react"; // Settings2 as placeholder logo
import Image from "next/image";

export function AppSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div className={cn("flex flex-col h-full bg-zinc-950 text-zinc-400 border-r border-zinc-800", className)}>
      {/* Header */}
      {/* Header */}
      <Link href="/" className="p-6 flex items-center gap-3 text-zinc-100 hover:text-emerald-500 transition-colors">
        <Settings2 className="w-6 h-6 text-emerald-500" />
        <span className="font-bold text-lg tracking-wide">MAKAUT Toolkit</span>
      </Link>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium",
                  isActive
                    ? "bg-zinc-800 text-zinc-100"
                    : "hover:bg-zinc-900 hover:text-zinc-200"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.title}
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer / Developer Profile */}
      <div className="p-4 mt-auto">
        <Separator className="mb-4 bg-zinc-800" />
        <div className="flex items-center gap-3 px-2">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0 border border-zinc-700 relative">
                 <Image 
                    src="https://github.com/Biraj2004.png" 
                    alt="Biraj Sarkar"
                    fill
                    sizes="(max-width: 768px) 100vw, 40px"
                    className="object-cover"
                 />
            </div>
            <div className="flex flex-col overflow-hidden">
                <span className="font-semibold text-zinc-200 truncate">Biraj Sarkar</span>
                <a 
                    href="https://github.com/Biraj2004" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-500 truncate flex items-center gap-2 hover:text-emerald-500 transition-colors"
                >
                    View GitHub <Github className="w-3 h-3" />
                </a>
            </div>
        </div>
      </div>
    </div>
  );
}
