import { Publisher } from "@/components/index";
import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";

export default async function PublisherPage() {
  const session = await auth();
  if (!session) redirect("/login?origin=publisher");
  return (
    <>
      <Publisher />
    </>
  );
}
