"use client"

import styles from "../../components/style";
import Link from "next/link";
import Input from "../../components/inputvalet";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { signIn } from 'next-auth/react';

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

const LogIn = () => {

  const searchParams = useSearchParams();
  const site = searchParams.get("site");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneAlert, setPhoneAlert] = useState(false);
  const [phoneNumberExist, setPhoneNumberExist] = useState(false);
  const [fillTextAlert, setFillTextAlert] = useState(false);
  const [password, setPassword] = useState("");
  const [siteExists, setSiteExists] = useState(false);
  const [siteData, setSiteData] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const checkSite = async () => {
      const siteData = await getSite(site);

      if (!siteData || Object.keys(siteData).length === 0) {
        setSiteExists(false);
      } else {
        setSiteExists(true);
        setSiteData(siteData);
      }
    };

    if (site) {
      checkSite();
    }

  }, [site])


  const handleLogIn = async e => {
    e.preventDefault();
    setFillTextAlert(false);
    setPhoneNumberExist(false);

    // Basic client-side validation
    if(!phoneNumber || !password) {
      setFillTextAlert(true);
      return;
    }

    const data = await signIn('credentials', {
      phoneNumber,
      password,
      site: site,
      redirect: false,  // Avoids automatic redirect
    });
    console.log(data)

    if (!data?.ok) {
      console.log("Sign-in API call failed:", data.error);
    } else {
      router.push("/dashboard")
    }
  }



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
        <div className="w-full relative">
          <Input placeholder="Numéro de Téléphone" input={phoneNumber} setInput={(e) => setPhoneNumber(e)} setPhoneAlert={(e) => setPhoneAlert(e)} />
          <Input placeholder="Password" input={password} setInput={(e) => setPassword(e)} />
          {phoneAlert && (
            <div className="bg-amber-600 text-white font-semibold px-[20px] py-2 rounded-md absolute top-[-60px]">
              <p>Le numéro de téléphone n&apos;est pas valide</p>
            </div>
          )}
          {phoneNumberExist && (
            <div className="bg-amber-600 text-white font-semibold px-[20px] py-2 rounded-md absolute top-[-60px]">
              <p>Un voiturier possède déjà ce numéro de téléphone.</p>
            </div>
          )}
          {fillTextAlert && (
            <div className="bg-amber-600 text-white font-semibold px-[20px] py-2 rounded-md absolute top-[-60px]">
              <p>Remplissez tous les champs.</p>
            </div>
          )}
          {!siteExists && (
            <div className="text-white my-10">
              <p>Sélectionner un site</p>
            </div>
          )}
          <Link href={`register?site=${site}`} className="bg-white w-1/2 xs:w-1/3 py-[12px] text-center rounded-full font-semibold hover:bg-primary transition-colors flex justify-center items-center gap-2">
            <p>S&apos;enregistrer</p>
            <div className="w-[20px]">
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
              </svg>
            </div>
          </Link>
        </div>
        <div className="mb-10">
          <button onClick={handleLogIn} className="bg-primary w-full py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors">
            <p className="text-black font-semibold text-[32px]">Se Connecter</p>
            <div className="w-[26px]">
              <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogIn;
