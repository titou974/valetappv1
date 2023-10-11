import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  const json = await req.json()
  const { role, restaurant } = json
  try {
    const newUser = await prisma.user.create({
      data: {
        role,
      }
    })
    const newTicket = await prisma.ticket.create({
      data: {
        userId: newUser.id,
        restaurantId: Number(restaurant),
        scannedAt: new Date(),
      }
    })
    console.log(newTicket.id)
    return NextResponse.json({ ticketId: newTicket.id });
  } catch (error) {
    return NextResponse.json({error: "Registration failed for client" })
  }
}
