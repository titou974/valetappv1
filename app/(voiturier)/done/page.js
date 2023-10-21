"use client"

import styles from "@/app/components/style";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import formatTimeDifference from "@/lib/formattimedifference";

const getSession = async (id) => {
  let sessionData = {};
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get(`${apiUrl}/api/session/${id}`)
    sessionData = response.data;
    console.log(sessionData);
  } catch (error) {
    console.log('Error fetching user:', error.message);
  }
  return sessionData;
}

const SessionDone = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");
  const [sessionExist, setSessionExist] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [sessionTime, setSessionTime] = useState("");
  const [loadingDiv, setLoadingDiv] = useState(true);

  useEffect(() => {
    const getSessionData = async () => {
      const session = await getSession(sessionId)
      if (!session || Object.keys(session).length === 0) {
        setSessionExist(false);
        setLoadingDiv(false);
      } else {
        setSessionExist(true);
        setSessionData(session);
        setSessionTime(formatTimeDifference(session.createdAt, session.endAt))
        setLoadingDiv(false);
      }
    }

    if (sessionId) {
      getSessionData();
    } else {
      setSessionExist(false);
    }
  }, [sessionId])


  return (
    <div className="bg-black w-full text-white">
      <div className={`${styles.padding} flex flex-col justify-between h-screen`} >
        <div>
          <h3 className={styles.subText}>Bravo {loadingDiv ? <span className="animate-pulse bg-gray-400/50 rounded-md h-[50px]" style={{ animationDelay: `${1 * 0.05}s`, animationDuration: "1s"}}><span className="invisible">Constantin</span></span> : sessionData?.user.name}</h3>
          <h2 className={styles.headText}>À bientôt 👋</h2>
        </div>
        <div>
          <p className={`text-center text-base ${styles.subText} py-2`}>Vous avez travaillé pendant {loadingDiv ? <span className="animate-pulse bg-gray-400/50 rounded-md h-[50px]" style={{ animationDelay: `${2 * 0.05}s`, animationDuration: "1s"}}><span className="invisible">50 minutes</span></span> : <span className="font-bold">{sessionTime}</span>}</p>
          <p className={`text-center text-base ${styles.subText} py-2`}>au {loadingDiv ? <span className="animate-pulse bg-gray-400/50 rounded-md h-[50px]" style={{ animationDelay: `${2 * 0.05}s`, animationDuration: "1s"}}><span className="invisible">Nylsa Café</span></span> : <span className="font-bold italic">{sessionData?.restaurant.name}</span>}</p>
        </div>
        <div className="flex flex-col justify-between gap-5">
          <Link href={`sign-in`} className="bg-primary w-full py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors text-black">
            <p className="text-black font-semibold text-[32px]">Se Connecter</p>
            <div className="w-[26px]">
              <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </Link>
          <Link href={`register`} className="mx-auto w-2/3 py-[12px] rounded-full font-bold hover:bg-primary transition-colors flex justify-center items-center gap-2 text-primary hover:text-black">
            <p>Créer mon compte</p>
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
    </div>
  )
}

export default SessionDone;
