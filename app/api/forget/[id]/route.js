import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';

export async function GET(req, { params }) {
  const id = params.id;
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

export async function PATCH(req, { params }) {
  const id = params.id;
  const { password } = await req.json();
  try {
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.update({
      where: {
        resetToken: id,
      },
      data: {
        password: hashedPassword,
      },
    });
    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({
        message: 'failed finding user with this token',
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'failure patching password' },
      error.message,
      { status: 500 }
    );
  }
}
