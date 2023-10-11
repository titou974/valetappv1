import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

export async function GET(req, {params}) {
  const prisma = new PrismaClient();
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
