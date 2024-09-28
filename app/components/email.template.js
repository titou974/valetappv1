import { Html, Head, Preview, Tailwind, Body, Container, Section, Row, Column, Img, Link, Heading, Text, Hr } from "@react-email/components";
import formatDateToFrench from "@/lib/formatdate";
import { cguContent, main, tableCell, heading, cupomText, supStyle, informationTable, informationTableRow, informationTableColumn, informationTableValue, informationTableLabel, productTitle, productTitleTable, productDescription, productIcon, productLink, productPriceWrapper, productPrice, productPriceLine, productPriceLineBottom, block, ctaTitle, ctaText, walletWrapper, walletLink, walletImage, walletLinkText, walletBottomLine, footerText, footerTextCenter, footerLink, footerIcon, footerLinksWrapper, footerCopyright, productsTitle, productPriceVerticalLine, productPriceLargeWrapper, productPriceTotal, productPriceLarge, divisor, container, topFooterText } from "@/constants";


const EmailTemplate = ({ siteName, scannedAt, ticketPrice, ticketNumber, companyCgu, email }) => {
  return (
      <Html>
        <Head />
        <Preview>Et voilà votre ticket de voiturier 🅿️</Preview>
    
        <Body style={main}>
          <Container style={container}>
            <Section>
              <Row>
                <Column>
                  <Img
                    src={`https://nestorapp.app/nestor.png`}
                    width="100"
                    height="100"
                    alt="Apple Logo"
                  />
                </Column>
    
                <Column align="right" style={tableCell}>
                  <Text style={heading}>Reçu</Text>
                </Column>
              </Row>
            </Section>
            <Section>
              <Text style={cupomText}>
              Merci d&#39;avoir utilisé Nestor
                <sup style={supStyle}>*</sup>{" "}
                <Link href="https://www.apple.com/apple-card">
                l&#39;application française des voituriers 🇫🇷
                </Link>
              </Text>
            </Section>
            <Section style={informationTable}>
              <Row style={informationTableRow}>
                <Column colSpan={2}>
                  <Section>
                    <Row>
                      <Column style={informationTableColumn}>
                        <Text style={informationTableLabel}>EMAIL</Text>
                        <Link
                          style={{
                            ...informationTableValue,
                            color: "#15c",
                            textDecoration: "underline",
                          }}
                        >
                        {email}
                        </Link>
                      </Column>
                    </Row>

                    <Row>
                      <Column style={informationTableColumn}>
                        <Text style={informationTableLabel}>DATE DE LA FACTURE</Text>
                        <Text style={informationTableValue}>le 28/09/2024</Text>
                      </Column>
                    </Row>

                    <Row>
                      <Column style={informationTableColumn}>
                        <Text style={informationTableLabel}>TICKET ID</Text>
                        <Link
                          style={{
                            ...informationTableValue,
                            color: "#15c",
                            textDecoration: "underline",
                          }}
                        >
                          #{ticketNumber}
                        </Link>
                      </Column>
                    </Row>
                  </Section>
                </Column>
                <Column style={informationTableColumn} colSpan={2}>
                  <Text style={informationTableLabel}>Lieu</Text>
                  <Text style={informationTableValue}>{siteName}</Text>
                </Column>
              </Row>
            </Section>
            <Section style={productTitleTable}>
              <Text style={productsTitle}>Votre reçu</Text>
            </Section>
            <Section>
              <Row>
                <Column style={{ paddingLeft: "22px" }}>
                  <Text style={productTitle}>Service de voiturier</Text>
                  <Text style={productDescription}>{siteName}</Text>
                  <Link
                    href="https://userpub.itunes.apple.com/WebObjects/MZUserPublishing.woa/wa/addUserReview?cc=us&amp;id=1497977514&amp;o=i&amp;type=Subscription%20Renewal"
                    style={productLink}
                    data-saferedirecturl="https://www.google.com/url?q=https://userpub.itunes.apple.com/WebObjects/MZUserPublishing.woa/wa/addUserReview?cc%3Dus%26id%3D1497977514%26o%3Di%26type%3DSubscription%2520Renewal&amp;source=gmail&amp;ust=1673963081204000&amp;usg=AOvVaw2DFCLKMo1snS-Swk5H26Z1"
                  >
                    Un problème ? Contactez-nous
                  </Link>
                </Column>
    
                <Column style={productPriceWrapper} align="right">
                  <Text style={productPrice}>{ticketPrice}€</Text>
                </Column>
              </Row>
            </Section>
            <Hr style={productPriceLine} />
            <Section align="right">
              <Row>
                <Column style={tableCell} align="right">
                  <Text style={productPriceTotal}>TOTAL</Text>
                </Column>
                <Column style={productPriceVerticalLine}></Column>
                <Column style={productPriceLargeWrapper}>
                  <Text style={productPriceLarge}>{ticketPrice}€</Text>
                </Column>
              </Row>
            </Section>
            <Hr style={productPriceLineBottom} />
            

            {companyCgu ? companyCgu.map((part, index) => (
                  <div key={index}>
                    <Text style={topFooterText}>{part.subtitle}</Text>
                    <Text style={footerText}>{part.text}</Text>
                  </div>
                )) : cguContent.map((part, index) => (
                  <div key={index}>
                    <Text style={topFooterText}>{part.subtitle}</Text>
                    <Text style={footerText}>{part.text}</Text>
                  </div>
              ))}
            <Section>
              <Row>
                <Column align="center" style={footerIcon}>
                  <Img
                    src={`https://nestorapp.app/nestor.png`}
                    width="26"
                    height="26"
                    alt="Apple Card"
                  />
                </Column>
              </Row>
            </Section>
            <Text style={footerLinksWrapper}>
              <Link href="https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/accountSummary?mt=8">
                CGU
              </Link>{" "}
              •{" "}
              <Link href="https://www.apple.com/legal/itunes/us/sales.html">
                Conditions de ventes
              </Link>{" "}
              •{" "}
              <Link href="https://www.apple.com/legal/privacy/">
                Politique de confidentialité
              </Link>
            </Text>
            <Text style={footerCopyright}>
              Copyright © 2024 Nestor App. <br />{" "}
              <Link href="https://www.apple.com/legal/">Tous droits réservés</Link>
            </Text>
          </Container>
        </Body>
      </Html>
  );
}

export default EmailTemplate;
