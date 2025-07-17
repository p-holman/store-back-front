import { CategoryGrid, ProductCarousel } from "@/components/index";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center justify-items-center gap-8 py-4 px-2">
      <ProductCarousel />
      <CategoryGrid />
    </div>
  );
}
