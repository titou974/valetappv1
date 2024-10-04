import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Row,
  Column,
  Img,
  Link,
  Text,
  Hr,
} from '@react-email/components';
import { formatDayDateToFrench } from '@/lib/formatdate';
import {
  cguContent,
  main,
  tableCell,
  heading,
  cupomText,
  supStyle,
  informationTable,
  informationTableRow,
  informationTableColumn,
  informationTableValue,
  informationTableLabel,
  productTitle,
  productTitleTable,
  productDescription,
  productLink,
  productPriceWrapper,
  productPrice,
  productPriceLine,
  productPriceLineBottom,
  footerText,
  footerIcon,
  footerCopyright,
  productsTitle,
  productPriceVerticalLine,
  productPriceLargeWrapper,
  productPriceTotal,
  productPriceLarge,
  container,
  topFooterText,
} from '@/constants';

const EmailTemplate = ({
  siteName,
  scannedAt,
  ticketPrice,
  ticketNumber,
  companyCgu,
  email,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL
    ? `https://${process.env.NEXT_PUBLIC_URL}`
    : '';

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
                  src={`${baseUrl}/nestortransparent.png`}
                  width='100'
                  height='100'
                  alt='Nestor Logo'
                />
              </Column>

              <Column align='right' style={tableCell}>
                <Text style={heading}>Facture</Text>
              </Column>
            </Row>
          </Section>
          <Section>
            <Text style={cupomText}>
              Merci d&rsquo;avoir utilisé Nestor. L&rsquo;application française
              des voituriers 🇫🇷
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
                          color: '#15c',
                          textDecoration: 'underline',
                        }}
                      >
                        {email}
                      </Link>
                    </Column>
                  </Row>

                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>
                        DATE DE LA FACTURE
                      </Text>
                      <Text style={informationTableValue}>
                        {formatDayDateToFrench(scannedAt)}
                      </Text>
                    </Column>
                  </Row>

                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>TICKET ID</Text>
                      <Text
                        style={{
                          ...informationTableValue,
                          color: '#15c',
                          textDecoration: 'underline',
                        }}
                      >
                        #{ticketNumber}
                      </Text>
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
              <Column style={{ paddingLeft: '22px' }}>
                <Text style={productTitle}>
                  Service de voiturier<sup style={supStyle}>*</sup>
                </Text>
                <Text style={productDescription}>{siteName}</Text>
              </Column>

              <Column style={productPriceWrapper} align='right'>
                <Text style={productPrice}>{ticketPrice}€</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={productPriceLine} />
          <Section align='right'>
            <Row>
              <Column style={tableCell} align='right'>
                <Text style={productPriceTotal}>TOTAL</Text>
              </Column>
              <Column style={productPriceVerticalLine}></Column>
              <Column style={productPriceLargeWrapper}>
                <Text style={productPriceLarge}>{ticketPrice}€</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={productPriceLineBottom} />
          <Text style={topFooterText}>
            *Voir les conditions générales d&rsquo;utilisation ci-contre:
          </Text>
          {companyCgu
            ? companyCgu.map((part, index) => (
                <div key={index}>
                  <Text style={topFooterText}>{part.subtitle}</Text>
                  <Text style={footerText}>{part.text}</Text>
                </div>
              ))
            : cguContent.map((part, index) => (
                <div key={index}>
                  <Text style={topFooterText}>{part.subtitle}</Text>
                  <Text style={footerText}>{part.text}</Text>
                </div>
              ))}
          <Section>
            <Row>
              <Column align='center' style={footerIcon}>
                <Img
                  src={`${baseUrl}/nestoricon.png`}
                  width='26'
                  height='26'
                  alt='Nestor Icon'
                />
              </Column>
            </Row>
          </Section>
          <Text style={footerCopyright}>
            Copyright © 2024 Nestor App. <br />{' '}
            <Link>Tous droits réservés</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplate;
