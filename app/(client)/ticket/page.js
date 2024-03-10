"use client"

import styles from '@/app/components/style';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import EmailModal from '@/app/components/loadingemail';
import useCompany from '@/app/stores/company';
import useTicketClient from '@/app/stores/ticketclient';
import Ticket from '@/app/components/ticket';

const TicketShow = () => {
  const [emailModal, setEmailModal] = useState(false);

  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticket");
  const companyId = searchParams.get("c");

  const { data: companyData } = useCompany({ companyId });
  const { data: ticketData, isLoading: isTicketLoading } = useTicketClient({ ticketId });

  return (
    <div className={`bg-secondary w-full h-screen`}>
      <div className={`${styles.padding} flex flex-col justify-between h-full`}>
        <div className="">
          <p className={styles.subTextBlack}>Bienvenue au</p>
          <p className={styles.headTextBlack}>{isTicketLoading ?  <span className="animate-pulse bg-gray-400/50 rounded-md h-[50px]" style={{ animationDelay: `${1 * 0.05}s`, animationDuration: "1s"}}><span className="invisible">Gourmet Galaxy</span></span> : ticketData?.restaurant.name}</p>
        </div>
        <Ticket isTicketLoading={isTicketLoading} ticketData={ticketData} companyData={companyData} />
        <div>
          <button onClick={(e) => setEmailModal(true)} className={`bg-tertiary w-11/12 py-3 rounded-full flex items-center justify-center gap-3 hover:bg-white transition-colors text-white hover:text-black shadow-xl stroke-white hover:stroke-black fixed bottom-[45px] left-1/2 transform -translate-x-1/2 `}>
            <p className="font-semibold text-[23px]">Recevoir par email</p>
            <div className="w-[26px]">
              <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.75 23.25H8.25C4.5 23.25 2 21.375 2 17V8.25C2 3.875 4.5 2 8.25 2H20.75C24.5 2 27 3.875 27 8.25V17C27 21.375 24.5 23.25 20.75 23.25Z" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20.75 8.875L16.8375 12C15.55 13.025 13.4375 13.025 12.15 12L8.25 8.875" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </button>
        </div>
        <div className="text-center">
          <p className="text-black">Nestor App 🇫🇷</p>
        </div>
      </div>
      <EmailModal isOpen={emailModal} setIsOpen={(e) => setEmailModal(e)} siteName={ticketData?.restaurant.name} scannedAt={ticketData?.scannedAt} ticketPrice={ticketData?.restaurant.ticketPrice} ticketNumber={ticketData?.ticketNumber} userId={ticketData?.user.id} />
    </div>
  )
}

export default TicketShow;
