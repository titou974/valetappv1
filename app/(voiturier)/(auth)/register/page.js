"use client"

import styles from "@/app/components/style";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
import LoadingModal from "@/app/components/loadingmodal";
import { QrCodeIcon, ArrowRightIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import useSessionRedirection from "@/app/stores/sessionredirection";
import useSite from "@/app/stores/site";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VoiturierLayout from "@/app/layouts/voiturierlayout";
import { Button, Input, Link, Skeleton } from "@nextui-org/react";
import Navbar from "@/app/components/navbar";

const Register = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {data, isLoading} = useSite();
  const router = useRouter();

  useSessionRedirection(router)

  const handleRegister = async e => {
    e.preventDefault()
    setLoading(true)
    if (!data || !data.id) {
      return null;
    }
    try {
      const response = await axios.post("/api/voiturier", {
        name: name,
        phoneNumber: phoneNumber,
        password: password,
        companyId: data.companyId,

      });
      const responseData = await response.data;
      if (responseData.userId === null && responseData.message ===  "Un voiturier avec ce numéro existe déjà.") {
        toast.error("Un voiturier avec ce numéro existe déjà.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
      } else if (responseData.userId === null && responseData.message ===  "Invalid data received.") {
        toast.error("Remplissez tout les champs.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
      } else if (responseData.userId === null && responseData.message ===  "Invalid phone number received.") {
        toast.error("Le numéro de téléphone donné n'est pas valide", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
      } else if (responseData.userId) {
        const signInData = await signIn('credentials', {
          phoneNumber,
          password,
          site: data.id,
          redirect: false,
        })
        if (!signInData?.ok) {
          console.log("Sign-in API call failed:", signInData.error);
          router.push("/sign-in");
        } else {
          router.push("/dashboard");
        }
      }
    } catch(error) {
        toast.error("Oups... Une erreur à eu lieu. Réessayez dans quelques instants et si l'erreur persiste contactez le support.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      console.log("creation of Voiturier failed", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <VoiturierLayout>
      <Navbar subtitle='Remplissez' title='vos Informations' isLoading={isLoading} />
      <div className="w-full relative flex flex-col justify-center gap-10">
        {isLoading ? (
          <>
              <Skeleton className="rounded-lg">
                <div className='w-full h-14 bg-gray-400/50 rounded-lg'></div>
              </Skeleton>
              <Skeleton className="rounded-lg">
                <div className='w-full h-14 bg-gray-400/50 rounded-lg'></div>
              </Skeleton>
              <Skeleton className="rounded-lg">
                <div className='w-full h-14 bg-gray-400/50 rounded-lg'></div>
              </Skeleton>
          </>
          ) : (data && data.id ? (
            <>
              <Input label="Prénom" input={name} setInput={(e) => setName(e)} />
              <Input label="Numéro de Téléphone" type="tel" input={phoneNumber} setInput={(e) => setPhoneNumber(e)} />
              <Input label="Mot de passe" input={password} setInput={(e) => setPassword(e)} />
            </>
          ) : (
            <>
              <div className='text-center text-foreground mx-auto w-full flex justify-center items-center'>
                <p className={`text-center font-bold mr-4 text-[26px]`}>Scanner le QR Code</p>
                <div className='text-primary w-[40px]'>
                  <QrCodeIcon  />
                </div>
              </div>
              <div className="text-foreground text-base text-center">
                <p>pour vous créer un compte</p>
              </div>
            </>
          ))}
      </div>
      <div className={`flex flex-col justify-between gap-5`}>
        <Button onClick={handleRegister} className='fill-primary-foreground' size="lg" color="primary" variant="solid" radius='full' endContent={< ArrowRightIcon width={20}/>} isLoading={loading} isDisabled={!data}>
          Créer votre compte
        </Button>
        <Button onClick={() => router.push(`sign-in${data && `?site=${data?.id}`}`)} color="primary" variant="light" radius='full' endContent={< ArrowRightIcon width={20}/>} isDisabled={!data}>
          Se connecter
        </Button>
      </div>
    </VoiturierLayout>
  )
}

export default Register;
