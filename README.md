# FinFreela — Educador Financeiro Inteligente
 
Aplicação web voltada para freelancers e pequenos empreendedores com renda variável, ajudando a organizar entradas, saídas e reserva financeira.
 
---
 
## Arquitetura do projeto
Este projeto passou por três fases de arquitetura, documentadas aqui de propósito para mostrar o processo de aprendizado:

| Versão | Stack | Pasta |
| ------ | ----- | ----- |
| **Atual** | React (front-end) + **Node/Express + PostgreSQL** (back-end próprio, com autenticação JWT) | `front-end/` + `back-end/` |
| **Fase 2** | React (front-end) + **Firebase** (Firestore + Auth) | `front-end/` |
| **Fase 1** | React (front-end) + **Node/Express + SQLite** (protótipo inicial, sem autenticação) | `front-end/` |

### Por que essa evolução?

Comecei com SQLite pra validar a lógica de negócio (cálculo de pró-labore, distribuição de valores) sem me preocupar com infraestrutura. Depois migrei pro Firebase (Firestore + Authentication) pra ter autenticação pronta e testar o front-end mais rápido, sem gerenciar back-end.
Por fim, voltei pra uma API própria em **Express + PostgreSQL** pra ganhar experiência real com autenticação (JWT + bcrypt), modelagem relacional de dados e queries SQL — habilidades que o Firebase abstraía por completo e que são centrais pra atuar como full stack developer.
Isso significa: cadastro/login com hash de senha (bcrypt), tokens JWT com expiração, rotas protegidas por middleware de autenticação, e transações vinculadas a cada usuário (com verificação de propriedade em todas as operações).
 
---
 
## Funcionalidades:
 
- **Autenticação de usuário** (cadastro/login com JWT + bcrypt)
- Registro de entradas e saídas por mês, vinculado ao usuário logado
- Filtro por mês com visualização de saldo líquido
- Cálculo automático de pró-labore sugerido
- Distribuição recomendada: impostos, reserva, reinvestimento e pró-labore
- Gráfico de evolução mensal (Recharts)
- Edição e exclusão de lançamentos
- Exportação de dados para CSV
---
 
## Tecnologias Utilizadas:
 
**Front-end:** React 18, Vite, Recharts, CSS Modules, Axios
**Back-end:** Node.js, Express, PostgreSQL, JWT (jsonwebtoken), bcryptjs
 
---
 
## Como rodar localmente?
 
### 1. Clone o repositório
 
```bash
git clone https://github.com/alananjos06/educador-financeiro-inteligente.git
cd educador-financeiro-inteligente
```
 
### 2. Back-end
 
```bash
cd back-end
npm install
```
 
Crie um arquivo `.env` na pasta `back-end/` com:
 
```
DATABASE_URL=postgres://usuario:senha@localhost:5432/finfreela
JWT_SECRET=uma_chave_secreta_qualquer
PORT=3001
```
 
```bash
npm run dev
```
 
### 3. Front-end
 
Em outro terminal:
 
```bash
cd front-end
npm install
npm run dev
```
 
Acesse `http://localhost:5173`.
 
> Certifique-se de ter um servidor PostgreSQL rodando localmente e um banco de dados criado com o nome usado no `DATABASE_URL`.
 
---
 
<div align="center"> Criado com 💚 por Alana Anjos </div>
 
