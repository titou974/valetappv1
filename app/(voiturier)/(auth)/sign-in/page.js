"use client"

import styles from "@/app/components/style";
import Link from "next/link";
import Input from "@/app/components/inputvalet";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
import LoadingModal from "@/app/components/loadingmodal";
import { QrCodeIcon } from "@heroicons/react/20/solid";
import { useQuery } from '@tanstack/react-query'
import useSessionRedirection from "@/app/stores/session";
import useSite from "@/app/stores/site";


const LogIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneAlert, setPhoneAlert] = useState(false);
  const [fillTextAlert, setFillTextAlert] = useState(false);
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  

  const {data, isLoading, isError} = useSite()

  useSessionRedirection()

  const handleLogIn = async e => {
    e.preventDefault();
    setFillTextAlert(false);
    setWrongPassword(false);
    setFillTextAlert(false);
    setLoading(true);
    // Basic client-side validation
    if(!phoneNumber || !password || !data) {
      setFillTextAlert(true);
      setLoading(false);
      return;
    }

    const session = await signIn('credentials', {
      phoneNumber,
      password,
      site: data.id,
      redirect: false,  // Avoids automatic redirect
    });
    console.log(session)

    if (!session?.ok) {
      console.log("Sign-in API call failed:", session.error);
      setWrongPassword(true);
      setLoading(false);
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="w-full h-screen bg-black">
      <div className={`${styles.padding} flex flex-col justify-between h-full`}>
        {isLoading ? (
          <div>
            <div className="animate-pulse bg-gray-400/50 rounded-md mb-3" style={{ animationDelay: `${1 * 0.05}s`, animationDuration: "1s"}}>
              <h3 className={`${styles.subText} invisible`}>Bonjour</h3>
            </div>
            <div className="animate-pulse bg-gray-400/50 rounded-md" style={{ animationDelay: `${2 * 0.05}s`, animationDuration: "1s"}}>
              <h2 className={`${styles.headText} invisible `}>Prêt, à travailler ?</h2>
            </div>
          </div>
        )
        : (
          <>
            {data ? (
              !phoneAlert && !fillTextAlert && !wrongPassword ? (
                  <div>
                    <h3 className={styles.subText}>Vous êtes au</h3>
                    <h2 className={styles.headText}>{data.name}</h2>
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
                    {wrongPassword && (
                      <div className="w-full text-center bg-amber-600 text-white font-semibold px-[20px] py-4 rounded-md">
                        <p>Le mot de passe n&apos;est pas correct</p>
                      </div>
                    )}
                  </div>
                )) : (
                  <div>
                    <h3 className={styles.subText}>Bonjour</h3>
                    <h2 className={styles.headText}>Prêt, à travailler ?</h2>
                  </div>
                )
            }
          </>
        )}
        <div className="w-full flex flex-col justify-center gap-10">
          {isLoading ? (
            <>
              <div className="animate-pulse bg-gray-400/50 rounded-full" style={{ animationDelay: `${3 * 0.05}s`, animationDuration: "1s"}}>
                <p className="text-[20px] py-3 px-5 invisible">Lorem ipsum dolor</p>
              </div>
              <div className="animate-pulse bg-gray-400/50 rounded-full" style={{ animationDelay: `${4 * 0.05}s`, animationDuration: "1s"}}>
                <p className="text-[20px] py-3 px-5 invisible">Lorem ipsum dolor</p>
              </div>
              <div className="transition-all animate-pulse bg-gray-400/50 rounded-md w-fit">
                <p className="invisible">Mot de passe oublié ?</p>
              </div>
            </>
          ) : (
            data ? (
              <>
                <Input placeholder="Numéro de Téléphone" input={phoneNumber} setInput={(e) => setPhoneNumber(e)} setPhoneAlert={(e) => setPhoneAlert(e)} />
                <Input placeholder="Mot de Passe" input={password} setInput={(e) => setPassword(e)} />
                <div>
                  <Link href={`forget${data === null ? "" : `?site=${data?.id}`}`} className="text-primary hover:text-white transition-all">
                    <p>Mot de passe oublié ?</p>
                  </Link>
                </div>
              </>
          ) : (
            <>
              <div className='text-center text-white mx-auto w-full flex justify-center items-center'>
                <p className={`text-center font-bold mr-4 text-[26px]`}>Scanner le QR Code</p>
                <div className='w-[40px] text-primary'>
                  <QrCodeIcon  />
                </div>
              </div>
              <div className="text-white text-base text-center">
                <p>pour vous connecter</p>
              </div>
            </>
          ))}
        </div>
        {isLoading ? (
          <div className="flex flex-col justify-between gap-5">
            <button onClick={handleLogIn} className="w-full py-3 flex items-center justify-center gap-2 animate-pulse bg-gray-400/50 rounded-full" style={{ animationDelay: `${5 * 0.05}s`, animationDuration: "1s"}}>
              <p className="text-black font-semibold text-[32px] invisible">Se Connecter</p>
              <div className="w-[26px] invisible">
                <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </button>
            <Link href={`register${data === null ? "" : `?site=${data?.id}`}`} className="animate-pulse bg-gray-400/50 mx-auto w-2/3 py-[12px] rounded-full font-bold transition-colors flex justify-center items-center gap-2 text-primary hover:text-black" style={{ animationDelay: `${6 * 0.05}s`, animationDuration: "1s"}}>
              <p className="invisible">Créer mon compte</p>
              <div className="w-[20px] invisible">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                </svg>
              </div>
            </Link>
          </div>
        ) : (
            <div className={`flex flex-col justify-between gap-5 ${!data && 'invisible'}`}>
              <button onClick={handleLogIn} className="bg-primary w-full py-3 rounded-full flex items-center justify-center gap-2 transition-colors hover:bg-white">
                <p className="text-black font-semibold text-[32px]">Se Connecter</p>
                <div className="w-[26px]">
                  <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </button>
              <Link href={`register${data === null ? "" : `?site=${data?.id}`}`} className="mx-auto w-2/3 py-[12px] rounded-full font-bold hover:bg-primary transition-colors flex justify-center items-center gap-2 text-primary hover:text-black">
                <p>Créer mon compte</p>
                <div className="w-[20px]">
                  <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                  </svg>
                </div>
              </Link>
            </div>
          )}
        
        <div className="text-center">
          <p className="text-white">Nestor App 🇫🇷</p>
        </div>
      </div>
      <LoadingModal isOpen={loading} setIsOpen={(e) => setLoading(e)} title="Connexion à votre espace" />
    </div>
  )
}

export default LogIn;
