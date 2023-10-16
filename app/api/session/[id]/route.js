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

export async function PATCH( request, { params }) {
  const id = params.id;
  const json = await request.json();
  try {
    const updated = await prisma.session.update({
      where: {
        id: id,
      },
      data: json
    })
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
