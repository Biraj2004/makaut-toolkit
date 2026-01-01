export function calculatePercentageFromCgpa(cgpa: number): number {
  return (cgpa - 0.75) * 10;
}

export function calculatePercentageFromSgpa(sgpa: number): number {
  return (sgpa - 0.75) * 10;
}

export function calculatePercentageFromYgpa(oddSgpa: number, evenSgpa: number): number {
  // Formula: [{(SGPA of Odd Sem + SGPA of Even SEM)/2} - 0.75] * 10
  const averageSgpa = (oddSgpa + evenSgpa) / 2;
  return (averageSgpa - 0.75) * 10;
}

export type DegreeType = "4yr" | "lateral" | "3yr" | "2yr";

export function calculateDgpa(ygpas: number[], type: DegreeType): number {
  // 4 Year Degree: (YGPA1 + YGPA2 + 1.5*YGPA3 + 1.5*YGPA4) / 5
  // Lateral Entry: (YGPA2 + 1.5*YGPA3 + 1.5*YGPA4) / 4
  // 3 Year Degree: (YGPA1 + YGPA2 + YGPA3) / 3
  // 2 Year Degree: (YGPA1 + YGPA2) / 2

  // Note: ygpas array is expected to be 0-indexed.
  // ygpas[0] = YGPA1 (1st Year)
  // ygpas[1] = YGPA2 (2nd Year)

  switch (type) {
    case "4yr":
      // Requires YGPA 1, 2, 3, 4
      if (ygpas.length < 4) return 0;
      return (ygpas[0] + ygpas[1] + 1.5 * ygpas[2] + 1.5 * ygpas[3]) / 5;
    
    case "lateral":
      // Requires YGPA 2, 3, 4 (stored as index 0, 1, 2 in component for simplicity, but strictly it's 2nd, 3rd, 4th yr)
      // BUT for simplicity in generic function, let's assume the caller passes exactly the YGPAs needed in order.
      // If lateral, we expect 3 inputs representing 2nd, 3rd, 4th year.
      if (ygpas.length < 3) return 0;
      return (ygpas[0] + 1.5 * ygpas[1] + 1.5 * ygpas[2]) / 4;

    case "3yr":
      if (ygpas.length < 3) return 0;
      return (ygpas[0] + ygpas[1] + ygpas[2]) / 3;

    case "2yr":
      if (ygpas.length < 2) return 0;
      return (ygpas[0] + ygpas[1]) / 2;

    default:
      return 0;
  }
}

export interface SemesterData {
    sgpa: number;
    credits: number;
}

export function calculateCgpa(semesters: SemesterData[]): number {
    let totalCreditIndex = 0;
    let totalCredits = 0;

    for (const sem of semesters) {
        if (sem.sgpa > 0 && sem.credits > 0) {
            totalCreditIndex += sem.sgpa * sem.credits;
            totalCredits += sem.credits;
        }
    }

    if (totalCredits === 0) return 0;
    return totalCreditIndex / totalCredits;
}
