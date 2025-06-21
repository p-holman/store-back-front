"use client";

import { Camera } from "lucide-react";
import { useRef } from "react";
import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: "image/webp",
};

interface Props {
  onChange: (img: File) => void;
}

export const ImageInput = (props: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];

    // cuando tienes ya algo seleccionado y presionas para seleccionar pero no seleccionas
    if (!file) return;

    if (!file?.type.startsWith("image/")) {
      alert("El archivo no es una imagen");
      return;
    }

    if (file.name.includes(" ")) {
      const newName = file.name.replace(/\s/g, "_");
      const updatedFile = new File([file], newName, { type: file.type });
      file = updatedFile;
    }

    if (file.size > 1 * 1024 * 1024) {
      // comprime la imagen
      const blob = await imageCompression(file, options);
      const compressedFile = new File([blob], file.name, {
        type: blob.type,
      });
      props.onChange(compressedFile);
      return;
    }
    props.onChange(file);
  };

  const handleClick = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex justify-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
    >
      <Camera />
      <input
        ref={ref}
        hidden
        accept="image/*"
        type="file"
        onChange={onFileChange}
      />
    </div>
  );
};
