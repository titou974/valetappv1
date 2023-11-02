import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req, {params}) {
  const id  = params.id
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: id },
      include: { restaurant: true, user: true },
    });
    return NextResponse.json(ticket);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
