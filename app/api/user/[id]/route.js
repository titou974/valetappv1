import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PATCH( request, { params }) {
  const id = params.id;
  const json = await request.json();
  try {
    const updated = await prisma.user.update({
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
