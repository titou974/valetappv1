import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();


export async function POST(req) {
  const json = await req.json();
  const { name, phoneNumber } = json
  console.log("this is the json before saving", phoneNumber);
  try {
    const newUser = await prisma.user.create({
      data: {
        phoneNumber: phoneNumber,
        name: name,
        role: "VALET",
      }
    });
    console.log(newUser.id);
    return NextResponse.json({ userId: newUser.id })
  } catch (error) {
    return NextResponse.json({ error: "Registration failed for voiturier" })
  }
}
