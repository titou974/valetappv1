"use client"

import styles from "../../components/style";
import Link from "next/link";
import Input from "../../components/inputvalet";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { signIn } from 'next-auth/react';


const LogIn = () => {

  const searchParams = useSearchParams();
  const site = searchParams.get("site");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneAlert, setPhoneAlert] = useState(false);
  const [phoneNumberExist, setPhoneNumberExist] = useState(false);
  const [fillTextAlert, setFillTextAlert] = useState(false);
  const [password, setPassword] = useState("");

  const router = useRouter();

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
        <div>
          <h3 className={styles.subText}>Bonjour</h3>
          <h2 className={styles.headText}>Prêt, à travailler ? </h2>
        </div>
        <div className="w-full">
          <Input placeholder="Numéro de Téléphone" input={phoneNumber} setInput={(e) => setPhoneNumber(e)} setPhoneAlert={(e) => setPhoneAlert(e)} />
          <Input placeholder="Password" input={password} setInput={(e) => setPassword(e)} />
          {phoneAlert && (
            <div className="bg-amber-600 text-white font-semibold px-[20px] py-2 rounded-md">
              <p>Le numéro de téléphone n&apos;est pas valide</p>
            </div>
          )}
          {phoneNumberExist && (
            <div className="bg-amber-600 text-white font-semibold px-[20px] py-2 rounded-md">
              <p>Un voiturier possède déjà ce numéro de téléphone.</p>
            </div>
          )}
          {fillTextAlert && (
            <div className="bg-amber-600 text-white font-semibold px-[20px] py-2 rounded-md">
              <p>Remplissez tous les champs.</p>
            </div>
          )}
          <Link href="register" className="bg-white w-1/2 xs:w-1/3 py-[12px] text-center rounded-full font-semibold hover:bg-primary transition-colors flex justify-center items-center gap-2">
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
