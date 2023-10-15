"use client"

import styles from "../../components/style";
import Link from "next/link";
import Input from "../../components/inputvalet";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { signIn } from 'next-auth/react';
import SelectInput from "@/app/components/selectinput";



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

const LogIn = () => {

  const searchParams = useSearchParams();
  const site = searchParams.get("site");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneAlert, setPhoneAlert] = useState(false);
  const [fillTextAlert, setFillTextAlert] = useState(false);
  const [password, setPassword] = useState("");
  const [siteExists, setSiteExists] = useState(false);
  const [siteData, setSiteData] = useState(null);
  const [siteDb, setSiteDb] = useState(null);
  const [wrongPassword, setWrongPassword] = useState(false);

  const router = useRouter();

  useEffect(() => {

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


  const handleLogIn = async e => {
    e.preventDefault();
    setFillTextAlert(false);
    setWrongPassword(false);
    setFillTextAlert(false);
    // Basic client-side validation
    if(!phoneNumber || !password || !siteData) {
      setFillTextAlert(true);
      return;
    }

    const data = await signIn('credentials', {
      phoneNumber,
      password,
      site: siteData.id,
      redirect: false,  // Avoids automatic redirect
    });
    console.log(data)

    if (!data?.ok) {
      console.log("Sign-in API call failed:", data.error);
      setWrongPassword(true);
    } else {
      router.push("/dashboard")
    }
  }

  useEffect(() => {
    console.log(siteData?.id)
  })




  return (
    <div className="w-full h-screen bg-black">
      <div className={`${styles.padding} flex flex-col justify-between h-full`}>
          {
            siteExists ? (
              <div>
                <h3 className={styles.subText}>Vous êtes au</h3>
                <h2 className={styles.headText}>{siteData.name}</h2>
              </div>
            ) : (
              <div>
                <h3 className={styles.subText}>Bonjour</h3>
                <h2 className={styles.headText}>Prêt, à travailler ?</h2>
              </div>
            )
          }
        <div className="w-full relative flex flex-col justify-center gap-10">
          <Input placeholder="Numéro de Téléphone" input={phoneNumber} setInput={(e) => setPhoneNumber(e)} setPhoneAlert={(e) => setPhoneAlert(e)} />
          <Input placeholder="Mot de Passe" input={password} setInput={(e) => setPassword(e)} />
          {phoneAlert && (
            <div className="w-full text-center bg-amber-600 text-white font-semibold px-[20px] py-2 rounded-md absolute top-[-60px]">
              <p>Le numéro de téléphone n&apos;est pas valide</p>
            </div>
          )}
          {fillTextAlert && (
            <div className="w-full text-center bg-amber-600 text-white font-semibold px-[20px] py-2 rounded-md absolute top-[-60px]">
              <p>Remplissez tous les champs.</p>
            </div>
          )}
          {wrongPassword && (
            <div className="w-full text-center bg-amber-600 text-white font-semibold px-[20px] py-2 rounded-md absolute top-[-60px]">
              <p>Le mot de passe n&apos;est pas correct</p>
            </div>
          )}
          {!siteExists && (
            <SelectInput input={siteData} setInput={(e) => setSiteData(e)} db={siteDb} />
          )}
        </div>
        <div className="flex flex-col justify-between gap-5">
          <button onClick={handleLogIn} className="bg-primary w-full py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors">
            <p className="text-black font-semibold text-[32px]">Se Connecter</p>
            <div className="w-[26px]">
              <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </button>
          <Link href={`register${siteData === null ? "" : `?site=${siteData?.id}`}`} className="mx-auto w-2/3 py-[12px] rounded-full font-bold hover:bg-primary transition-colors flex justify-center items-center gap-2 text-primary hover:text-black">
            <p>Créer mon compte</p>
            <div className="w-[20px]">
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LogIn;
