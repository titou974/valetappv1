import axios from 'axios';
import styles from '@/app/components/style';


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
          <div className='bg-white w-full rounded-full py-10 flex-col items-center justify-center'>
            <p className='text-center py-5'>Votre ticket</p>
            <p className='text-black text-center py-5'>{ticket.scannedAt}</p>
            <p></p>
          </div>
          <div>
          <button className="bg-tertiary w-full py-3 rounded-full flex items-center justify-center gap-3 hover:bg-white transition-colors bottom-28 text-white hover:text-black">
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
