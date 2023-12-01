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
import { QrCodeIcon } from "@heroicons/react/20/solid";



const getSite = async (id) => {
  let siteData = {};
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get(`${apiUrl}/api/site/${id}`)
    siteData = response.data;
  } catch (error) {
    console.log('Error fetching user:', error.message);
  }
  return siteData;
}

// const getCompanies = async () => {
//   let companyData = {};
//   try {
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     const response = await axios.get(`${apiUrl}/api/company`);
//     console.log("this is the companies", response);
//     companyData = response.data;
//   } catch (error) {
//     console.log('Error fetching companies', error.message)
//   }
//   return companyData;
// }

// const getSites = async () => {
//   let siteData = {};
//   try {
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     const response = await axios.get(`${apiUrl}/api/site`)
//     console.log(response);
//     siteData = response.data;
//   } catch (error) {
//     console.log('Error fetching user:', error.message);
//   }
//   return siteData;
// };


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

const Register = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneAlert, setPhoneAlert] = useState(false);
  const [phoneNumberExist, setPhoneNumberExist] = useState(false);
  const [fillTextAlert, setFillTextAlert] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDiv, setLoadingDiv] = useState(true);

  const [siteExists, setSiteExists] = useState(false);
  const [siteData, setSiteData] = useState(null);
  const [siteDb, setSiteDb] = useState(null);

  const [companySelected, setCompanySelected] = useState(null);
  const [companiesDb, setCompaniesDb] = useState(null);
  const searchParams = useSearchParams();
  const site = searchParams.get("site");
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {

    // const getSitesName = async () => {
    //   const siteData = await getSites();
    //   if (!siteData || Object.keys(siteData).length === 0 || siteData.error ) {
    //     console.log("aucun sites trouver")
    //     setLoadingDiv(false);
    //   } else {
    //     const filteredSites = siteData.filter(site => site.companyId === companySelected?.id);
    //     setSiteDb(filteredSites);
    //     setLoadingDiv(false);
    //   }
    // };

    const checkSite = async () => {
      const siteData = await getSite(site);

      if (!siteData || Object.keys(siteData).length === 0) {
        setSiteExists(false);
      } else {
        setSiteExists(true);
        setSiteData(siteData);
        setCompanySelected({id: siteData.companyId})
        console.log(siteData);
      }
    };

    // const getCompaniesName = async () => {
    //   setLoadingDiv(true);
    //   const companyData = await getCompanies();

    //   if (!companyData || Object.keys(companyData).length === 0) {
    //     setLoadingDiv(false);
    //     console.log("pas d'entreprise trouvé, erreur")
    //   } else {
    //     setCompaniesDb(companyData);
    //     setLoadingDiv(false);
    //   }
    // }

    site ? checkSite() : setSiteExists(false);

      // if (site) {
      //   checkSite();
      // } else {
      //   if (companySelected?.id) {
      //     getSitesName();
      //   } else {
      //     getCompaniesName();
      //   }
      // }setSiteData(siteData);
      // setLoadingDiv(false);
      setTimeout(() => {
        setLoadingDiv(false);
      }, 1000);
  }, [site, siteExists, companySelected?.id])


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
    console.log("le site existe", siteExists)
  })

  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);
    setFillTextAlert(false);
    setPhoneNumberExist(false);
    if (!companySelected.id && !siteData.id) {
      return null;
    }
    try {
      const response = await axios.post("/api/voiturier", {
        name: name,
        phoneNumber: phoneNumber,
        password: password,
        companyId: companySelected.id

      });
      const data = await response.data;
      if (data.userId === null && data.message ===  "Un voiturier avec ce numéro existe déjà.") {
        setPhoneNumberExist(true);
        setLoading(false)
      } else if (data.userId === null && data.message ===  "Invalid data received.") {
        setFillTextAlert(true);
        setLoading(false)
      } else if (data.userId === null && data.message ===  "Invalid phone number received.") {
        setLoading(false);
        return null;
      } else if (data.userId) {
          const data = await signIn('credentials', {
            phoneNumber,
            password,
            site: siteData.id,
            redirect: false,
          });
          if (!data?.ok) {
            console.log("Sign-in API call failed:", data.error);
            router.push("/sign-in");
          } else {
            router.push("/dashboard");
          }
      }
    } catch(error) {
      console.log("creation of Voiturier failed", error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log("id de la companie", companySelected?.id);

  })



  return (
    <div className="w-full h-screen bg-black">
      <div className={`${styles.padding} flex flex-col justify-between h-full`}>
        <div>
          <h3 className={styles.subText}>Remplissez</h3>
          <h2 className={styles.headText}>vos Informations</h2>
        </div>
        <div className="w-full relative flex flex-col justify-center gap-10">
          {loadingDiv ? (
            <>
              <div className="animate-pulse bg-gray-400/50 rounded-full" style={{ animationDelay: `${1 * 0.05}s`, animationDuration: "1s"}}>
                <p className="text-[20px] px-[12px] py-[20px] invisible">Lorem ipsum dolor</p>
              </div>
              <div className="animate-pulse bg-gray-400/50 rounded-full" style={{ animationDelay: `${2 * 0.05}s`, animationDuration: "1s"}}>
                <p className="text-[20px] px-[12px] py-[20px] invisible">Lorem ipsum dolor</p>
              </div>
              <div className="animate-pulse bg-gray-400/50 rounded-full" style={{ animationDelay: `${3 * 0.05}s`, animationDuration: "1s"}}>
                <p className="text-[20px] px-[12px] py-[20px] invisible">Lorem ipsum dolor</p>
              </div>
            </>
            ) : (siteExists ? (
              <>
                <Input placeholder="Prénom" input={name} setInput={(e) => setName(e)} />
                <Input placeholder="Numéro de Téléphone" input={phoneNumber} setInput={(e) => setPhoneNumber(e)} setPhoneAlert={(e) => setPhoneAlert(e)} />
                <Input placeholder="Password" input={password} setInput={(e) => setPassword(e)} />
                {!fillTextAlert && phoneAlert && (
                  <div className="w-full bg-amber-600 text-white font-semibold px-[20px] py-2 rounded-md absolute top-[-90px]">
                    <p>Le numéro de téléphone n&apos;est pas valide</p>
                  </div>
                )}
                {phoneNumberExist && (
                  <div className="w-full bg-amber-600 text-white font-semibold px-[20px] py-2 rounded-md absolute top-[-90px]">
                    <p>Un voiturier possède déjà ce numéro de téléphone.</p>
                  </div>
                )}
                {fillTextAlert && (
                  <div className="w-full bg-amber-600 text-white font-semibold px-[20px] py-2 rounded-md absolute top-[-90px]">
                    <p>Remplissez tous les champs.</p>
                  </div>
                )}
             </>
            ) : (
              <>
                <div className='text-center text-white mx-auto w-full flex justify-center items-center'>
                  <p className={`text-center font-bold mr-4 text-[26px]`}>Scanner le QR Code</p>
                  <div className='w-[40px]'>
                    <QrCodeIcon  />
                  </div>
                </div>
                <div className="text-white text-base text-center">
                  <p>pour vous créer un compte</p>
                </div>
              </>
            ))}
        </div> 
        {loadingDiv ? (
          <div className={`flex flex-col justify-between gap-5`}>
            <button onClick={handleRegister} style={{ animationDelay: `${4 * 0.05}s`, animationDuration: "1s"}} className="animate-pulse bg-gray-400/50 rounded-full w-full py-3 flex items-center justify-center gap-2">
              <p className="text-black font-semibold text-[26px] invisible">Créer votre compte</p>
              <div className="w-[26px] invisible">
                <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </button>
            <div className="animate-pulse bg-gray-400/50 mx-auto w-2/3 py-[12px] rounded-full flex justify-center items-center gap-2" style={{ animationDelay: `${5 * 0.05}s`, animationDuration: "1s"}}>
              <p className="invisible">Se Connecter</p>
              <div className="w-[20px] invisible">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                </svg>
              </div>
            </div>
          </div>
          ) : (
            <div className={`flex flex-col justify-between gap-5 ${!siteExists && "invisible"}`}>
              <button onClick={handleRegister} className="bg-primary w-full py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors">
                <p className="text-black font-semibold text-[26px]">Créer votre compte</p>
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
          )
        }
        <div className="text-center">
          <p className="text-white">Nestor App 🇫🇷</p>
        </div>
      </div>
      <LoadingModal isOpen={loading}  setIsOpen={(e) => setLoading(e)} title="Création de votre espace" />
    </div>
  )
}

export default Register;
