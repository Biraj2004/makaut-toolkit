"use client";

import { useState, useEffect, useRef } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);

  // Close mobile menu and scroll to top on route change
  useEffect(() => {
    // Wrap in setTimeout to avoid synchronous state update in effect
    const timeoutId = setTimeout(() => {
      setIsMobileOpen(false);
      if (mainRef.current) {
        mainRef.current.scrollTop = 0;
      }
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans antialiased">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 h-full">
        <AppSidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center p-4 border-b border-zinc-800 bg-zinc-950">
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
             <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-zinc-400 cursor-pointer">
                    <Menu className="w-6 h-6" />
                </Button>
             </SheetTrigger>
             <SheetContent side="left" className="p-0 border-r-zinc-800 w-72 bg-zinc-950 border-r-0 text-white">
                <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
                <SheetDescription className="sr-only">
                    Navigation menu for accessing calculators, updates, and resources.
                </SheetDescription>
                <AppSidebar />
             </SheetContent>
          </Sheet>
          <Link href="/" className="ml-4 font-bold text-lg hover:text-emerald-500 transition-colors">
            MAKAUT Toolkit
          </Link>
        </header>

        {/* Page Content */}
        <main ref={mainRef} id="main-scroll-container" className="flex-1 overflow-auto p-4 md:p-8 relative no-scrollbar">
           {children}
        </main>
      </div>
    </div>
  );
}
