import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const id = params.id;
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

export async function PATCH(request, { params }) {
  const id = params.id;
  const json = await request.json();
  try {
    const updatedTicket = await prisma.ticket.update({
      where: { id: id },
      data: json,
    });
    return NextResponse.json('le ticket update', updatedTicket);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
