**Renombra el archivo .env.template a .env y agrega las variables de entorno.**

Para crear una clave en linux:
```bash
openssl rand -base64 32
```

**Levanta los contenedores:**
```bash
docker compose up -d
```
o
```bash
docker compose up
```
si quieres visualizar los logs de upload-server.
<br>

**Inicializa la base de datos:**
```bash
npx prisma migrate dev
```

**Levanta el servidor frontend:**
```bash
cd frontend
npm i
npm run dev
```