import axios from 'axios';
import styles from '@/app/components/style';
import formatDateToFrench from '@/lib/formatdate';
import style from "../../../ticket.module.css";
import { ChevronDownIcon } from '@heroicons/react/20/solid';




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

const TicketShow = async ({ params }) => {
  const ticket = await getTicket(params.id);
  console.log(ticket);
  return (
    <div className='bg-secondary h-screen w-full'>
      <div className={`${styles.padding} flex flex-col justify-between h-full`}>
        <div>
          <p className={styles.subTextBlack}>Bienvenue au</p>
          <p className={styles.headTextBlack}>{ticket.restaurant.name}</p>
        </div>
          <div className={style.digitalTicket}>
            <p className={`${styles.headText} pb-2`}>Votre Ticket</p>
            <div className='border-[1px] mb-5'>
            </div>
            <div className='text-base mb-20'>
              <p className='py-1'>{formatDateToFrench(ticket.scannedAt)}</p>
              <p className='py-1'>au <span className='italic font-semibold'>{ticket.restaurant.name}</span></p>
            </div>
            <div>
              <p className='text-center pb-1'>Voir les conditions générales</p>
              <ChevronDownIcon class="h-6 w-6 text-white mx-auto" />
            </div>
            <div className='absolute left-0 bottom-24'>
              <svg width="25" height="50" viewBox="0 0 25 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 50C13.8071 50 25 38.8071 25 25C25 11.1929 13.8071 0 0 0V50Z" fill="#E7E7E7"/>
              </svg>
            </div>
            <div className='hidden border-[1px] border-secondary border-dashed absolute bottom-[117px] w-full left-1/2 transform -translate-x-1/2'>
            </div>
            <div className='absolute right-0 bottom-24'>
              <svg width="25" height="50" viewBox="0 0 25 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50L25 0Z" fill="#E7E7E7"/>
              </svg>
            </div>
          </div>
          <div>
          <button className="bg-tertiary w-full py-3 rounded-full flex items-center justify-center gap-3 hover:bg-white transition-colors bottom-28 text-white hover:text-black shadow-xl">
            <p className="font-semibold text-[23px]">Recevoir par email</p>
            <div className="w-[26px]">
              <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.75 23.25H8.25C4.5 23.25 2 21.375 2 17V8.25C2 3.875 4.5 2 8.25 2H20.75C24.5 2 27 3.875 27 8.25V17C27 21.375 24.5 23.25 20.75 23.25Z" stroke="white" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20.75 8.875L16.8375 12C15.55 13.025 13.4375 13.025 12.15 12L8.25 8.875" stroke="white" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </button>
          </div>
          <div className="text-center">
            <p className="text-black">Nestor App 🇫🇷</p>
          </div>
      {/* <LoadingModal isOpen={loading} setIsOpen={(e) => setLoading(e)} title="Fin de votre session" /> */}
      </div>
    </div>
  )
}

export default TicketShow;
