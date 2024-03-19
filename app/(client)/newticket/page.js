"use client"

import styles from "@/app/components/style";
import { useRouter } from "next/navigation";
import LoadingModal from "@/app/components/loadingmodal";
import { QrCodeIcon } from "@heroicons/react/20/solid";
import useTicket from "@/app/stores/ticket";
import { useSearchParams } from "next/navigation";
import ClientLayout from "@/app/layout/clientlayout";

const Register = () => {
  const searchParams = useSearchParams();
  const siteId = searchParams.get("site");

  const router = useRouter();
  const { data, isLoading } = useTicket({ siteId, router })

  return (
    <ClientLayout>
      <div className={`${styles.padding} flex flex-col justify-between h-full`}>
        {isLoading? (
          <div>
            <div className="animate-pulse bg-gray-400/50 rounded-md mb-2" style={{ animationDelay: `${1 * 0.05}s`, animationDuration: "1s"}}>
              <h3 className={`${styles.subText} invisible`}>Bonjour</h3>
            </div>
            <div className="animate-pulse bg-gray-400/50 rounded-md" style={{ animationDelay: `${2 * 0.05}s`, animationDuration: "1s"}}>
              <h2 className={`${styles.headText} invisible `}>Prêt, à travailler ?</h2>
            </div>
          </div>
        ) : (
          <>
            {data?.name ? (
              <div>
                <h3 className={styles.subTextBlack}>Bienvenue au</h3>
                <h2 className={styles.headTextBlack}>{data?.name}</h2>
              </div>
            ) : (
              <div>
                <h3 className={styles.subTextBlack}>Créer</h3>
                <h2 className={styles.headTextBlack}>votre Ticket 🅿️</h2>
              </div>
            )}
          </>
        )}
        {isLoading? (
          <div className="animate-pulse bg-gray-400/50 rounded-md py-2" style={{ animationDelay: `${3 * 0.05}s`, animationDuration: "1s"}}>
            <p className={`invisible`}>Votre voiture vas être prise en charge...</p>
          </div>
        ) : (
          <>
            {
              data?.name ? (
                <div className="w-full flex flex-col justify-center gap-10">
                  <div className='text-center mx-auto w-full flex justify-center items-center'>
                    <p className={`text-center font-bold mr-4 text-[26px]`}>Scanner le QR Code</p>
                    <div className='text-tertiary w-[40px]'>
                      <QrCodeIcon  />
                    </div>
                  </div>
                  <div className="text-black text-base text-center">
                    <p>pour vous connecter</p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-center">Votre voiture vas être prise en charge...</p>
                </div>
              )
            }
          </>
        )}
        <div className="mb-20">
          {isLoading? (
            <div className="w-full animate-pulse bg-gray-400/50 rounded-full" style={{ animationDelay: `${4 * 0.05}s`, animationDuration: "1s"}}>
              <p className="font-semibold text-[26px] invisible">Créer votre ticket</p>
              <div className="w-[26px] invisible">
                <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          ) : (
            <button className={`bg-tertiary w-full py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors text-white hover:text-tertiary shadow-lg ${!data?.name && 'hidden'}`}>
              <p className="font-semibold text-[26px]">Créer votre ticket</p>
              <div className="w-[26px]">
                <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </button>
          )}
        </div>
      </div>
      <LoadingModal isOpen={isLoading} setIsOpen={(e) => setIsLoading(e)} title="Création de votre ticket" />
    </ClientLayout>
  )
}

export default Register;
