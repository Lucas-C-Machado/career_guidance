# Relatório Detalhado do Projeto: Career Guidance System

## 1. Introdução
O **Career Guidance System** é uma plataforma web projetada para auxiliar estudantes na transição entre o ensino médio e a educação superior. O sistema oferece ferramentas de filtragem de instituições, verificação de elegibilidade acadêmica e um teste de aptidão estruturado para direcionar escolhas de carreira.

## 2. Design da Solução (LLD)
A solução foi desenhada seguindo princípios de **Modularidade** e **Segurança**.

### Estratégias de Design:
- **Camada de Apresentação**: Utiliza HTML5 e CSS3 com design responsivo para garantir acessibilidade em múltiplos dispositivos.
- **Camada de Lógica**: Implementada em JavaScript (Client-side), garantindo rapidez na resposta ao usuário sem sobrecarga de servidor.
- **Camada de Dados**: Utiliza o Firebase Firestore, um banco de dados NoSQL escalável, permitindo atualizações em tempo real.

## 3. Arquitetura do Sistema
O sistema utiliza uma arquitetura **Serverless**, o que justifica sua alta portabilidade e baixo custo de manutenção.

### Justificativa do Design:
- **Hospedagem**: Firebase Hosting foi escolhido por oferecer SSL automático e entrega via CDN global.
- **Segurança**: Implementação de regras de segurança no nível do banco de dados, garantindo que usuários só acessem seus próprios dados.

## 4. Otimização da Solução
- **Nível de Código**: Minimização de chamadas ao banco de dados através de cache local (LocalStorage) para dados de sessão.
- **Nível de Arquitetura**: Uso de índices compostos no Firestore para otimizar buscas complexas por área e localização.

## 5. Plano de Testes e Segurança
### Casos de Teste:
1. **CT01 - Login Admin**: Validar se o usuário com role 'admin' é redirecionado corretamente para o dashboard de gestão.
2. **CT02 - Elegibilidade**: Testar se um aluno com CGPA abaixo do mínimo é impedido de se registrar em uma faculdade específica.
3. **CT03 - Teste de Aptidão**: Verificar se o cálculo do score final está correto após as 3 seções.

### Segurança do Banco de Dados:
- Implementação de regras que impedem a deleção de registros por usuários não administrativos.
- Validação de tipos de dados na entrada do Firestore.

## 6. Conclusão
O sistema atende a todos os requisitos funcionais e não funcionais, oferecendo uma solução robusta, segura e portátil para a orientação de carreira estudantil.
