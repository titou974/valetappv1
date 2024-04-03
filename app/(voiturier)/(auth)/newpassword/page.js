"use client"

import styles from "@/app/components/style";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import LoadingModal from "@/app/components/loadingmodal";
import VoiturierLayout from "@/app/layouts/voiturierlayout";
import { Button, Skeleton, Input } from "@nextui-org/react";
import Navbar from "@/app/components/navbar";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import FooterBarLayout from "@/app/layouts/footerbarlayout";

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
    <VoiturierLayout>
      <Navbar subtitle="Réintialiser votre" title="Mot de passe" isLoading={loadingDiv} />
      <div className="w-full flex flex-col justify-center gap-10">
        {loadingDiv ? (
          <>
            <Skeleton className="rounded-lg">
              <div className='w-full h-14 bg-gray-400/50 rounded-lg'></div>
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className='w-full h-14 bg-gray-400/50 rounded-lg'></div>
            </Skeleton>
          </>
        ) : (
          <>
            <Input label="Mot de Passe" onChange={(e) => setPassword(e.target.value)} />
            <Input label="Confirmer votre mot de passe" onChange={(e) => setNewPassword(e.target.value)} />
          </>
        )}
      </div>
      <FooterBarLayout fixed={false}>
        <Button onClick={resetPassword} className='fill-primary-foreground' size="lg" color="primary" variant="solid" radius='full' fullWidth={true} endContent={< ArrowRightIcon width={20}/>} isLoading={loading}>
          Confirmer
        </Button>
      </FooterBarLayout>
      <LoadingModal isOpen={loading} setIsOpen={(e) => setLoading(e)} title="Réinitialisation de votre mot de passe" />
    </VoiturierLayout>
  )
}

export default ResetPassword;
