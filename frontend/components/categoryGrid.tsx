import Link from "next/link";
import {
  Smartphone,
  Shirt,
  ToyBrick,
  PawPrint,
  Watch,
  Tv,
  Pizza,
  Hammer,
  BriefcaseBusiness,
  HousePlus,
  Car,
  Flower,
  Volleyball,
  Sofa,
  PencilRuler,
  CakeSlice,
  Megaphone,
  Flower2,
} from "lucide-react";

const categories = [
  { name: "Comunidad", icon: Megaphone, href: "/category/smartwatches" },
  { name: "Vestuario", icon: Shirt, href: "/category/smartphones" },
  { name: "Pastelería", icon: CakeSlice, href: "/category/smartwatches" },
  { name: "Delivery", icon: Pizza, href: "/category/smartwatches" },
  { name: "Hogar", icon: Sofa, href: "/category/tv" },
  { name: "Perfumería", icon: Flower, href: "/category/tv" },
  { name: "Deportes", icon: Volleyball, href: "/category/tv" },
  { name: "Electrónica", icon: Smartphone, href: "/category/laptops" },
  { name: "Plantas", icon: Flower2, href: "/category/smartwatches" },
  { name: "Librería", icon: PencilRuler, href: "/category/smartwatches" },
  { name: "Juguetes", icon: ToyBrick, href: "/category/cameras" },
  { name: "Mascotas", icon: PawPrint, href: "/category/tv" },
  { name: "Arriendos", icon: HousePlus, href: "/category/smartwatches" },
  { name: "Vehículos", icon: Car, href: "/category/tv" },

  { name: "Empleos", icon: BriefcaseBusiness, href: "/category/smartwatches" },
  { name: "Servicios", icon: Hammer, href: "/category/smartwatches" },
];

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-2 ">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className="flex flex-col items-center p-4 rounded-lg hover:shadow-lg transition-shadow bg-gray-50"
        >
          <category.icon
            className="w-8 h-8 mb-2 text-primary"
            strokeWidth={1}
          />
          <span className="text-xs font-medium">{category.name}</span>
        </Link>
      ))}
    </div>
  );
}
