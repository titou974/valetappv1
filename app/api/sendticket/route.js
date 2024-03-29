import { cguContent } from "@/constants";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import EmailTemplate from "@/app/components/email.template";

const resend = new Resend(process.env.RESEND_KEY);


export async function POST(req) {
  const json = await req.json();
  const { email, siteName, scannedAt, ticketPrice, ticketNumber } = json;
  try {
    const data = await resend.emails.send({
      from: "Nestor APP <nestorapp@cheapcheap.site>",
      to: [email],
      subject: "Votre ticket",
      react: EmailTemplate({ siteName, scannedAt, ticketPrice, ticketNumber})
    });
      return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({error: error.message})
  }
}
