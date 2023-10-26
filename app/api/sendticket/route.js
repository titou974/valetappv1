import { cguContent } from "@/constants";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import EmailTemplate from "@/app/components/email.template";

export async function POST() {
  const json = await req.json();
  const { email, siteName, scannedAt, ticketPrice } = json;
  console.log("json reçu pour le mail", json);

  try {
    const data = await Resend.emails.send({
      from: "Nestor APP <nestorapp@gmail.com>",
      to: [email],
      subject: "Votre ticket",
      react: EmailTemplate({ siteName, scannedAt, ticketPrice})})
      console.log("data envoyé", data)
      return NextResponse.json(data)
  } catch (error) {
    NextResponse.json({error: error.message})
  }
}
