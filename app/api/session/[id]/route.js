import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
  const id = params.id;
  try {
    const session = await prisma.session.findUnique({
      where: {
        id: id
      },
      include : {
        restaurant: {
          select: {
            name: true,
          }
        },
        user: {
          select: {
            name: true,
          }
        }
      }
    })
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  const id = params.id;
  const json = await request.json();
  try {
    // Update the session
    const updatedSession = await prisma.session.update({
      where: { id: id },
      data: json,
      include: { restaurant: true } // Include restaurant to get its ID
    });

    if (updatedSession && updatedSession.restaurant) {
      // Fetch tickets of the restaurant created after the session's start
      const ticketsToUpdate = await prisma.ticket.findMany({
        where: {
          restaurantId: updatedSession.restaurant.id,
          createdAt: { gte: updatedSession.createdAt }
        }
      });

      // Update each ticket to associate it with the updated session
      await Promise.all(ticketsToUpdate.map(ticket =>
        prisma.ticket.update({
          where: { id: ticket.id },
          data: { sessionId: updatedSession.id }
        })
      ));
    }

    // Optionally, re-fetch the updated session with associated tickets
    const sessionWithTickets = await prisma.session.findUnique({
      where: { id: id },
      include: { tickets: true }
    });

    return NextResponse.json(sessionWithTickets);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
