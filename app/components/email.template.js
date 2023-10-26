
const EmailTemplate = ({ siteName, scannedAt, ticketPrice }) => {
  return (
    <div>
      <h1>Voilà votre ticket:</h1>
      <p>{siteName}</p>
      <p>{scannedAt}</p>
      <p>{ticketPrice}</p>
    </div>
  )
}

export default EmailTemplate
