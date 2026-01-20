import { checkEligibility, calculateAptitudeScore } from '../src/services/eligibility';

describe('Testes de Regras de Negócio - Career Guidance', () => {
    
    test('Deve aprovar aluno com CGPA igual ao mínimo da faculdade', () => {
        const student = { cgpa: 7.5 };
        const college = { name: 'Faculdade A', minCgpa: 7.5 };
        expect(checkEligibility(student, college)).toBe(true);
    });

    test('Deve reprovar aluno com CGPA abaixo do mínimo da faculdade', () => {
        const student = { cgpa: 6.0 };
        const college = { name: 'Faculdade B', minCgpa: 7.0 };
        expect(checkEligibility(student, college)).toBe(false);
    });

    test('Deve calcular corretamente o score do teste de aptidão', () => {
        const answers = [1, 0, 1, 1, 0]; // 3 acertos
        expect(calculateAptitudeScore(answers)).toBe(30);
    });

    test('Deve retornar score zero se não houver acertos', () => {
        const answers = [0, 0, 0];
        expect(calculateAptitudeScore(answers)).toBe(0);
    });
});
