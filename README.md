# Orientação de Carreira - Career Guidance System

Este projeto é um aplicativo web desenvolvido para auxiliar estudantes e pais na escolha de instituições de ensino superior (Engenharia e Administração), tanto na Índia quanto no exterior. O sistema integra informações sobre mensalidades, moradia, requisitos de elegibilidade e realiza um Teste de Aptidão (AT) para avaliar as capacidades dos alunos.

## Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend/Banco de Dados:** Firebase (Authentication, Firestore, Hosting)
- **Linguagem de Desenvolvimento:** TypeScript (para lógica de backend/serviços)
- **Testes:** Jest

## Funcionalidades

1.  **Login e Cadastro de Alunos:** Acesso seguro via Firebase Auth.
2.  **Seleção de Carreira:** Escolha entre Engenharia e Administração.
3.  **Seleção de Localização:** Opções para estudar na Índia ou no Exterior.
4.  **Lista de Faculdades:** Visualização de instituições baseada nos filtros selecionados.
5.  **Registro na Faculdade:** Envio de dados acadêmicos (CGPA e SOP).
6.  **Teste de Aptidão (AT):** Avaliação com questões de múltipla escolha.
7.  **Geração de Pontuação:** Resultado imediato após a conclusão do teste.

## Estrutura do Projeto

- `/public`: Contém os arquivos estáticos do frontend (HTML, CSS, JS).
- `/src`: Contém a lógica em TypeScript e configurações do Firebase.
- `/tests`: Testes unitários para garantir a qualidade do código.
- `firebase.json`: Configurações de deploy para o Firebase Hosting.

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado
- Firebase CLI (`npm install -g firebase-tools`)

### Passos para Execução Local

1.  Clone o repositório.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Configure suas credenciais do Firebase no arquivo `.env` e `public/js/firebase-config.js`.
4.  Inicie o servidor de desenvolvimento do Firebase:
    ```bash
    firebase serve
    ```
5.  Acesse `http://localhost:5000` no seu navegador.

## Logging

O sistema utiliza o console do navegador e logs do Firebase para monitorar as ações dos usuários e garantir a rastreabilidade de erros.

## Implantação

O projeto está configurado para ser hospedado no **Firebase Hosting**, garantindo escalabilidade e segurança.

---
Desenvolvido como parte do projeto de Orientação de Carreira.
