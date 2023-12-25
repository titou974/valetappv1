"use client"
import Image from 'next/image';
import styles from './components/style';
import QrCode from "@/app/components/qrcodesvg";
import Link from 'next/link';
import { QrCodeIcon } from '@heroicons/react/20/solid';
import { Roboto_Mono } from 'next/font/google';
import TypewriterComponent from "typewriter-effect";
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";


const roboto_mono = Roboto_Mono({ subsets: ['latin'] })

const getSession = async () => {
  let siteData = {};
  try {
    const response = await axios.get(`/api/session`);
    console.log(response);
    siteData = response.data;
  } catch (error) {
    console.log("Error Session:", error.message)
  }
  return siteData;
}

const Home = () => {

  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getSessionData = async () => {
      const sessionData = await getSession();
      if (!sessionData.authenticated || Object.keys(sessionData.authenticated).length === 0) {
        console.log("pas de session");
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
        router.push("/dashboard");
      }
    }
    getSessionData();
  }, [])

  const introductionTexts = ["Bonjour, je suis Nestor, votre assistant voiturier.", "Scannez le QR code proposé par votre voiturier pour créer votre ticket."]
  const typewriterRef = useRef(null);
  return (
    <main className="w-full bg-tertiary h-screen relative">
      <div className={`${styles.padding} flex flex-col justify-center h-full gap-8`}>
        {/* <div>
          <h3 className={styles.subText}>Je suis votre assistant,</h3>
          <h2 className={styles.headText}>Nestor</h2>
        </div> */}
        <div className={`mx-auto relative ${roboto_mono.className}`}>
          <div className='absolute top-1 right-5'>
            <div className='relative bg-[#1b2e35] py-5 px-5 rounded-full w-[330px] min-w-[330px] h-[120px] shadow-xl border-white border-[2px] text-white'>
              <TypewriterComponent
                onInit={(typewriter) => {
                typewriter.changeDelay(50)
                .changeDeleteSpeed(10)
                .typeString(`${introductionTexts[0]}`)
                .pauseFor(5000)
                .deleteAll(1)
                .typeString(`<strong>${introductionTexts[1]}</strong>`)
                .pauseFor(10000)
                .deleteAll(1)
                .start();
                }}
                options={{
                  delay: 100,
                  loop: true
                }}
              />
              <svg width="37" height="48" viewBox="0 0 37 48" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute bottom-[-43px] right-[120px]'>
              <mask id="path-1-inside-1_86_73" fill="white">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 1C1.52231 23.8587 16.5703 42.6127 36.431 47.7336C29.8149 38.4613 25.873 26.7957 25.873 14.1232C25.873 9.5995 26.3753 5.20406 27.3223 1H0Z"/>
              </mask>
              <path fillRule="evenodd" clipRule="evenodd" d="M0 1C1.52231 23.8587 16.5703 42.6127 36.431 47.7336C29.8149 38.4613 25.873 26.7957 25.873 14.1232C25.873 9.5995 26.3753 5.20406 27.3223 1H0Z" fill="#1B2E35"/>
              <path d="M36.431 47.7336L35.9316 49.6702L41.2478 51.0409L38.059 46.5719L36.431 47.7336ZM0 1V-1H-2.13762L-1.99558 1.1329L0 1ZM27.3223 1L29.2734 1.43949L29.8229 -1H27.3223V1ZM36.9303 45.7969C17.9875 40.9127 3.46639 22.9525 1.99558 0.867102L-1.99558 1.1329C-0.421777 24.7649 15.1531 44.3127 35.9316 49.6702L36.9303 45.7969ZM23.873 14.1232C23.873 27.2124 27.9451 39.2841 34.8029 48.8952L38.059 46.5719C31.6848 37.6386 27.873 26.379 27.873 14.1232H23.873ZM25.3712 0.560508C24.3918 4.90837 23.873 9.4512 23.873 14.1232H27.873C27.873 9.7478 28.3588 5.49975 29.2734 1.43949L25.3712 0.560508ZM27.3223 -1H0V3H27.3223V-1Z" fill="white" mask="url(#path-1-inside-1_86_73)"/>
              <rect width="31" height="5" fill="#1B2E35"/>
              </svg>

            </div>
          </div>

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
              <p className={`text-center font-bold mr-4 text-[26px]`}>Scanner le QR Code</p>
              <div className='w-[40px]'>
                <QrCodeIcon  />
              </div>
            </div>
            <div className='text-center text-base font-bold'>
              <p>ou</p>
            </div>
            <Link href='newticket' className="bg-white w-full py-3 rounded-full flex items-center justify-center gap-2 transition-colors text-tertiary hover:bg-gray-200 mx-auto shadow-lg">
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
