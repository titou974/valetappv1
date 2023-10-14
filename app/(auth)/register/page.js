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

const Register = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneAlert, setPhoneAlert] = useState(false);
  const [phoneNumberExist, setPhoneNumberExist] = useState(false);
  const [fillTextAlert, setFillTextAlert] = useState(false);
  const [password, setPassword] = useState("");

  const [siteExists, setSiteExists] = useState(false);
  const [siteData, setSiteData] = useState(null);
  const searchParams = useSearchParams();
  const site = searchParams.get("site");
  const router = useRouter();
  console.log("id du site", site)

  useEffect(() => {
    const checkSite = async () => {
      const siteData = await getSite(site);

      if (!siteData || Object.keys(siteData).length === 0) {
        setSiteExists(false);
      } else {
        setSiteExists(true);
        setSiteData(siteData);
        console.log("yes")
      }
    };

    if (site) {
      checkSite();
    }

  }, [site])

  const handleRegister = async e => {
    e.preventDefault();
    setFillTextAlert(false);
    setPhoneNumberExist(false);
    try {
      const response = await axios.post("/api/voiturier", {
        name: name,
        phoneNumber: phoneNumber,
        password: password,
      });
      console.log(response);
      const data = await response.data;
      if (data.userId === null && data.message ===  "Un voiturier avec ce numéro existe déjà.") {
        setPhoneNumberExist(true);
      } else if (data.userId === null && data.message ===  "Invalid data received.") {
        setFillTextAlert(true);
      } else if (data.userId) {
          if(!phoneNumber || !password) {
            setFillTextAlert(true);
            return;
          }
          const data = await signIn('credentials', {
            phoneNumber,
            password,
            site: site,
            redirect: false,
          });
          console.log(data)

          if (!data?.ok) {
            console.log("Sign-in API call failed:", data.error);
            router.push("/sign-in");
          } else {
            router.push("/dashboard");
          }
      }
    } catch(error) {
      console.log("creation of Voiturier failed", error.message)
    }
  }


  return (
    <div className="w-full h-screen bg-black">
      <div className={`${styles.padding} flex flex-col justify-between h-full`}>
        <div>
          <h3 className={styles.subText}>Remplissez</h3>
          <h2 className={styles.headText}>vos Informations</h2>
        </div>
        <div className="w-full">
          <Input placeholder="Prénom" input={name} setInput={(e) => setName(e)} />
          <Input placeholder="Numéro de Téléphone" input={phoneNumber} setInput={(e) => setPhoneNumber(e)} setPhoneAlert={(e) => setPhoneAlert(e)} />
          <Input placeholder="Password" input={password} setInput={(e) => setPassword(e)} />
          {!siteExists && (
            <div className="text-white">
              <p>Sélectionner un restaurant</p>
            </div>
          )}
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
        </div>
        <div className="mb-10">
          <button onClick={handleRegister} className="bg-primary w-full py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors">
            <p className="text-black font-semibold text-[32px]">Commencer</p>
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

export default Register;
