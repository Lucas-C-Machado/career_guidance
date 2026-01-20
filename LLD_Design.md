# Documento de Design de Baixo Nível (LLD) - Career Guidance

## 1. Visão Geral
Este documento detalha a lógica interna e a estrutura de dados do sistema de Orientação de Carreira, focando na otimização de performance e segurança.

## 2. Estrutura de Dados (Firestore)

### Coleção: `users`
- `uid`: String (ID único do Firebase Auth)
- `name`: String
- `email`: String
- `role`: String ('student' ou 'admin')
- `createdAt`: Timestamp

### Coleção: `colleges`
- `name`: String
- `area`: String ('Engenharia' ou 'Administração')
- `location`: String ('Índia' ou 'Exterior')
- `rank`: Number
- `fees`: String
- `minCgpa`: Number
- `createdAt`: Timestamp

### Coleção: `registrations`
- `userId`: String
- `collegeId`: String
- `collegeName`: String
- `cgpa`: Number
- `sop`: String
- `status`: String ('eligible', 'pending_test')
- `createdAt`: Timestamp

### Coleção: `logs`
- `action`: String (ex: 'LOGIN', 'TEST_COMPLETED')
- `details`: Object
- `userId`: String
- `timestamp`: Timestamp
- `userAgent`: String

## 3. Fluxo de Negócio
1. **Autenticação**: O usuário se cadastra e loga via Firebase Auth.
2. **Filtro**: O aluno seleciona área e localização. O sistema consulta o Firestore filtrando por esses campos.
3. **Elegibilidade**: Ao tentar se registrar, o sistema compara o `cgpa` inserido com o `minCgpa` da faculdade.
4. **Teste de Aptidão**: Dividido em 3 seções (Verbal, Quantitativa, Conhecimento Geral). Cada acerto soma pontos ao score final.
5. **Auditoria**: Todas as transações críticas invocam o `Logger.js` para persistência de logs.

## 4. Segurança e Testes
### Estratégias de Segurança:
- **Autenticação Robusta**: Uso do Firebase Auth com persistência de sessão segura.
- **Regras de Granularidade**: O Firestore está configurado para permitir `write` apenas se o `request.auth.uid` corresponder ao ID do documento.

### Casos de Teste de Segurança:
- **Teste de Injeção**: Validação de inputs em todos os formulários para evitar scripts maliciosos.
- **Teste de Acesso Não Autorizado**: Tentativa de acesso direto às URLs de `/pages/admin-dashboard.html` sem perfil administrativo.

## 5. Portabilidade e Implantação
O software é 100% portátil, podendo ser executado em:
- **Localmente**: Via `firebase serve` ou qualquer servidor estático (Node.js `serve`).
- **Nuvem**: Firebase Hosting (Recomendado pela integração nativa).
- **Justificativa**: A arquitetura desacoplada permite que o frontend seja movido para qualquer provedor (AWS S3, Netlify) mantendo a conexão com o backend Firebase.

