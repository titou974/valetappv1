import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req, {params}) {
  const id  = params.id
  try {
    const tokenData = await prisma.user.findUnique({
      where: { resetToken: id },
    });
    if (tokenData) {
      return NextResponse.json(true);
    } else {
      return NextResponse.json(false);
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
