import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Calculator, FileText, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-10">
      
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Badge variant="outline" className="px-3 py-1 text-sm border-emerald-500/50 text-emerald-400 bg-emerald-500/10 mb-4">
          v1.0 Now Live
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent pb-2">
          Your Companion for <br className="hidden md:block" />
          Academic Excellence
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
           The all-in-one toolkit for MAKAUT students. Calculate <span className="underline decoration-wavy decoration-emerald-500/50 underline-offset-4">grades</span>, track university&apos;s latest <span className="underline decoration-wavy decoration-emerald-500/50 underline-offset-4">announcements</span>, and manage your academic journey seamlessly.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="h-12 px-8 text-base bg-emerald-600 hover:bg-emerald-700 text-white rounded-full">
                <Link href="/calculators">
                  Start Calculating <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base border-zinc-700 hover:bg-zinc-900 rounded-full">
                <Link href="/updates">
                  View Updates <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
            </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
         <Card className="bg-zinc-900/50 border-zinc-800 hover:border-emerald-500/30 transition-all hover:bg-zinc-900 group">
            <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Calculator className="w-6 h-6 text-emerald-500" />
                </div>
                <CardTitle>Grade Calculators</CardTitle>
                <CardDescription>Comprehensive tools for CGPA, SGPA, and YGPA.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm text-zinc-400">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500" /> SGPA to Percentage</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500" /> YGPA to Percentage</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500" /> DGPA & CGPA Calculations</li>
                </ul>
            </CardContent>
         </Card>

         <Card className="bg-zinc-900/50 border-zinc-800 hover:border-blue-500/30 transition-all hover:bg-zinc-900 group">
            <CardHeader>
                 <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle>University Updates</CardTitle>
                <CardDescription>Stay informed with the latest announcements.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm text-zinc-400">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-blue-500" /> Exam Schedules</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-blue-500" /> Result Notifications</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-blue-500" /> Sports & Events</li>
                </ul>
            </CardContent>
         </Card>

         <Card className="bg-zinc-900/50 border-zinc-800 hover:border-purple-500/30 transition-all hover:bg-zinc-900 group">
            <CardHeader>
                 <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-purple-500" />
                </div>
                <CardTitle>Student Resources</CardTitle>
                <CardDescription>Essentials for your 4-year journey.</CardDescription>
            </CardHeader>
             <CardContent>
                <ul className="space-y-2 text-sm text-zinc-400">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500" /> Syllabus Access (Soon)</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500" /> PYQ Repository (Soon)</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500" /> Student Community (Later)</li>
                </ul>
            </CardContent>
         </Card>
      </section>
      
      {/* Footer Note */}
      <div className="text-center pt-10 border-t border-zinc-900">
        <p className="text-zinc-600 text-sm">
            Designed & Developed by <Link href="/about" className="text-zinc-500 hover:text-zinc-300 underline underline-offset-4">Biraj Sarkar</Link>
        </p>
      </div>
    </div>
  );
}
