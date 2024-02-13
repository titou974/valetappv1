"use client"

import styles from "@/app/components/style";
import Input from "@/app/components/inputvalet";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import LoadingModal from "@/app/components/loadingmodal";

const getSession = async () => {
  let siteData = {};
  try {
    const response = await axios.get(`/api/session`);
    siteData = response.data;
  } catch (error) {
    console.log("Error Session:", error.message)
  }
  return siteData;
};

const getSite = async (id) => {
  let siteData = {};
  try {
    const apiUrl = `${window.location.protocol}//${window.location.host}`;
    const response = await axios.get(`${apiUrl}/api/site/${id}`)
    siteData = response.data;
  } catch (error) {
    console.log('Error fetching user:', error.message);
  }
  return siteData;
};

const checkToken = async (token) => {
  let tokenData = {};
  try {
    const apiUrl = `${window.location.protocol}//${window.location.host}`;
    const response = await axios.get(`${apiUrl}/api/forget/${token}`)
    tokenData = response.data
  } catch (error) {
    console.log("le token n'a pas pu être check")
  }
  return tokenData;
}

const ResetPassword = () => {

  const searchParams = useSearchParams();
  const site = searchParams.get("site");
  const resetToken = searchParams.get("t")

  const [fillTextAlert, setFillTextAlert] = useState(false);
  const [siteExists, setSiteExists] = useState(false);
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDiv, setLoadingDiv] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [tokenExist, setTokenExist] = useState(false);

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

  useEffect(() => {
    const handleCheck = async () => {
      const tokenData = await checkToken(resetToken);
      if (tokenData === true) {
        setTokenExist(true);
        return;
      } else {
        setTokenExist(false);
        router.push(`/forget${site ? `?site=${site}` : ``}`);
        return;
      }
    };
      handleCheck();

  }, [resetToken])



  const resetPassword = async e => {
    e.preventDefault();
    setFillTextAlert(false);
    setFillTextAlert(false);
    setLoading(true);
    // Basic client-side validation

    if (!tokenExist) {
      setLoading(false);
      return;
    } else if (!password || !newPassword) {
      setFillTextAlert(true);
      setLoading(false);
      return;
    } else if (password !== newPassword) {
      setPasswordAlert(true);
      setLoading(false);
      return;
    }
    try {
      let userData;
      const response = await axios.patch(`/api/forget/${resetToken}`, {
        password: password
      });
      userData = response.data
      if (!userData) {
        setLoading(false);
        console.log("hugo a une grosse bite")
        return null;
      } else {
        router.push(`/sign-in${site ? `?site=${site}` : ""}`)
        setLoading(false);
        return null;
      }
    } catch (error) {
      console.log(error, "reset of password failed");
      setLoading(false);
    }
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
            {!fillTextAlert && !passwordAlert ? (
              <div>
                <h3 className={styles.subText}>Réinitialiser votre</h3>
                <h2 className={styles.headText}>Mot de passe</h2>
              </div>

            ) : (
              <div>
                {fillTextAlert && (
                  <div className="w-full text-center bg-amber-600 text-white font-semibold px-[20px] py-4 rounded-md">
                    <p>Remplissez tous les champs.</p>
                  </div>
                )}
                {passwordAlert && (
                  <div className="w-full text-center bg-amber-600 text-white font-semibold px-[20px] py-4 rounded-md">
                    <p>Les deux mots de passe sont différents.</p>
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
                <p className="text-[16px] px-[12px] py-[20px] invisible">Lorem ipsum dolor</p>
              </div>
              <div className="animate-pulse bg-gray-400/50 rounded-full" style={{ animationDelay: `${3 * 0.05}s`, animationDuration: "1s"}}>
                <p className="text-[16px] px-[12px] py-[20px] invisible">Lorem ipsum dolor</p>
              </div>
            </>
          ) : (
            <>
              <Input placeholder="Mot de Passe" input={password} setInput={(e) => setPassword(e)} />
              <Input placeholder="Confirmer votre mot de passe" input={newPassword} setInput={(e) => setNewPassword(e)} />
            </>
          )}
        </div>
        <div className="flex flex-col justify-between gap-5">
          <button onClick={resetPassword} className="bg-primary w-full py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors">
            <p className="text-black font-semibold text-[32px]">Confirmer</p>
            <div className="w-[26px]">
              <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </button>
        </div>
        <div className="text-center">
          <p className="text-white">Nestor App 🇫🇷</p>
        </div>
      </div>
      <LoadingModal isOpen={loading} setIsOpen={(e) => setLoading(e)} title="Réinitialisation de votre mot de passe" />
    </div>
  )
}

export default ResetPassword;
