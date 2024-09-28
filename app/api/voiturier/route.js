import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';
import sanitizePhoneNumber from '@/app/components/sanitizephoneNumber';

export async function POST(req) {
  try {
    const { name, phoneNumber, password, companyId } = await req.json();

    if (!name || !phoneNumber || !password || !companyId) {
      console.log('Invalid data received.');
      return NextResponse.json({
        userId: null,
        message: 'Invalid data received.',
      });
    }

    const validatePhoneNumber = (number) => {
      const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
      return phoneRegex.test(number);
    };

    const validNumber = validatePhoneNumber(phoneNumber);

    if (!validNumber) {
      console.log('Invalid phone number received.');
      return NextResponse.json({
        userId: null,
        message: 'Invalid phone number received.',
      });
    }

    const sanitizedPhoneNumber = sanitizePhoneNumber(phoneNumber);

    const existingUserByPhoneNumber = await prisma.user.findFirst({
      where: { phoneNumber: sanitizedPhoneNumber },
    });

    if (existingUserByPhoneNumber) {
      console.log('User exists with this phone number.');
      return NextResponse.json({
        userId: null,
        message: 'Un voiturier avec ce numéro existe déjà.',
      });
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        phoneNumber: sanitizedPhoneNumber,
        name: name,
        password: hashedPassword,
        companyId: companyId,
        role: 'VALET',
      },
    });

    return NextResponse.json({ userId: newUser.id });
  } catch (error) {
    console.log('Error during user registration:', error.message);
    return NextResponse.json({
      userId: null,
      message: 'Registration failed for voiturier',
      error: error.message,
    });
  }
}
