export const uploadImage = async (file: File): Promise<string> => {
  try {
    // Obtiene la URL prefirmada
    const response = await fetch(`/api/presign?filename=${encodeURIComponent(file.name)}&filetype=${encodeURIComponent(file.type)}`);

    const { presignedURL, error } = await response.json();
    if (!presignedURL || error) {
      console.log("No se pudo obtener la URL prefirmada");
      console.log(error)
      return "";
    }

    const uploadResponse = await fetch(presignedURL, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (uploadResponse.ok) {
      const response = await uploadResponse.json();
      return response.url || "";
    } else {
      console.log("Error al subir el archivo:", { uploadResponse });
      return "";
    }
  } catch (error) {
    console.log("Error:", error);
    return "";
  }
};
