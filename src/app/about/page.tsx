import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="space-y-18 max-w-4xl mx-auto">
       <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-linear-to-br from-white to-zinc-400 bg-clip-text text-transparent">About MAKAUT Student Toolkit</h1>
        <p className="text-zinc-400 text-sm max-w-lg mx-auto">Empowering MAKAUT students with the right tools and real-time information to navigate their academic journey.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm h-full">
            <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-1 h-6 bg-emerald-500 rounded-full inline-block"></span>
                Our Mission
            </CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-300 leading-relaxed text-sm space-y-3">
            <p>
                We aim to build a <span className="text-white font-medium">single, reliable platform</span> for the entire MAKAUT community. No more searching through scattered notices or complex formulas.
            </p>
            <p>
                From calculating your DGPA with precision to getting instant notifications about exam schedules, this toolkit is designed to be your academic companion throughout your degree.
            </p>
            </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm h-full flex flex-col">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-500 rounded-full inline-block"></span>
                    Meet the Developer
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0 border-2 border-zinc-700 shadow-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src="https://github.com/Biraj2004.png" 
                            alt="Biraj Sarkar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-bold text-lg text-white">Biraj Sarkar</h3>
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 text-[10px] uppercase tracking-wider border-emerald-500/20">
                            Full Stack Developer
                        </Badge>
                    </div>
                </div>
                
                <p className="text-sm text-zinc-400 leading-relaxed">
                    Passionate about Open Source and building tools that make a difference. I created this project to simplify the academic lives of my fellow students.
                </p>

                <div className="flex gap-3 mt-auto pt-2">
                    <Button variant="outline" size="sm" className="h-8 border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 hover:text-white" asChild>
                        <Link href="https://github.com/Biraj2004" target="_blank">
                            <Github className="w-3.5 h-3.5 mr-2" /> GitHub
                        </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 hover:text-white" asChild>
                        <Link href="https://www.linkedin.com/in/biraj-sarkar" target="_blank">
                            <Linkedin className="w-3.5 h-3.5 mr-2" /> LinkedIn
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
