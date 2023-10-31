import { Container } from "@react-email/container";
import style from "../ticket.module.css";
import formatDateToFrench from "@/lib/formatdate";
import { cguContent } from "@/constants";
import styles from "./style";

const EmailTemplate = ({ siteName, scannedAt, ticketPrice }) => {
  return (

        <Container>
          <p style={{color: 'black'}}>Merci d&#39;avoir utilisé Nestor, l&#39;application française des voituriers 🇫🇷</p>
          <div style={{
              background: 'linear-gradient(138deg, rgba(36,160,237,1) 0%, rgba(69,218,255,1) 96%)',
              color: 'white',
              padding: '2em 0 2em 0',
              borderRadius: '1rem',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              position: 'relative',
              marginTop: '2em'
          }}>
            <div style={{ paddingLeft: '32px', paddingRight: '32px' }}>
              <p style={{ paddingBottom: '8px', fontWeight: '600', color: 'white', fontSize: '30px', marginTop: "2px", marginBottom: "2px"}}>Votre Ticket</p>
              <p style={{ fontWeight: '600', fontSize: "20px", paddingBottom: '8px', marginTop: "2px", marginBottom: "2px" }}>{ticketPrice} €</p>
            </div>
            <div style={{ borderBottom: '1px solid', marginBottom: '20px', paddingLeft: '32px', paddingRight: '32px'}}>
            </div>
            <div style={{ fontSize: '1rem', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '32px', paddingRight: '32px' }}>
              <p style={{ paddingTop: '4px', paddingBottom: '4px' }}>{formatDateToFrench(scannedAt)}</p>
              <p style={{ paddingTop: '4px', paddingBottom: '4px' }}><span style={{ fontStyle: 'italic', fontWeight: '600' }}>au {siteName}</span></p>
            </div>
          </div>
          <span style={{ paddingLeft: '32px', paddingRight: '32px', color: 'black' }}>
            <p style={{ paddingBottom: '20px' }}>CONDITIONS GÉNÉRALES D’UTILISATION DE NESTOR APP</p>
            {cguContent.map((part, index) => (
              <div key={index} style={{ paddingBottom: '20px' }}>
                <h3 style={{ fontWeight: '600' }}>{part.subtitle}</h3>
                <p>{part.text}</p>
              </div>
            ))}
          </span>
        </Container>

  )
}


export default EmailTemplate
