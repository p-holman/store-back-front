import { Store } from "lucide-react";
import { LoginForm } from "@/components/index";

interface PageProps {
  searchParams: {
    origin?: string;
  };
}

export default async function LoginPage({ searchParams }: PageProps) {
  const { origin } = await searchParams;
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Store className="size-4" />
          </div>
          Mercadito
        </a>
        <LoginForm origin={origin} />
      </div>
    </div>
  );
}