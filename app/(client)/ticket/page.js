"use client"

import axios from 'axios';
import styles from '@/app/components/style';
import formatDateToFrench from '@/lib/formatdate';
import style from "../../ticket.module.css";
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { cguContent } from '@/constants';
import EmailModal from '@/app/components/loadingemail';





const getTicket = async (id) => {
  let ticketData = {};
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get(`${apiUrl}/api/ticket/${id}`);
    ticketData = response.data;
    console.log(ticketData);
  } catch (error) {
    console.error('Error fetching ticket data:', error);
  }

  return ticketData;
}

// eslint-disable-next-line @next/next/no-async-client-component
const TicketShow = () => {

  const [collapse, setCollapse] = useState(false);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [emailModal, setEmailModal] = useState(false);
  const [loadingDiv, setLoadingDiv] = useState(true);

  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticket");

  console.log(ticketId);
  console.log(collapse)

  useEffect(() => {
    const getTicketInfo = async () => {
      const ticket = await getTicket(ticketId);
      setTicketInfo(ticket);
      setLoadingDiv(false);
    }
    if (ticketId) {
      getTicketInfo()
    }
  }, [ticketId])




  return (
    <div className={`bg-secondary w-full ${collapse ? "h-full" : "h-screen"}`}>
      <div className={`${styles.padding} flex flex-col justify-between h-full`}>
        <div className="">
          <p className={styles.subTextBlack}>Bienvenue au</p>
          <p className={styles.headTextBlack}>{loadingDiv ?  <span className="animate-pulse bg-gray-400/50 rounded-md h-[50px]" style={{ animationDelay: `${1 * 0.05}s`, animationDuration: "1s"}}><span className="invisible">Gourmet Galaxy</span></span> : ticketInfo?.restaurant.name}</p>
        </div>
          <div className={`${style.digitalTicket} ${collapse ? "mt-28" : ""}`}>
            <div className='flex items-center gap-4 rounded-md px-8'>
              <p className={`${styles.headText} pb-2`}>Votre Ticket</p>
              <div className='border border-2 px-1 mb-[10px] rounded-md'>
                <p className='font-semibold text-[20px]'>{loadingDiv ? <span className="animate-pulse bg-gray-400/70 rounded-md h-[50px]" style={{ animationDelay: `${2 * 0.05}s`, animationDuration: "1s"}}><span className="invisible">16 €</span></span>  : `${ticketInfo?.restaurant.ticketPrice} €`}</p>
              </div>
            </div>
            <div className='border-[1px] mb-5 px-8'>
            </div>
            <div className='text-base py-2 px-8'>
              <p className='py-1'>{loadingDiv ? <span className="animate-pulse bg-gray-400/70 rounded-md h-[50px]" style={{ animationDelay: `${4 * 0.05}s`, animationDuration: "1s"}}><span className="invisible">crée à 01h35 le 26/10/2023</span></span> : formatDateToFrench(ticketInfo?.scannedAt)}</p>
              <p className='py-1'><span className='italic font-semibold'>{loadingDiv ? <span className="animate-pulse bg-gray-400/70 rounded-md h-[50px]" style={{ animationDelay: `${3 * 0.05}s`, animationDuration: "1s"}}><span className="invisible">au Gourmet Galaxy</span></span> : `au ${ticketInfo?.restaurant.name}`}</span></p>
            </div>
            <div className='justify-between flex py-5 items-center'>
              <div className=''>
                <svg width="25" height="50" viewBox="0 0 25 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 50C13.8071 50 25 38.8071 25 25C25 11.1929 13.8071 0 0 0V50Z" fill="#E7E7E7"/>
                </svg>
              </div>
              {collapse && (
                <div className={`transition-all border-[1px] border-secondary border-dashed w-full h-0`}>
                </div>
              )}
              <div className=''>
                <svg width="25" height="50" viewBox="0 0 25 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50L25 0Z" fill="#E7E7E7"/>
                </svg>
              </div>
            </div>
            <div className='mx-auto w-full text-center'>
              <button onClick={() => setCollapse(!collapse)}>
                <p className='text-center pb-1'>{!collapse ? "Voir les conditions générales" : ""}</p>
                <ChevronDownIcon class={`${collapse ? "transform rotate-180" : ""} h-6 w-6 text-white mx-auto transition-all`} />
              </button>
            </div>
            <span className={`long-text ${collapse ? "expanded" : ""} px-8`}>
              <p className='pb-5'>CONDITIONS GÉNÉRALES D’UTILISATION DE NESTOR APP</p>
              {cguContent.map((part, index) => (
                <div key={index} className='pb-5'>
                  <h3 className='font-semibold'>{part.subtitle}</h3>
                  <p>{part.text}</p>
                </div>
              ))}
            </span>
          </div>
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
      <EmailModal isOpen={emailModal} setIsOpen={(e) => setEmailModal(e)} siteName={ticketInfo?.restaurant.name} scannedAt={ticketInfo?.scannedAt} ticketPrice={ticketInfo?.restaurant.ticketPrice} />
    </div>
  )
}

export default TicketShow;
