import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/auth/auth";

interface Props {
  callbackUrl?: string;
  origin?: string;
}

export function LoginForm({ callbackUrl, origin }: Props) {
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenido</CardTitle>
          {origin === "publisher" && (
            <CardTitle className="text-lg">
              Para publicar debes iniciar sesión
            </CardTitle>
          )}
          {!origin && (
            <CardDescription>Inicia sesión con Google</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <form
            action={async () => {
              "use server";
              await signIn("google", {
                redirectTo: callbackUrl ?? "/",
              });

              // try {
              //   await signIn("google");
              // } catch (error) {
              //   // Signin can fail for a number of reasons, such as the user
              //   // not existing, or the user not having the correct role.
              //   // In some cases, you may want to redirect to a custom error
              //   if (error instanceof AuthError) {
              //     return redirect(`/login/signin-error?error=${error.type}`);
              //   }

              //   // Otherwise if a redirects happens Next.js can handle it
              //   // so you can just re-thrown the error and let Next.js handle it.
              //   // Docs:
              //   // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              //   console.log(error);
              //   // throw error;
              //   return redirect(`/login/signin-error`);
              // }
            }}
          >
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Ingresa con Google
                </Button>
              </div>

              <div className="text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <a href="#" className="underline underline-offset-4">
                  Regístrate
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      {/* TODO: implementar casilla de verificacion */}
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        Al iniciar sesión, aceptas nuestros<a href="#">Términos de Servicio</a>{" "}
        y nuestra <a href="#">Política de Privacidad</a>.
      </div>
    </div>
  );
}
