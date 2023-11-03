import EmailTemplate from "@/app/components/email.template";

const EmailTest = () => {
  return (
    <div>
      <EmailTemplate email='titouanhirsch@gmail.com' siteName='Gourmet Galaxy' scannedAt='2023-10-26T12:18:30.883Z' ticketPrice='12' ticketNumber={55} />
    </div>
  )
}

export default EmailTest;
