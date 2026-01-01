import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { NoticeItem } from "@/types";
import UpdatesList from "@/components/UpdatesList";

interface ApiResponse {
  data: NoticeItem[];
  status: boolean;
  message: string;
}

// Fetch function
async function getUpdates(): Promise<NoticeItem[]> {
  try {
    const res = await fetch("https://makaut1.ucanapply.com/smartexam/public/api/notice-data", {
      next: { revalidate: 86400 }, // Cache for 24hrs --> 1 day (1 * 24 * 60 * 60)
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch updates: ${res.status}`);
    }

    const json: ApiResponse = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching updates:", error);
    return [];
  }
}

export default async function UpdatesPage() {
  const updates = await getUpdates();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">University Updates</h1>
          <p className="text-zinc-400">Latest announcements and notices from MAKAUT.</p>
        </div>
        <Button asChild variant="outline" className="border-zinc-700 hover:bg-zinc-800">
          <Link href="https://makautexam.net/" target="_blank">
            Visit MAKAUT Portal <ExternalLink className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>

      <UpdatesList updates={updates} />
    </div>
  );
}
