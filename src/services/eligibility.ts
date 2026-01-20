export interface College {
    minCgpa: number;
    name: string;
}

export interface Student {
    cgpa: number;
}

export function checkEligibility(student: Student, college: College): boolean {
    return student.cgpa >= college.minCgpa;
}

export function calculateAptitudeScore(answers: number[]): number {
    // Cada resposta correta vale 10 pontos
    return answers.reduce((acc, curr) => acc + curr, 0) * 10;
}
