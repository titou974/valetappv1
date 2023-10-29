import Image from 'next/image';
import styles from './components/style';
import QrCode from "@/app/components/qrcodesvg";
import Link from 'next/link';
import { QrCodeIcon } from '@heroicons/react/20/solid';



const Home = () => {
  return (
    <main className="w-full bg-tertiary h-screen relative">
      <div className={`${styles.padding} flex flex-col justify-center h-full gap-10`}>
        {/* <div>
          <h3 className={styles.subText}>Je suis votre assistant,</h3>
          <h2 className={styles.headText}>Nestor</h2>
        </div> */}
        <div className='mx-auto'>
          <Image src="/nestor.png" width={400} height={400} alt="Nestor during his job" />
        </div>
        <div href="/" className="w-full flex flex-col items-center gap-20 text-white">
          {/* <div className='flex flex-col items-center gap-5'>
            <p className='text-[20px]'>Scanner le QR Code</p>
            <QrCode />
          </div>
          <p className='text-[20px]'>Ou</p> */}
          <div className='w-full flex flex-col gap-5'>
            <div className='text-center mx-auto w-full flex justify-center items-center'>
              <p className={`text-center font-bold mr-5 text-[26px]`}>Scanner le QR Code</p>
              <div className='w-[50px]'>
                <QrCodeIcon  />
              </div>
            </div>
            <div className='text-center text-base font-bold'>
              <p>ou</p>
            </div>
            <Link href='newticket' className="bg-white w-10/12 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors text-tertiary hover:bg-gray-200 mx-auto shadow-lg">
              <p className="font-semibold text-[26px]">Créer votre ticket</p>
              <div className="w-[26px]">
                <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
            <Link href={`sign-in`} className="mx-auto w-2/3 py-[12px] rounded-full font-bold hover:bg-[#E4F5FF] transition-colors flex justify-center items-center gap-2 text-white hover:shadow-lg hover:bg-gray-200 hover:bg-opacity-50">
              <p>Je suis voiturier</p>
              <div className="w-[20px]">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home;
