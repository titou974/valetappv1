"use client"

import styles from "../../components/style";
import Link from "next/link";
import Input from "../../components/inputvalet";
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
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    console.log(siteData);
    const getSitesName = async () => {
      const siteData = await getSites();
      if (!siteData || Object.keys(siteData).length === 0) {
        console.log("aucun sites trouver")
      } else {
        setSiteDb(siteData);
      }
    };

    const checkSite = async () => {
      const siteData = await getSite(site);

      if (!siteData || Object.keys(siteData).length === 0) {
        setSiteExists(false);
        getSitesName();
      } else {
        setSiteExists(true);
        setSiteData(siteData);
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
        router.push(`/ticket/${data.ticketId}`)
      }
    } catch(error) {
      console.log("creation of Ticket failed");
      setIsLoading(false);
    }
  }
  return (
    <div className="w-full h-screen bg-secondary">
      <div className={`${styles.padding} flex flex-col justify-between h-full`}>
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
          {
            !siteExists && (
              <div>
                <SelectInput input={siteData} setInput={(e) => setSiteData(e)} db={siteDb} />
              </div>
            )
          }
        <div href="/" className="mb-20">
          <button onClick={handleRegister} className="bg-tertiary w-full py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors text-white hover:text-tertiary shadow-lg">
            <p className="font-semibold text-[26px]">Créer votre ticket</p>
            <div className="w-[26px]">
              <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </button>
        </div>
      </div>
      <LoadingModal isOpen={isLoading} setIsOpen={(e) => setIsLoading(e)} title="Création de votre ticket" />
    </div>
  )
}

export default Register;
