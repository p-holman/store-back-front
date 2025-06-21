export const uploadImageToS3 = async (file: File): Promise<string> => {
  try {
    // Obtiene la URL prefirmada
    const response = await fetch("/api/generate-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
      }),
    });

    const { presignedURL } = await response.json();
    if (!presignedURL) {
      console.log("No se pudo obtener la URL prefirmada");
      return "";
    }

    // Sube el archivo directamente a S3
    const uploadResponse = await fetch(presignedURL, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (uploadResponse.ok) {
      return presignedURL.split("?")[0];
    } else {
      console.log("Error al subir el archivo:", { uploadResponse });
      return "";
    }
  } catch (error) {
    console.log("Error:", error);
    return "";
  }
};
