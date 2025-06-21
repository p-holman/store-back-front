import Image from "next/image"
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Heart, Share2 } from "lucide-react"
import { prisma } from '../../../prisma'
import { Product } from "@prisma/client";

// Datos de ejemplo del producto
// const product = {
//   id: "1",
//   name: "Camiseta Premium de Algodón",
//   description:
//     "Una camiseta de alta calidad confeccionada con 100% algodón orgánico. Perfecta para el uso diario, ofrece comodidad excepcional y durabilidad. Disponible en varios colores y tallas.",
//   price: 29.99,
//   originalPrice: 39.99,
//   image: "/placeholder.svg?height=600&width=600",
//   category: "Ropa",
//   isActive: true,
//   rating: 4.5,
//   reviews: 128,
// }

interface Props {
  params: { id: string };
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {

  try {

    const { id } = await params;
    const { title, description } = await getProduct(id);

    return {
      title: `#${id} - ${title}`,
      description
    }

  } catch (error) {
    return {
      title: 'Página del producto',
      description: ''
    }
  }
}

const getProduct = async (id: string): Promise<Product> => {


  const product = await prisma.product.findUnique({
    where: { id },
  });
  if (!product) {
    notFound();
  }

  return product;

}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Imagen del producto */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.title}
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </CardContent>
            </Card>
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            {/* Categoría */}
            <Badge variant="secondary" className="text-sm">
              {product.category || "Sin categoría"}
            </Badge>

            {/* Nombre del producto */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>

              {/* Rating y reseñas */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(5) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {5} ({Math.floor(Math.random() * 100)} reseñas)
                </span>
              </div>
            </div>

            {/* Precio */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                {
                  product.salePrice ? (
                    <>
                      <span className="text-3xl font-bold text-gray-900">${product.salePrice}</span>
                      <span className="text-xl text-gray-500 line-through">${product.price}</span>
                    </>

                  ) : (
                    <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                  )
                }
              </div>
              {product.salePrice && (
                <Badge variant="destructive" className="text-sm">
                  Ahorra ${(product.price - product.salePrice).toFixed(2)}
                </Badge>
              )}
            </div>

            {/* Descripción */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Descripción</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Estado de stock */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.isActive ? "bg-green-500" : "bg-red-500"}`} />
              <span className={`text-sm font-medium ${product.isActive ? "text-green-700" : "text-red-700"}`}>
                {product.isActive ? "En stock" : "Agotado"}
              </span>
            </div>

            {/* Botones de acción */}
            <div className="space-y-4">
              <Button size="lg" className="w-full" disabled={!product.isActive}>
                {product.isActive ? "Agregar al carrito" : "Agotado"}
              </Button>

              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="flex-1">
                  <Heart className="w-4 h-4 mr-2" />
                  Favoritos
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>

            {/* Información adicional */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío:</span>
                    <span className="font-medium">Gratis en pedidos +$50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Entrega:</span>
                    <span className="font-medium">2-3 días hábiles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Devoluciones:</span>
                    <span className="font-medium">30 días</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
