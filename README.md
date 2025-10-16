# Divulga-Streamers-API
# 🎮 Streamer & Propostas API

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-0C344B?logo=prisma&logoColor=white)

API RESTful para gerenciamento de **streamers, patrocinadores, propostas e administração**. Permite cadastro, autenticação, controle de propostas e dashboards de dados.

---

## 🔧 Tecnologias utilizadas

- **Node.js & Express** – servidor e rotas da API  
- **Prisma ORM** – modelagem e acesso ao banco PostgreSQL  
- **PostgreSQL** – banco de dados relacional  
- **TypeScript** – tipagem e desenvolvimento seguro  
- **Zod** – validação de dados  
- **bcrypt** – hash de senhas  
- **jsonwebtoken (JWT)** – autenticação  
- **CORS** – controle de requisições cross-origin  
- **Nodemailer** – envio de emails (opcional)  

---

## 🗂 Estrutura do projeto
├── prisma
│ └── schema.prisma # Modelos do banco de dados
├── routes # Rotas da API
│ ├── admin.ts
│ ├── adminLogin.ts
│ ├── dashboard.ts
│ ├── plataforma.ts
│ ├── patrocinador.ts
│ ├── login.ts
│ ├── proposta.ts
│ └── streamer.ts
├── src
│ └── index.ts # Arquivo principal do servidor
├── package.json
├── tsconfig.json
└── .env # Variáveis de ambiente

---

## 🧩 Modelos principais

- **Streamer** – informações de streamers (idade, seguidores, foto, plataforma, destaques) e relacionamentos com propostas e patrocinadores.  
- **Patrocinador** – cadastro de patrocinadores (nome, email, senha, cidade) e propostas relacionadas.  
- **Admin** – administração da plataforma, controle de propostas e gerenciamento de streamers.  
- **Proposta** – propostas ligadas a streamers e patrocinadores, com possibilidade de resposta de admin.  
- **Plataforms (enum)** – YOUTUBE, TWITCH, FACEBOOK, INSTAGRAM, TIKTOK, KICK.

---
## 🔒 Segurança

* Senhas armazenadas com bcrypt

* Autenticação via JWT para patrocinadores e admins

* API pronta para deploy serverless (Vercel, Railway, etc)

## 📬 Contato

Desenvolvido por Janine Veigas Farias e Miguel Rubim Vencato
E-mail: janinefarias2005@gmail.com


