"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingModal from "@/app/components/loadingmodal";
import VoiturierLayout from "@/app/layouts/voiturierlayout";
import Navbar from "@/app/components/navbar";
import { Button, Skeleton, Input } from "@nextui-org/react";
import FooterBarLayout from "@/app/layouts/footerbarlayout";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import useSite from "@/app/stores/site";
import useSessionRedirection from "@/app/stores/sessionredirection";

const ForgetPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter();
  useSessionRedirection()
  const { data: siteData, loading: isSiteLoading} = useSite()

  const resetPassword = async e => {
    e.preventDefault();
    setLoading(true);
    if (!siteData) {
      toast.error('Votre lien de réinitialisation est invalide. Contactez le support')
      setLoading(false);
      return;
    }
    if (!phoneNumber) {
      toast.error('Veuillez remplir tous les champs')
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post("/api/forget", {
        phoneNumber: phoneNumber
      })
      if ( data.message === "Invalid phone number received.") {
        toast.error('Numéro de téléphone invalide')
        setLoading(false);
        return null;
      } else if ( data.message === "User doesn't exists with this phone number.") {
        toast.error('Aucun utilisateur trouvé avec ce numéro de téléphone')
        setLoading(false);
        return null;
      } else {
        router.push(`/newpassword?site=${siteData.id}&t=${data.token}`)
      }
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer')
      setLoading(false);
    }
  }

  return (
    <VoiturierLayout>
      <Navbar subtitle="Réintialiser votre" title="Mot de passe" isLoading={isSiteLoading} />
        {isSiteLoading ? (
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
