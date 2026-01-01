"use client";

import { useState } from "react";
import { NoticeItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, AlertCircle, ChevronDown } from "lucide-react";
import Link from "next/link";

interface UpdatesListProps {
  updates: NoticeItem[];
}

export default function UpdatesList({ updates }: UpdatesListProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  const maxItems = 12;

  // Ensure we never handle more than maxItems even if API returns more
  const cappedUpdates = updates.slice(0, maxItems);
  const visibleUpdates = cappedUpdates.slice(0, visibleCount);
  
  const showViewMore = visibleCount < cappedUpdates.length;
  const showViewLess = visibleCount >= maxItems && cappedUpdates.length > 6;
  
  // Logic: 
  // - Top 3 items ALWAYS get the NEW badge (index < 3).
  // - "View More" expands to 12.
  // - "View Less" shrinks to 6.

  const handleToggleView = () => {
    if (showViewLess) {
        const scrollContainer = document.getElementById("main-scroll-container");
        if (scrollContainer) {
            scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        setVisibleCount(6);
    } else {
        setVisibleCount(12);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {visibleUpdates.length > 0 ? (
            visibleUpdates.map((update, index) => (
            <Card key={index} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col group animate-in fade-in zoom-in-95 duration-300">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400 group-hover:border-zinc-600 transition-colors">
                        {update.notice_date}
                    </Badge>
                     {/* Rule: Only top 3 items get the NEW badge */}
                     {index < 3 && (
                        <Badge className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20 shadow-[0_0_10px_-3px_rgba(239,68,68,0.5)]">NEW</Badge>
                     )}
                </div>
                <CardTitle className="text-lg leading-snug line-clamp-3 group-hover:text-emerald-400 transition-colors">
                   {update.notice_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-auto pt-3">
                <Button asChild className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 shadow-none cursor-pointer">
                  <Link href={update.file_path} target="_blank">
                    Read Notice <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
             <div className="col-span-full py-12 text-center space-y-4">
                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800/50">
                    <AlertCircle className="w-8 h-8 text-zinc-500" />
                 </div>
                 <div className="space-y-1">
                    <h3 className="text-lg font-medium">No updates found</h3>
                    <p className="text-zinc-500 max-w-sm mx-auto">
                        Could not fetch the latest updates at this moment. Please check the official website directly.
                    </p>
                 </div>
                 <Button asChild variant="outline" className="border-zinc-700 cursor-pointer">
                     <Link href="https://makautexam.net/" target="_blank">
                        Visit Official Website
                     </Link>
                 </Button>
             </div>
        )}
      </div>

      {(showViewMore || showViewLess) && (
        <div className="flex justify-center pt-2">
            <Button 
                variant="outline" 
                onClick={handleToggleView} 
                className="border-zinc-700 hover:bg-zinc-800 text-zinc-300 min-w-[200px] cursor-pointer"
            >
                {showViewLess ? (
                    <>View Less <ChevronDown className="ml-2 w-4 h-4 rotate-180 transition-transform" /></>
                ) : (
                    <>View More <ChevronDown className="ml-2 w-4 h-4 transition-transform" /></>
                )}
            </Button>
        </div>
      )}
    </div>
  );
}
