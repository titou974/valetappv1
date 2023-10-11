import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, {params}) {
  const id  = params.id
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching voiturier' });
  } finally {
    await prisma.$disconnect();
  }
}
