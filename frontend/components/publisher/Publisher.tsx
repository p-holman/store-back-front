"use client";
import { useEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageInput } from "./ImageInput";
import { Textarea } from "@/components/ui/textarea";
import { uploadImage, publish } from "./fn";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(4, {
    message: "El título debe tener al menos 4 letras",
  }),
  description: z.string().min(4, { message: "Debe agregar una descripción" }),
  image: z.instanceof(File).optional(),
  price: z.string().regex(/^[1-9]\d*$/, {
    message: "El precio debe ser un número entero positivo",
  }),
});

type ImagePreview = {
  dataUrl: string;
  name: string;
};

export function Publisher() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<ImagePreview | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  // muestra la imagen antes de subirla
  const loadImagePreview = (file: File) => {
    if (file instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview({
          dataUrl: reader.result as string,
          name: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // scroll hacia el preview de la imagen cuando se carga
  useEffect(() => {
    if (imagePreview && imageContainerRef.current) {
      imageContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [imagePreview]);

  // Define formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const { title, description, image, price } = values;
    let imageUrl = "";

    if (image) {
      imageUrl = await uploadImage(image);
      if (!imageUrl) {
        setIsLoading(false);
        alert("Error al subir la imagen");
        return;
      }
    }

    const id = await publish(title, description, imageUrl, +price);
    if (!id) {
      alert("Error al publicar");
      // TODO: borrar la imagen subida si hubo error
      setIsLoading(false);
      return;
    }

    alert("Publicación exitosa");
    router.push(`/products/${id}`); // Redirige al producto publicado

  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder=""
                    {...field}
                  // onChange={e => field.onChange(e.target.valueAsNumber)} 
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Foto</FormLabel>

                <FormControl>
                  <ImageInput
                    onChange={(file) => {
                      field.onChange(file);
                      loadImagePreview(file);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  {imagePreview && `Imagen seleccionada: ${imagePreview.name}`}
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading ? (
            <Button disabled>Cargando</Button>
          ) : (
            <Button type="submit">Publicar</Button>
          )}
        </form>
      </Form>

      {imagePreview && (
        <div
          ref={imageContainerRef}
          className="mb-2 flex w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        >
          <img
            src={imagePreview.dataUrl}
            alt="preview"
            className="w-full h-auto"
          />
        </div>
      )}
    </>
  );
}
