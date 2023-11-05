import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import sanitizePhoneNumber from "@/app/components/sanitizephoneNumber";
import jwt from "jsonwebtoken";


export async function POST(req) {
  try {
    const { phoneNumber } = await req.json();

    console.log("Received:", { phoneNumber });

    if (!phoneNumber) {
      console.log("Invalid data received.");
      return NextResponse.json({ message: "Invalid data received." });
    }

    const validatePhoneNumber = (number) => {
      const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
      return phoneRegex.test(number);
    };

    const validNumber = validatePhoneNumber(phoneNumber);

    if (!validNumber) {
      console.log("Invalid phone number received.");
      return NextResponse.json({ message: "Invalid phone number received." });
    }

    const sanitizedPhoneNumber = sanitizePhoneNumber(phoneNumber);
    console.log(sanitizedPhoneNumber);

    const existingUserByPhoneNumber = await prisma.user.findFirst({
      where: { phoneNumber: sanitizedPhoneNumber },
    });

    if (!existingUserByPhoneNumber) {
      console.log("User doesn't exists with this phone number.");
      return NextResponse.json({ message: "User doesn't exists with this phone number." });
    } else {
      const token = jwt.sign({ _id: existingUserByPhoneNumber.id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      })
      const saveToken = await prisma.user.update({
        where: {
          id: existingUserByPhoneNumber.id
        },
        data: {resetToken: token}
      })
      return NextResponse.json({ token: saveToken.resetToken, message: "Token de réinitialisation généré" });
    }

  } catch (error) {
    console.log("Error during user registration:", error.message);
    return NextResponse.json({ userId: null, message: "Registration failed for voiturier", error: error.message });
  }
}
