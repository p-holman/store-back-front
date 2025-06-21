const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
const PORT = 4000;
const SECRET = process.env.UPLOAD_SECRET;
const UPLOAD_DIR = path.join("/store", "images");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

app.use(cors({
  origin: "http://localhost:3000", 
  methods: ["GET", "POST", "PUT"],
}));

app.use(express.raw({ type: "*/*", limit: "10mb" }));

app.put("/upload-direct", (req, res) => {
  let { filename, expires, sig } = req.query;

  if (!filename || !expires || !sig) {
    return res.status(400).json({ error: "Parámetros faltantes" });
  }

  const expectedSig = crypto
    .createHmac("sha256", SECRET)
    .update(`${filename}:${expires}`)
    .digest("hex");

  if (sig !== expectedSig || Date.now() > Number(expires)) {
    return res.status(403).json({ error: "Firma inválida o expirada" });
  }

  filename = `${Date.now()}-` + filename;

  const filepath = path.join(UPLOAD_DIR, filename);
  fs.writeFileSync(filepath, req.body);
  res.json({ url: `http://localhost/images/${filename}` });
});

app.listen(PORT, () => {
  console.log(`Servidor de subida en http://localhost:${PORT}`);
});
