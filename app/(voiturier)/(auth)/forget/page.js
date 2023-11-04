"use client"

import styles from "@/app/components/style";
import Link from "next/link";
import Input from "@/app/components/inputvalet";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { signIn } from 'next-auth/react';
import SelectInput from "@/app/components/selectinput";
import LoadingModal from "@/app/components/loadingmodal";

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
};

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
};

const ForgetPassword = () => {

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
  const [loading, setLoading] = useState(false);
  const [loadingDiv, setLoadingDiv] = useState(true);
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

  useEffect(() => {
    const checkSite = async () => {
      const siteData = await getSite(site);

      if (!siteData || Object.keys(siteData).length === 0) {
        setSiteExists(false);
        setLoadingDiv(false);
      } else {
        setSiteExists(true);
        setLoadingDiv(false);
        setSiteData(siteData);
      }
    };

    checkSite();

  }, [site])


  const resetPassword = async e => {
    e.preventDefault();
    setFillTextAlert(false);
    setWrongPassword(false);
    setFillTextAlert(false);
    setLoading(true);
    // Basic client-side validation
    if(!phoneNumber) {
      setFillTextAlert(true);
      setLoading(false);
      return;
    }
    setLoading(false);
  }

  return (
    <div className="w-full h-screen bg-black">
      <div className={`${styles.padding} flex flex-col justify-between h-full`}>
        {loadingDiv ? (
          <div>
            <div className="animate-pulse bg-gray-400/50 rounded-md mb-3" style={{ animationDelay: `${1 * 0.05}s`, animationDuration: "1s"}}>
              <h3 className={`${styles.subText} invisible`}>Réinitialiser votre</h3>
            </div>
            <div className="animate-pulse bg-gray-400/50 rounded-md" cc>
              <h2 className={`${styles.headText} invisible `}>Mot de passe</h2>
            </div>
          </div>
        )
        : (
          <>
            {!phoneAlert && !fillTextAlert && !wrongPassword ? (
              <div>
                <h3 className={styles.subText}>Réinitialiser votre</h3>
                <h2 className={styles.headText}>Mot de passe</h2>
              </div>

            ) : (
              <div>
                {phoneAlert && (
                  <div className="w-full text-center bg-amber-600 text-white font-semibold px-[20px] py-4 rounded-md">
                    <p>Le numéro de téléphone n&apos;est pas valide</p>
                  </div>
                )}
                {fillTextAlert && (
                  <div className="w-full text-center bg-amber-600 text-white font-semibold px-[20px] py-4 rounded-md">
                    <p>Remplissez tous les champs.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
        <div className="w-full flex flex-col justify-center gap-10">
          {loadingDiv ? (
            <>
              <div className="animate-pulse bg-gray-400/50 rounded-full" style={{ animationDelay: `${3 * 0.05}s`, animationDuration: "1s"}}>
                <p className="text-[20px] px-[12px] py-[20px] invisible">Lorem ipsum dolor</p>
              </div>
            </>
          ) : (
            <>
              <Input placeholder="Numéro de Téléphone" input={phoneNumber} setInput={(e) => setPhoneNumber(e)} setPhoneAlert={(e) => setPhoneAlert(e)} />
            </>
          )}
        </div>
        <div className="flex flex-col justify-between gap-5">
          <button onClick={resetPassword} className="bg-primary w-full py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors">
            <p className="text-black font-semibold text-[32px]">Réinitialiser</p>
            <div className="w-[26px]">
              <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </button>
          <Link href={`sign-in${siteData === null ? "" : `?site=${siteData?.id}`}`} className="mx-auto w-2/3 py-[12px] rounded-full font-bold hover:bg-primary transition-colors flex justify-center items-center gap-2 text-primary hover:text-black">
            <p>Se Connecter</p>
            <div className="w-[20px]">
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
              </svg>
            </div>
          </Link>
        </div>
        <div className="text-center">
          <p className="text-white">Nestor App 🇫🇷</p>
        </div>
      </div>
      <LoadingModal isOpen={loading} setIsOpen={(e) => setLoading(e)} title="Réinitialisation de votre mot de passe" />
    </div>
  )
}

export default ForgetPassword;
