module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // Isso diz ao Jest para procurar testes na sua pasta de testes
    roots: ['<rootDir>/tests'],
    // Isso ajuda o Jest a entender os arquivos .ts
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
  };