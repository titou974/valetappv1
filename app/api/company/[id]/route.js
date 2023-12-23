import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
    const id = params.id;
    try {
        const company = await prisma.company.findUnique({
            where: { id: id },
        });
        return NextResponse.json(company);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}