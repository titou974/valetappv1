import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req, {params}) {
  const id  = params.id
  try {
    const site = await prisma.restaurant.findUnique({
      where: { id: id },
    });
    console.log(site);
    return NextResponse.json(site);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching site...' });
  } finally {
    await prisma.$disconnect();
  }
}
