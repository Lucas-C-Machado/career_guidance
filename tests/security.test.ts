function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePasswordStrength(password: string): boolean {
    // Mínimo 6 caracteres
    return password.length >= 6;
}

describe('Testes de Segurança e Validação', () => {
    
    test('Deve validar e-mails corretamente', () => {
        expect(validateEmail('aluno@teste.com')).toBe(true);
        expect(validateEmail('email-invalido')).toBe(false);
    });

    test('Deve validar força da senha', () => {
        expect(validatePasswordStrength('123456')).toBe(true);
        expect(validatePasswordStrength('123')).toBe(false);
    });
});
