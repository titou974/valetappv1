import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import sanitizePhoneNumber from "@/app/components/sanitizephoneNumber";


export async function POST(req) {
  try {
    const { name, phoneNumber, password } = await req.json();

    console.log("Received:", { name, phoneNumber, password });

    if (!name || !phoneNumber || !password) {
      console.log("Invalid data received.");
      return NextResponse.json({ userId: null, message: "Invalid data received." });
    }

    const sanitizedPhoneNumber = sanitizePhoneNumber(phoneNumber);
    console.log(sanitizedPhoneNumber);

    const existingUserByPhoneNumber = await prisma.user.findFirst({
      where: { phoneNumber: sanitizedPhoneNumber },
    });

    if (existingUserByPhoneNumber) {
      console.log("User exists with this phone number.");
      return NextResponse.json({ userId: null, message: "Un voiturier avec ce numéro existe déjà." });
    }
    const hashedPassword = await hash(password, 10)
    const newUser = await prisma.user.create({
      data: {
        phoneNumber: sanitizedPhoneNumber,
        name: name,
        password: hashedPassword,
        role: "VALET",
      },
    });

    console.log("User created:", newUser.id);
    return NextResponse.json({ userId: newUser.id });

  } catch (error) {
    console.log("Error during user registration:", error.message);
    return NextResponse.json({ userId: null, message: "Registration failed for voiturier", error: error.message });
  }
}
