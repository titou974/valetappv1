'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import EmailModal from '@/app/components/emailmodal';
import useCompany from '@/app/stores/company';
import useTicketClient from '@/app/stores/ticketclient';
import Ticket from '@/app/components/ticket';
import ClientLayout from '@/app/layouts/clientlayout';
import Navbar from '@/app/components/navbar';
import { Button } from '@nextui-org/react';
import FooterBarLayout from '@/app/layouts/footerbarlayout';
import { EnvelopeIcon } from '@heroicons/react/20/solid';

const TicketShow = () => {
  const [emailModal, setEmailModal] = useState(false);

  const searchParams = useSearchParams();
  const ticketId = searchParams.get('ticket');
  const companyId = searchParams.get('c');

  const { data: companyData } = useCompany({ companyId });
  const { data: ticketData, isLoading: isTicketLoading } = useTicketClient({
    ticketId,
  });

  return (
    <ClientLayout>
      <Navbar
        subtitle='Bienvenue au'
        title={ticketData?.restaurant.name}
        isLoading={isTicketLoading}
        position='static'
      />
      <Ticket
        isTicketLoading={isTicketLoading}
        ticketData={ticketData}
        companyData={companyData}
      />
      <FooterBarLayout>
        <Button
          onClick={(e) => setEmailModal(true)}
          className='fill-primary-foreground'
          size='lg'
          color='primary'
          variant='solid'
          radius='full'
          fullWidth={true}
          endContent={<EnvelopeIcon width={20} />}
        >
          Recevoir par email
        </Button>
      </FooterBarLayout>
      <div></div>
      <EmailModal
        companyCgu={companyData?.cgu}
        isOpen={emailModal}
        setIsOpen={(e) => setEmailModal(e)}
        siteName={ticketData?.restaurant.name}
        scannedAt={ticketData?.scannedAt}
        ticketPrice={ticketData?.restaurant.ticketPrice}
        ticketNumber={ticketData?.ticketNumber}
        userId={ticketData?.user.id}
        siret={companyData?.siret}
      />
    </ClientLayout>
  );
};

export default TicketShow;
