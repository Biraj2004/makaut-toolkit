"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  calculatePercentageFromYgpa,
  calculateDgpa,
  DegreeType,
  calculatePercentageFromSgpa,
  calculateCgpa,
} from "@/lib/calculators";
import { CheckCircle2, RotateCcw, AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CgpaProgramType = "2yr" | "3yr" | "4yr" | "5yr";

export default function CalculatorsPage() {
  // SGPA State
  const [sgpa, setSgpa] = useState("");
  const [sgpaResult, setSgpaResult] = useState<number | null>(null);

  // YGPA State
  const [oddSgpa, setOddSgpa] = useState("");
  const [evenSgpa, setEvenSgpa] = useState("");
  const [ygpaResult, setYgpaResult] = useState<number | null>(null);
  const [avgYgpa, setAvgYgpa] = useState<number | null>(null);

  // Yearly Marks State
  const [oddSubjects, setOddSubjects] = useState("");
  const [evenSubjects, setEvenSubjects] = useState("");
  const [marksResult, setMarksResult] = useState<{
    total: number;
    obtained: number;
    percentage: number;
  } | null>(null);

  // DGPA State
  const [dgpaType, setDgpaType] = useState<DegreeType>("4yr");
  const [yearlyGPAs, setYearlyGPAs] = useState<string[]>(["", "", "", ""]); // Max 4 inputs
  const [dgpaResult, setDgpaResult] = useState<number | null>(null);

  // CGPA State
  const [cgpaType, setCgpaType] = useState<CgpaProgramType>("4yr");
  // Max 10 semesters (5 years)
  const [cgpaData, setCgpaData] = useState<{ sgpa: string; credits: string }[]>(
    Array(10).fill({ sgpa: "", credits: "" })
  );
  const [cgpaResult, setCgpaResult] = useState<number | null>(null);

  // Error State
  const [error, setError] = useState<string | null>(null);

  // Validation Helper
  const isValidInput = (val: string, max: number) => {
    if (val === "") return true;
    if (val.includes(".") && val.split(".")[1].length > 3) return false;
    const num = parseFloat(val);
    return !isNaN(num) && num <= max;
  };

  const formatResult = (num: number) => {
    return parseFloat(num.toFixed(3));
  };

  // Handlers
  const handleCalculateSgpa = () => {
    if (!sgpa) {
      setError("Please enter a valid SGPA value.");
      return;
    }
    const val = parseFloat(sgpa);
    if (!isNaN(val)) {
      setSgpaResult(calculatePercentageFromSgpa(val));
      setError(null);
    } else {
      setError("Invalid SGPA value.");
    }
  };

  const handleCalculateYgpa = () => {
    if (!oddSgpa || !evenSgpa) {
      setError("Please enter both Odd and Even Semester SGPAs.");
      return;
    }
    const o = parseFloat(oddSgpa);
    const e = parseFloat(evenSgpa);
    if (!isNaN(o) && !isNaN(e)) {
      const avg = (o + e) / 2;
      setAvgYgpa(avg);
      setYgpaResult(calculatePercentageFromYgpa(o, e));
      setError(null);
    } else {
      setError("Invalid SGPA values.");
    }
  };

  const handleCalculateMarks = () => {
    if (!oddSgpa || !evenSgpa || !oddSubjects || !evenSubjects) {
      setError("Please enter SGPAs and Number of Subjects for both semesters.");
      return;
    }

    const oSgpa = parseFloat(oddSgpa);
    const eSgpa = parseFloat(evenSgpa);
    const oSubs = parseInt(oddSubjects);
    const eSubs = parseInt(evenSubjects);

    if (isNaN(oSgpa) || isNaN(eSgpa) || isNaN(oSubs) || isNaN(eSubs)) {
      setError("Please enter valid numeric values.");
      return;
    }

    if (oSubs <= 0 || oSubs > 15 || eSubs <= 0 || eSubs > 15) {
      setError("Number of subjects must be between 1 and 15.");
      return;
    }

    // ---- Calculation Logic ----
    // Percentage from SGPA = (SGPA - 0.75) * 10
    // Marks obtained in a sem = Percentage * Total Marks / 100
    // Total Marks for a sem = No of subjects * 100
    // So, Marks Obtained = (SGPA - 0.75) * 10 * (Subs * 100) / 100 => (SGPA - 0.75) * 10 * Subs

    // Actually, (SGPA - 0.75) * 10 is the percentage.
    // If a subject is 100 marks.
    // Obtained Marks = (Percentage / 100) * (Subjects * 100) = Percentage * Subjects.

    const oddPercentage = (oSgpa - 0.75) * 10;
    const evenPercentage = (eSgpa - 0.75) * 10;

    // Handle negative percentage if SGPA is too low (unlikely but safe)
    if (oddPercentage < 0 || evenPercentage < 0) {
      setError("SGPA is too low to calculate valid percentage.");
      return;
    }

    const oddObtained = oddPercentage * oSubs;
    const evenObtained = evenPercentage * eSubs;

    const totalObtained = oddObtained + evenObtained;
    const totalMarks = (oSubs + eSubs) * 100;

    // Overall Percentage
    const overallPercentage = (totalObtained / totalMarks) * 100;

    setMarksResult({
      total: totalMarks,
      obtained: totalObtained,
      percentage: overallPercentage,
    });
    setError(null);
  };

  const handleCalculateDgpa = () => {
    const requiredInputs =
      dgpaType === "2yr"
        ? 2
        : dgpaType === "lateral" || dgpaType === "3yr"
        ? 3
        : 4;
    const activeInputs = yearlyGPAs.slice(0, requiredInputs);

    if (activeInputs.some((val) => val.trim() === "")) {
      setError("Please enter values for all years.");
      return;
    }

    const inputs = activeInputs.map(parseFloat);
    if (inputs.some(isNaN)) {
      setError("Please enter valid numeric values.");
      return;
    }

    const result = calculateDgpa(inputs, dgpaType);
    if (!isNaN(result)) {
      setDgpaResult(result);
      setError(null);
    }
  };

  const handleCalculateCgpa = () => {
    // Check if at least one semester is filled
    const hasData = cgpaData.some((d) => d.sgpa !== "" && d.credits !== "");
    if (!hasData) {
      setError("Please enter details for at least one semester.");
      return;
    }

    // Check Simplified: Just check if any filled row has parsing error?
    // Or strictly check if we have any matching pairs?
    // Let's filter for complete pairs.
    const validPairs = cgpaData.filter(
      (d) => d.sgpa !== "" && d.credits !== ""
    );

    if (validPairs.length === 0) {
      setError("Please enter at least one complete SGPA & Credit pair.");
      return;
    }

    const inputs = validPairs.map((d) => ({
      sgpa: parseFloat(d.sgpa),
      credits: parseFloat(d.credits),
    }));

    if (inputs.some((d) => isNaN(d.sgpa) || isNaN(d.credits))) {
      setError("Please verify all entered values are numbers.");
      return;
    }

    const result = calculateCgpa(inputs);
    if (!isNaN(result)) {
      setCgpaResult(result);
      setError(null);
    } else {
      setError("Could not calculate. Verify inputs.");
    }
  };

  const handleDgpaTypeChange = (val: DegreeType) => {
    setDgpaType(val);
    setDgpaResult(null);
    setYearlyGPAs(["", "", "", ""]); // Reset inputs
    setError(null);
  };

  const handleCgpaTypeChange = (val: CgpaProgramType) => {
    setCgpaType(val);
    setCgpaResult(null);
    setCgpaData(Array(10).fill({ sgpa: "", credits: "" }));
    setError(null);
  };

  const handleYgpaInputChange = (index: number, value: string) => {
    if (isValidInput(value, 10)) {
      const newYgpas = [...yearlyGPAs];
      newYgpas[index] = value;
      setYearlyGPAs(newYgpas);
      if (error) setError(null);
    }
  };

  const handleCgpaInputChange = (
    index: number,
    field: "sgpa" | "credits",
    value: string
  ) => {
    // Determine max value based on field
    // sgpa: max 10
    // credits: strict < 50 (so, max check 49.999 effectively which is < 50)
    // For credits, using < 50 check manually + decimal check

    if (field === "sgpa") {
      if (!isValidInput(value, 10)) return;
    } else {
      // Credits
      if (value !== "") {
        if (value.includes(".") && value.split(".")[1].length > 3) return;
        if (parseFloat(value) >= 50) return;
      }
    }

    const newData = [...cgpaData];
    newData[index] = { ...newData[index], [field]: value };
    setCgpaData(newData);
    if (error) setError(null);
  };

  const handleClear = () => {
    setSgpa("");
    setSgpaResult(null);
    setOddSgpa("");
    setEvenSgpa("");
    setYgpaResult(null);
    setAvgYgpa(null);
    setOddSubjects("");
    setEvenSubjects("");
    setMarksResult(null);
    setDgpaResult(null);
    setYearlyGPAs(["", "", "", ""]);
    setCgpaResult(null);
    setCgpaData(Array(10).fill({ sgpa: "", credits: "" }));
    setError(null);
  };

  const renderError = () => {
    if (!error) return null;
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3 flex items-center gap-3 text-red-500 text-sm animate-in fade-in slide-in-from-top-2">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span>{error}</span>
      </div>
    );
  };

  // Helper to render DGPA inputs
  const renderDgpaInputs = () => {
    let count = 0;
    switch (dgpaType) {
      case "4yr":
        count = 4;
        break;
      case "lateral":
        count = 3;
        break;
      case "3yr":
        count = 3;
        break;
      case "2yr":
        count = 2;
        break;
    }

    return Array.from({ length: count }).map((_, i) => {
      let label = `YGPA ${i + 1}`;
      if (dgpaType === "lateral") label = `YGPA ${i + 2}`;

      return (
        <div key={i} className="space-y-2">
          <Label>{label}</Label>
          <Input
            placeholder="8.5"
            className="bg-zinc-950 border-zinc-700 h-10 md:h-12 text-lg placeholder:text-zinc-500"
            type="number"
            step="0.01"
            min="0"
            max="10"
            value={yearlyGPAs[i]}
            onChange={(e) => handleYgpaInputChange(i, e.target.value)}
          />
        </div>
      );
    });
  };

  // Helper to render CGPA inputs
  const renderCgpaInputs = () => {
    let semesterCount = 0;
    switch (cgpaType) {
      case "2yr":
        semesterCount = 4;
        break;
      case "3yr":
        semesterCount = 6;
        break;
      case "4yr":
        semesterCount = 8;
        break;
      case "5yr":
        semesterCount = 10;
        break;
    }

    return Array.from({ length: semesterCount }).map((_, i) => (
      <div key={i} className="grid grid-cols-2 gap-3 items-end">
        <div className="space-y-2">
          <Label className="text-xs text-zinc-400">Sem {i + 1} SGPA</Label>
          <Input
            placeholder="8.5"
            className="bg-zinc-950 border-zinc-700 placeholder:text-zinc-500"
            type="number"
            step="0.01"
            value={cgpaData[i].sgpa}
            onChange={(e) => handleCgpaInputChange(i, "sgpa", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs text-zinc-400">Sem {i + 1} Credits</Label>
          <Input
            placeholder="22.0"
            className="bg-zinc-950 border-zinc-700 placeholder:text-zinc-500"
            type="number"
            step="0.5"
            value={cgpaData[i].credits}
            onChange={(e) =>
              handleCgpaInputChange(i, "credits", e.target.value)
            }
          />
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight">
          Academic Calculators
        </h1>
        <p className="text-zinc-400">
          Essential tools for managing your grades, checking{" "}
          <span className="text-emerald-400 font-medium">
            SVMCM Scholarship eligibility
          </span>
          , and academic performance.
        </p>
      </div>

      <Tabs
        defaultValue="sgpa-percent"
        className="w-full"
        onValueChange={() => setError(null)}
      >
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 bg-zinc-900 h-auto p-1">
          <TabsTrigger
            value="sgpa-percent"
            className="data-[state=active]:bg-zinc-800 data-[state=active]:text-emerald-500 py-2 cursor-pointer"
          >
            SGPA to %
          </TabsTrigger>
          <TabsTrigger
            value="ygpa-percent"
            className="data-[state=active]:bg-zinc-800 data-[state=active]:text-emerald-500 py-2 cursor-pointer"
          >
            YGPA to %
          </TabsTrigger>
          <TabsTrigger
            value="yearly-marks"
            className="data-[state=active]:bg-zinc-800 data-[state=active]:text-emerald-500 py-2 cursor-pointer"
          >
            Marks Calc
          </TabsTrigger>
          <TabsTrigger
            value="dgpa-calc"
            className="data-[state=active]:bg-zinc-800 data-[state=active]:text-emerald-500 py-2 cursor-pointer"
          >
            DGPA Calc
          </TabsTrigger>
          <TabsTrigger
            value="cgpa-calc"
            className="data-[state=active]:bg-zinc-800 data-[state=active]:text-emerald-500 py-2 cursor-pointer"
          >
            CGPA Calc
          </TabsTrigger>
        </TabsList>

        {/* SGPA Tab */}
        <TabsContent value="sgpa-percent">
          <Card className="bg-zinc-900 border-zinc-800 mt-4">
            <CardHeader>
              <CardTitle>SGPA to Percentage Converter</CardTitle>
              <CardDescription>
                Convert your Semester Grade Point Average (SGPA) to percentage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="sgpa">Enter SGPA</Label>
                <Input
                  id="sgpa"
                  placeholder="8.5"
                  className="bg-zinc-950 border-zinc-700 h-10 md:h-12 text-lg placeholder:text-zinc-500"
                  value={sgpa}
                  onChange={(e) => {
                    if (isValidInput(e.target.value, 10)) {
                      setSgpa(e.target.value);
                      if (error) setError(null);
                    }
                  }}
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                />
              </div>

              {/* Formula Hint */}
              <div className="rounded-lg bg-zinc-950/50 border border-zinc-800 p-4">
                <span className="font-semibold text-zinc-400 block mb-1 text-sm">
                  Formula used:
                </span>
                <code className="text-zinc-500 text-sm">
                  Percentage = (SGPA - 0.75) × 10
                </code>
              </div>

              {renderError()}

              {sgpaResult !== null && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-md p-4 flex items-center gap-3 text-emerald-500 animate-in fade-in slide-in-from-top-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span className="font-medium">
                    Equivalent Percentage: {formatResult(sgpaResult)}%
                  </span>
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-end gap-3 border-t border-zinc-800 pt-6">
              <Button
                variant="outline"
                onClick={handleClear}
                className="border-zinc-700 hover:bg-zinc-800 hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Clear
              </Button>
              <Button
                onClick={handleCalculateSgpa}
                className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              >
                Calculate
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Yearly Marks Calculator */}
        <TabsContent value="yearly-marks">
          <Card className="bg-zinc-900 border-zinc-800 mt-4">
            <CardHeader>
              <CardTitle>Yearly Marks Calculator</CardTitle>
              <CardDescription>
                Calculate SGPA to Total Marks, Obtained Marks & Percentage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="text-sm text-zinc-400 leading-relaxed">
                  <p className="mb-2">
                    This Tool is helpful for each year student to calculate
                    their marks Percentage for Scholarship Form Fill Up at the
                    time of Renewal, and Eligibility Check.
                  </p>
                  <ol className="list-decimal list-inside space-y-1 ml-1 text-emerald-500 font-medium">
                    <li>Swami Vivekananda Scholarship</li>
                    <li>OASIS Scholarship</li>
                    <li>Aikashree Scholarship</li>
                  </ol>
                  <div className="mt-4 p-4 bg-zinc-950/50 rounded-md border border-zinc-800 text-sm text-zinc-400 leading-relaxed shadow-sm space-y-2">
                    <div className="font-semibold text-zinc-200">
                      Yearly Marks Calculation for Scholarships:
                    </div>
                    <p>
                      Enter your{" "}
                      <span className="text-zinc-300 font-medium">
                        Odd & Even Semester SGPA
                      </span>{" "}
                      and{" "}
                      <span className="text-zinc-300 font-medium">
                        Number of Subjects
                      </span>{" "}
                      (Theory + Practical) to calculate your:
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        Total Marks
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        Obtained Marks
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        Overall Percentage (%)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border border-zinc-700/50 rounded-lg p-4 md:p-6 relative mt-6">
                  <div className="absolute -top-3 left-4 bg-zinc-900 px-2 text-sm font-semibold text-emerald-500">
                    Yearly Marks Calculator
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="oddSgpaMarks">Odd Sem SGPA</Label>
                        <Input
                          id="oddSgpaMarks"
                          placeholder="8.5"
                          className="bg-zinc-950 border-zinc-700 h-10 md:h-12 text-lg placeholder:text-zinc-500"
                          type="number"
                          step="0.01"
                          value={oddSgpa}
                          onChange={(e) => {
                            if (isValidInput(e.target.value, 10)) {
                              setOddSgpa(e.target.value);
                              if (error) setError(null);
                            }
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="oddSubjects">No of Subjects</Label>
                        <Input
                          id="oddSubjects"
                          placeholder="5"
                          className="bg-zinc-950 border-zinc-700 h-10 md:h-12 text-lg placeholder:text-zinc-500"
                          type="number"
                          value={oddSubjects}
                          onChange={(e) => {
                            const val = e.target.value;
                            // Allow empty or number between 1 and 15 (during typing allow 1-9 to eventually become 10-15)
                            // Actually, blocking 0 prevents typing 0.
                            // Blocking > 15 prevents typing 16.
                            if (
                              val === "" ||
                              (parseInt(val) > 0 && parseInt(val) <= 15)
                            ) {
                              setOddSubjects(val);
                              if (error) setError(null);
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="evenSgpaMarks">Even Sem SGPA</Label>
                        <Input
                          id="evenSgpaMarks"
                          placeholder="9.0"
                          className="bg-zinc-950 border-zinc-700 h-10 md:h-12 text-lg placeholder:text-zinc-500"
                          type="number"
                          step="0.01"
                          value={evenSgpa}
                          onChange={(e) => {
                            if (isValidInput(e.target.value, 10)) {
                              setEvenSgpa(e.target.value);
                              if (error) setError(null);
                            }
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="evenSubjects">No of Subjects</Label>
                        <Input
                          id="evenSubjects"
                          placeholder="5"
                          className="bg-zinc-950 border-zinc-700 h-10 md:h-12 text-lg placeholder:text-zinc-500"
                          type="number"
                          value={evenSubjects}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (
                              val === "" ||
                              (parseInt(val) > 0 && parseInt(val) <= 15)
                            ) {
                              setEvenSubjects(val);
                              if (error) setError(null);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {renderError()}

              {marksResult !== null && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-md p-4 space-y-2 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center gap-3 text-emerald-500 mb-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="font-semibold text-lg">Results</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-zinc-950/50 p-3 rounded border border-emerald-500/10">
                      <span className="text-zinc-400 block text-xs uppercase tracking-wider mb-1">
                        Total Marks
                      </span>
                      <span className="text-xl font-bold text-emerald-400">
                        {marksResult.total}
                      </span>
                    </div>
                    <div className="bg-zinc-950/50 p-3 rounded border border-emerald-500/10">
                      <span className="text-zinc-400 block text-xs uppercase tracking-wider mb-1">
                        Obtained Marks
                      </span>
                      <span className="text-xl font-bold text-emerald-400">
                        {formatResult(marksResult.obtained)}
                      </span>
                    </div>
                    <div className="bg-zinc-950/50 p-3 rounded border border-emerald-500/10">
                      <span className="text-zinc-400 block text-xs uppercase tracking-wider mb-1">
                        Percentage
                      </span>
                      <span className="text-xl font-bold text-emerald-400">
                        {formatResult(marksResult.percentage)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-end gap-3 border-t border-zinc-800 pt-6">
              <Button
                variant="outline"
                onClick={handleClear}
                className="border-zinc-700 hover:bg-zinc-800 hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Clear
              </Button>
              <Button
                onClick={handleCalculateMarks}
                className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              >
                Calculate
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* YGPA Tab */}
        <TabsContent value="ygpa-percent">
          <Card className="bg-zinc-900 border-zinc-800 mt-4">
            <CardHeader>
              <CardTitle>YGPA to Percentage Converter</CardTitle>
              <CardDescription>
                Calculate annual percentage from odd and even semester SGPAs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="oddSgpa">Odd Semester SGPA</Label>
                  <Input
                    id="oddSgpa"
                    placeholder="7.5"
                    className="bg-zinc-950 border-zinc-700 h-10 md:h-12 text-lg placeholder:text-zinc-500"
                    type="number"
                    step="0.01"
                    value={oddSgpa}
                    onChange={(e) => {
                      if (isValidInput(e.target.value, 10)) {
                        setOddSgpa(e.target.value);
                        if (error) setError(null);
                      }
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="evenSgpa">Even Semester SGPA</Label>
                  <Input
                    id="evenSgpa"
                    placeholder="8.0"
                    className="bg-zinc-950 border-zinc-700 h-10 md:h-12 text-lg placeholder:text-zinc-500"
                    type="number"
                    step="0.01"
                    value={evenSgpa}
                    onChange={(e) => {
                      if (isValidInput(e.target.value, 10)) {
                        setEvenSgpa(e.target.value);
                        if (error) setError(null);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Formula Hint */}
              <div className="rounded-lg bg-zinc-950/50 border border-zinc-800 p-4 space-y-2">
                <span className="font-semibold text-zinc-400 block text-sm">
                  Formulas used:
                </span>
                <div className="flex flex-col gap-1">
                  <code className="text-zinc-500 text-sm">
                    YGPA = (Odd SGPA + Even SGPA) / 2
                  </code>
                  <code className="text-zinc-500 text-sm">
                    Percentage = (YGPA - 0.75) × 10
                  </code>
                </div>
              </div>

              {renderError()}

              {ygpaResult !== null && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-md p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center gap-3 text-emerald-500">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <div>
                      <span className="font-medium block">
                        Yearly Average YGPA:{" "}
                        {avgYgpa !== null ? formatResult(avgYgpa) : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-500 border-t border-emerald-500/20 pt-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="font-medium">
                      Yearly Percentage: {formatResult(ygpaResult)}%
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-end gap-3 border-t border-zinc-800 pt-6">
              <Button
                variant="outline"
                onClick={handleClear}
                className="border-zinc-700 hover:bg-zinc-800 hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Clear
              </Button>
              <Button
                onClick={handleCalculateYgpa}
                className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              >
                Calculate
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* DGPA Tab */}
        <TabsContent value="dgpa-calc">
          <Card className="bg-zinc-900 border-zinc-800 mt-4">
            <CardHeader>
              <CardTitle>DGPA Calculator</CardTitle>
              <CardDescription>
                Calculate your final Degree GPA based on your programme type.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Course Type</Label>
                  <Select
                    value={dgpaType}
                    onValueChange={(val) =>
                      handleDgpaTypeChange(val as DegreeType)
                    }
                  >
                    <SelectTrigger className="bg-zinc-950 border-zinc-700 cursor-pointer">
                      <SelectValue placeholder="Select Course Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
                      <SelectItem className="cursor-pointer" value="4yr">
                        4 Year Degree (B.Tech)
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="lateral">
                        Lateral Entry (3 Years)
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="3yr">
                        3 Year Degree
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="2yr">
                        2 Year Degree (M.Tech/MCA/MBA)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {renderDgpaInputs()}
                </div>

                {/* Formula Hint */}
                <div className="rounded-lg bg-zinc-950/50 border border-zinc-800 p-4">
                  <span className="font-semibold text-zinc-400 block mb-1 text-sm">
                    Formula used:
                  </span>
                  <code className="text-zinc-500 text-sm">
                    {dgpaType === "4yr" &&
                      "DGPA = (YGPA1 + YGPA2 + 1.5*YGPA3 + 1.5*YGPA4) / 5"}
                    {dgpaType === "lateral" &&
                      "DGPA = (YGPA2 + 1.5*YGPA3 + 1.5*YGPA4) / 4"}
                    {dgpaType === "3yr" && "DGPA = (YGPA1 + YGPA2 + YGPA3) / 3"}
                    {dgpaType === "2yr" && "DGPA = (YGPA1 + YGPA2) / 2"}
                  </code>
                </div>

                {/* Disclaimer */}
                {(dgpaType === "4yr" || dgpaType === "lateral") && (
                  <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 flex gap-3 items-start text-sm text-amber-500/90">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-semibold block">
                        Important Note:
                      </span>
                      {dgpaType === "4yr" && (
                        <p>
                          For Regular B.Tech students, the calculation considers
                          all 4 years. 1st and 2nd years carry normal weightage,
                          while 3rd and 4th years carry 1.5x weightage.
                        </p>
                      )}
                      {dgpaType === "lateral" && (
                        <p>
                          For Lateral Entry students, the calculation starts
                          from the 2nd Year. The 2nd year carries normal
                          weightage, while 3rd and 4th years carry 1.5x
                          weightage.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {renderError()}

              {dgpaResult !== null && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-md p-4 flex items-center gap-3 text-emerald-500 animate-in fade-in slide-in-from-top-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-medium text-lg">
                      DGPA: {formatResult(dgpaResult)}
                    </span>
                    <span className="text-xs opacity-75">
                      Degree Grade Point Average
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-end gap-3 border-t border-zinc-800 pt-6">
              <Button
                variant="outline"
                onClick={handleClear}
                className="border-zinc-700 hover:bg-zinc-800 hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Clear
              </Button>
              <Button
                onClick={handleCalculateDgpa}
                className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              >
                Calculate
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* CGPA Tab */}
        <TabsContent value="cgpa-calc">
          <Card className="bg-zinc-900 border-zinc-800 mt-4">
            <CardHeader>
              <CardTitle>CGPA Calculator</CardTitle>
              <CardDescription>
                Calculate your Cumulative Grade Point Average (CGPA).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Course Duration</Label>
                  <Select
                    value={cgpaType}
                    onValueChange={(val) =>
                      handleCgpaTypeChange(val as CgpaProgramType)
                    }
                  >
                    <SelectTrigger className="bg-zinc-950 border-zinc-700 cursor-pointer">
                      <SelectValue placeholder="Select Course Duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
                      <SelectItem className="cursor-pointer" value="4yr">
                        4 Year (8 Semesters)
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="3yr">
                        3 Year (6 Semesters)
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="2yr">
                        2 Year (4 Semesters)
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="5yr">
                        5 Year (10 Semesters)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-2">
                  {renderCgpaInputs()}
                </div>

                {/* Formula Hint */}
                <div className="rounded-lg bg-zinc-950/50 border border-zinc-800 p-4 space-y-4">
                  <div>
                    <span className="font-semibold text-zinc-400 block mb-1 text-sm">
                      Formula used:
                    </span>
                    <code className="text-zinc-500 text-sm">
                      CGPA = ∑ (Credit Index) / ∑ (Credits)
                    </code>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-zinc-800/50">
                    <h4 className="text-sm font-medium text-zinc-300">
                      Explanation of Terms:
                    </h4>

                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-emerald-500">
                        1. Credit Index of a Semester
                      </p>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        It is the{" "}
                        <span className="text-zinc-400">
                          total credit points
                        </span>{" "}
                        earned in that semester.
                        <br />
                        Calculated as:{" "}
                        <span className="italic">
                          Credit Index = Total Semester Credit Points = SGPA ×
                          Total Semester Credits
                        </span>
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-emerald-500">
                        2. Credits of a Semester
                      </p>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        Total number of credits registered in that semester.
                        <br />
                        Includes{" "}
                        <span className="text-zinc-400">
                          theory + lab + practical credits
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {renderError()}

              {cgpaResult !== null && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-md p-4 flex items-center gap-3 text-emerald-500 animate-in fade-in slide-in-from-top-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-medium text-lg">
                      CGPA: {formatResult(cgpaResult)}
                    </span>
                    <span className="text-xs opacity-75">
                      Cumulative Grade Point Average
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-end gap-3 border-t border-zinc-800 pt-6">
              <Button
                variant="outline"
                onClick={handleClear}
                className="border-zinc-700 hover:bg-zinc-800 hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Clear
              </Button>
              <Button
                onClick={handleCalculateCgpa}
                className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              >
                Calculate
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
