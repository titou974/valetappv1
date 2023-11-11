import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req) {
  try {
    const companyData = await prisma.company.findMany();
    return NextResponse.json(companyData);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching company', status: 500})
  }
}
