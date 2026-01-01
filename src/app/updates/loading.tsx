import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="space-y-2">
        <Skeleton className="h-10 w-64 bg-zinc-800" />
        <Skeleton className="h-5 w-96 bg-zinc-800" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="bg-zinc-900 border-zinc-800 flex flex-col">
            <CardHeader className="pb-2 space-y-3">
              <div className="flex justify-between items-start gap-2">
                 <Skeleton className="h-5 w-24 bg-zinc-800" />
                 {i < 3 && <Skeleton className="h-5 w-12 bg-zinc-800" />}
              </div>
              <Skeleton className="h-6 w-full bg-zinc-800" />
              <Skeleton className="h-6 w-3/4 bg-zinc-800" />
            </CardHeader>
            <CardContent className="mt-auto pt-4">
              <Skeleton className="h-10 w-full bg-zinc-800" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
