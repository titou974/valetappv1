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

const getSite = async (id) => {
  let siteData = {};
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get(`${apiUrl}/api/site/${id}`)
    console.log(response);
    siteData = response.data;
  } catch (error) {
    console.log('Error fetching user:', error.message);
  }
  return siteData;
}

const getSites = async () => {
  let siteData = {};
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get(`${apiUrl}/api/site`)
    console.log(response);
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
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    console.log(siteData);
    const getSitesName = async () => {
      const siteData = await getSites();
      if (!siteData || Object.keys(siteData).length === 0) {
        console.log("aucun sites trouver");
        setLoadingDiv(false);
      } else {
        setSiteDb(siteData);
        setLoadingDiv(false);
      }
    };

    const checkSite = async () => {
      const siteData = await getSite(site);

      if (!siteData || Object.keys(siteData).length === 0) {
        setSiteExists(false);
        getSitesName();
        setLoadingDiv(false);
      } else {
        setSiteExists(true);
        setSiteData(siteData);
        setLoadingDiv(false);
      }
    };

    if (site) {
      checkSite();
    } else {
      getSitesName();
    }

  }, [site, siteExists])

  const handleRegister = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/ticket", {
        role: "CLIENT",
        restaurant: siteData.id
      });
      console.log(response);
      const data = await response.data
      if (data.ticketId) {
        router.push(`/ticket?ticket=${data.ticketId}`)
      }
    } catch(error) {
      console.log("creation of Ticket failed");
      setIsLoading(false);
    }
  }
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
                <div>
                  <SelectInput input={siteData} setInput={(e) => setSiteData(e)} db={siteDb} />
                </div>
              ) : (
                <div>
                  <p>Votre voiture vas être prise en charge...</p>
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
          <button onClick={handleRegister} className="bg-tertiary w-full py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors text-white hover:text-tertiary shadow-lg">
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
