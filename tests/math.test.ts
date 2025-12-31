import { somar, subtrair } from '../src/services/math';

describe('Testes de Utilidades Matemáticas', () => {
  
  test('Deve somar 1 + 2 e retornar 3', () => {
    expect(somar(1, 2)).toBe(3);
  });

  test('Deve subtrair 5 - 2 e retornar 3', () => {
    expect(subtrair(5, 2)).toBe(3);
  });

});