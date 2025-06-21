import { auth } from "@/auth/auth"
import crypto from "crypto";
import { NextResponse } from "next/server";

const SECRET = process.env.UPLOAD_SECRET;

export const GET = auth(function GET(req) {
    if (!req.auth) {
        return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const filename = searchParams.get("filename");
    const filetype = searchParams.get("filetype");

    if (!filename || !filetype) {
        return NextResponse.json({ error: "Falta el nombre o tipo del archivo" }, { status: 400 });
    }

    // comprueba que el tipo de archivo sea imagen
    const validFileTypes = ["image/jpeg", "image/png", "image/gif", "image/avif", "image/webp"];
    if (!validFileTypes.includes(filetype)) {
        return NextResponse.json({ error: "El tipo de archivo no corresponde" })
    }

    if (filename.length > 100) {
        return NextResponse.json({ error: "El nombre del archivo es demasiado largo" }, { status: 400 });
    }
    
    // Sanitiza el nombre del archivo para evitar problemas de seguridad
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, "_");

    const expires = Date.now() + 2 * 60 * 1000; // 2 minutos
    const signature = crypto
        .createHmac("sha256", SECRET as string)
        .update(`${sanitizedFilename}:${expires}`)
        .digest("hex");


    const presignedURL = `http://localhost:4000/upload-direct?filename=${sanitizedFilename}&expires=${expires}&sig=${signature}`;

    return NextResponse.json({ presignedURL });
})
