import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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
        restaurantId: restaurant,
        scannedAt: new Date(),
      }
    })
    return NextResponse.json({ ticketId: newTicket.id });
  } catch (error) {
    return NextResponse.json({error: "Registration failed for client" })
  }
}
