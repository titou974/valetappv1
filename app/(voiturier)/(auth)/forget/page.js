"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import LoadingModal from "@/app/components/loadingmodal";
import VoiturierLayout from "@/app/layouts/voiturierlayout";
import Navbar from "@/app/components/navbar";
import { Button, Skeleton, Input } from "@nextui-org/react";
import FooterBarLayout from "@/app/layouts/footerbarlayout";
import { ArrowRightIcon } from "@heroicons/react/20/solid";




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

const ForgetPassword = () => {

  const searchParams = useSearchParams();
  const site = searchParams.get("site");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneAlert, setPhoneAlert] = useState(false);
  const [fillTextAlert, setFillTextAlert] = useState(false);
  const [siteExists, setSiteExists] = useState(false);
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDiv, setLoadingDiv] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [phoneExist, setPhoneExist] = useState(false);

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
    setFillTextAlert(false);
    setLoading(true);
    
    if(!phoneNumber) {
      setFillTextAlert(true);
      setLoading(false);
      return;
    }
    try {
      let userData;
      const response = await axios.post("/api/forget", {
        phoneNumber: phoneNumber
      });
      userData = response.data
      if ( userData.message ===  "Invalid data received.") {
        setFillTextAlert(true);
        setLoading(false);
        return null;
      } else if ( userData.message ===  "Invalid phone number received.") {
        setPhoneAlert(true);
        setLoading(false);
        return null;
      }  else if ( userData.message ===  "User doesn't exists with this phone number.") {
        setPhoneExist(true);
        setLoading(false);
        return null;
      } else {
        router.push(`/newpassword?${userData.token ? `${site ? `site=${site}&` : ""}t=${userData.token}` : ``}`)
      }
    } catch (error) {
      console.log("reset of password failed");
      setLoading(false);
    }
  }

  return (
    <VoiturierLayout>
      <Navbar subtitle="Réintialiser votre" title="Mot de passe" isLoading={loadingDiv} />
      <div className="w-full flex flex-col justify-center gap-10">
        {loadingDiv ? (
          <>
            <Skeleton className="rounded-lg">
              <div className='w-full h-14 bg-gray-400/50 rounded-lg'></div>
            </Skeleton>
          </>
        ) : (
          <>
            <Input label="Numéro de Téléphone" type="tel" onChange={(e) => setPhoneNumber(e.target.value)} />
          </>
        )}
      </div>
      <FooterBarLayout fixed={false}>
        <Button onClick={resetPassword} className='fill-primary-foreground' size="lg" color="primary" variant="solid" radius='full' fullWidth={true} endContent={< ArrowRightIcon width={20}/>} isLoading={loading}>
          Réinitialiser
        </Button>
        <Button onClick={() => router.push(`sign-in${siteData === null ? "" : `?site=${siteData?.id}`}`)} color="primary" variant="light" radius='full' fullWidth={true} endContent={< ArrowRightIcon width={20}/>}>
          Se connecter 
        </Button>
      </FooterBarLayout>
      <LoadingModal isOpen={loading} setIsOpen={(e) => setLoading(e)} title="Recherche de votre numéro..." />
    </VoiturierLayout>
  )
}

export default ForgetPassword;
