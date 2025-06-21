"use server";

import { auth } from "@/auth/auth";
import { prisma } from "@/prisma";

export const publish = async (
  title: string,
  description: string,
  imageUrl: string,
  price: number,
): Promise<boolean | string> => {
  const session = await auth();

  if (!session?.user?.id) {
    console.log("not user");
    return false;
  }

  try {
    const response = await prisma.product.create({
      data: {
        title,
        description,
        imageUrl,
        userId: session.user.id,
        price,
      },
    });
    return response.id;

  } catch (error) {
    console.log(error);
    return false;
  }

};
