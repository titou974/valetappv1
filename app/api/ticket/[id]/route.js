import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

export async function GET(req, {params}) {
  const prisma = new PrismaClient();
  const id  = params.id
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: Number(id) },
      include: { restaurant: true, user: true },
    });
    console.log(ticket);
    return NextResponse.json(ticket);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching ticket' });
  } finally {
    await prisma.$disconnect();
  }
}
