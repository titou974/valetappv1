import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const restaurantId = req.nextUrl.searchParams.get('restaurantId');
  const startDate = new Date(req.nextUrl.searchParams.get('startDate'));

  try {
    const tickets = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: {
        tickets: {
          where: {
            createdAt: { gte: startDate },
          },
        },
      },
    });
    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
