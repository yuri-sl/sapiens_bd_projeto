
---

# **Nome do Projeto**  

*Uma aplicação moderna com Next.js, TypeScript, Prisma e tRPC*  

---

## **Começando**  

Siga estas instruções para configurar o projeto localmente.  

### **Pré-requisitos**  
- Node.js v18+  
- Banco de dados Postgresql (ou Docker)  
- Git  
- Arquivo script_psql.psql (Script postgreSQL gerador do bancos de dados)
---

## **🛠 Configuração**  

### **1. Clonar o repositório**  
```bash
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo
```

### **2. Instalar dependências**  
```bash
npm install
# ou
pnpm install
```

### **3. Configurar variáveis de ambiente**  
1. Copie o arquivo modelo `.env.example` para `.env`:  
   ```bash
   cp .env.example .env
   ```
2. Edite o `.env` com suas credenciais:  
   ```env
   # Exemplo (NÃO use esses valores!)
   DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
   NEXTAUTH_SECRET="gerar-um-segredo-forte-aqui"
   ```

### **4. Banco de Dados**  
#### **Opção A: Local (MySQL)**  
1. Crie o banco manualmente:  
   ```sql
   CREATE DATABASE sapiens_db;
   CREATE USER sapiens_user WITH PASSWORD 'senha123';
   GRANT ALL PRIVILEGES ON DATABASE sapiens_db TO sapiens_user;
   ALTER USER sapiens_user WITH SUPERUSER; -- Opcional, se precisar de privilégios elevados
   ```
2. Troque o .env:
````
   DATABASE_URL="postgresql://sapiens_user:senha123@localhost:5432/sapiens_db?schema=public"
````
2. Execute as migrações:  
   ```bash
   npx prisma migrate dev
   ```
### **5. Iniciar o servidor**  
```bash
npm run dev
```

###IGNOREM---
#### **Opção B: Docker (Recomendado para time)**  
```bash
docker-compose up -d  # Inicia MySQL e adminer (opcional)
npx prisma migrate dev
```

### **5. Iniciar o servidor**  
```bash
npm run dev
```
Acesse: [http://localhost:3000](http://localhost:3000)  

---

## **🔧 Variáveis de Ambiente**  
| Variável               | Exemplo                          | Obrigatório? |  
|------------------------|----------------------------------|--------------|  
| `DATABASE_URL`         | `mysql://user:pass@localhost:3306/db` | ✅ Sim |  
| `NEXTAUTH_SECRET`      | `openssl rand -hex 32`           | ✅ Sim |  
| `NEXTAUTH_URL`         | `http://localhost:3000`          | ❌ Não |  

**Nota:** Peça as credenciais ao líder do projeto.  

---

## **Estrutura do Projeto**  
```
.
├── prisma/
│   └── schema.prisma    # Modelos do banco
├── src/
│   ├── pages/           # Rotas Next.js
│   └── server/          # tRPC e lógica de backend
└── .env.example         # Modelo para configuração
```

---

## **❗ Problemas Comuns**  
- **Erro de conexão com o banco**: Verifique `DATABASE_URL` e se o MySQL está rodando.  
- **Migrações falhando**: Execute `npx prisma generate` antes.  
- **Variáveis de ambiente não carregadas**: Reinicie o servidor após editar `.env`.  

---

## ** Contribuição**  
1. Crie uma branch: `git checkout -b feature/nova-funcionalidade`  
2. Commit: `git commit -m "Adiciona recurso X"`  
3. Push: `git push origin feature/nova-funcionalidade`  

---

### **Segurança**  
- **NUNCA** compartilhe o arquivo `.env` ou credenciais reais no repositório.  
- Adicione `.env` ao `.gitignore`:  
  ```bash
  echo ".env" >> .gitignore
  ```

---

Para dúvidas, consulte a [documentação do T3 Stack](https://create.t3.gg/).  

---  

