"use client"

import styles from "@/app/components/style";
import Link from "next/link";
import Input from "@/app/components/inputvalet";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import SelectInput from "@/app/components/selectinput";
import LoadingModal from "@/app/components/loadingmodal";
import { QrCodeIcon } from "@heroicons/react/20/solid";

const getSite = async (id) => {
  let siteData = {};
  try {
    const apiUrl = `${window.location.protocol}//${window.location.host}`;
    const response = await axios.get(`${apiUrl}/api/site/${id}`)
    siteData = response.data;
  } catch (error) {
    console.log('Error fetching user:', error.message);
  }
  return siteData;
}

const Register = () => {

  const searchParams = useSearchParams();
  const site = searchParams.get("site");
  const [siteExists, setSiteExists] = useState(false);
  const [siteData, setSiteData] = useState(null);
  const [siteDb, setSiteDb] = useState(null);
  const [loadingDiv, setLoadingDiv] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    checkSite()
    
    if (siteExists) {
      handleRegister(siteData);
    }

  }, [siteExists])

    const checkSite = async () => {
      const siteData = await getSite(site);

      if (!siteData || Object.keys(siteData).length === 0) {
        setSiteExists(false);
        setLoadingDiv(false);
        setIsLoading(false);
      } else {
        setSiteExists(true);
        setSiteData(siteData);
      }
    };

    const handleRegister = async (siteData) => {
    // e.preventDefault();
      setIsLoading(true);
      try {
        const response = await axios.post("/api/ticket", {
          role: "CLIENT",
          restaurant: siteData.id
        });
        const data = await response.data
        if (data.ticketId && siteData.companyId) {
          router.push(`/ticket?ticket=${data.ticketId}&c=${siteData.companyId}`)
        } else if (data.ticketId && !siteData.companyId) {
          router.push(`/ticket?ticket=${data.ticketId}`)
        } else (
          console.log("no ticket id precised")
        )
      } catch(error) {
        console.log("creation of Ticket failed");
        setIsLoading(false);
      }
    }

    useEffect(() => {
      console.log("l'url", window.location.protocol, window.location.host)
    })

  return (
    <div className="w-full h-screen bg-secondary">
      <div className={`${styles.padding} flex flex-col justify-between h-full`}>
        {loadingDiv ? (
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
            {siteExists ? (
              <div>
                <h3 className={styles.subTextBlack}>Bienvenue au</h3>
                <h2 className={styles.headTextBlack}>{siteData?.name}</h2>
              </div>
            ) : (
              <div>
                <h3 className={styles.subTextBlack}>Créer</h3>
                <h2 className={styles.headTextBlack}>votre Ticket 🅿️</h2>
              </div>
            )}
          </>
        )}
        {loadingDiv ? (
          <div className="animate-pulse bg-gray-400/50 rounded-md py-2" style={{ animationDelay: `${3 * 0.05}s`, animationDuration: "1s"}}>
            <p className={`invisible`}>Votre voiture vas être prise en charge...</p>
          </div>
        ) : (
          <>
            {
              !siteExists ? (
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
      <div href="/" className="mb-20">
        {loadingDiv ? (
          <div className="w-full animate-pulse bg-gray-400/50 rounded-full" style={{ animationDelay: `${4 * 0.05}s`, animationDuration: "1s"}}>
            <p className="font-semibold text-[26px] invisible">Créer votre ticket</p>
            <div className="w-[26px] invisible">
              <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        ) : (
          <button className={`bg-tertiary w-full py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors text-white hover:text-tertiary shadow-lg ${!siteExists && 'hidden'}`}>
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
    </div>
  )
}

export default Register;
