"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
import { QrCodeIcon, ArrowRightIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import useSessionRedirection from "@/app/stores/sessionredirection";
import useSite from "@/app/stores/site";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VoiturierLayout from "@/app/layout/voiturierlayout";
import { Button, Input, Link, Skeleton } from "@nextui-org/react";
import Navbar from "@/app/components/navbar";


const LogIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {data, isLoading} = useSite()

  useSessionRedirection(router)

  const handleLogIn = async e => {
    e.preventDefault();
    console.log("phoneNumber", phoneNumber)
    setLoading(true);

    if(!phoneNumber || !password || !data) {
      setLoading(false);
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
      return;
    }

    const session = await signIn('credentials', {
      phoneNumber,
      password,
      site: data.id,
      redirect: false,  // Avoids automatic redirect
    });

    if (!session?.ok) {
      toast.error("Le mot de passe n'est pas correct.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setLoading(false);
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <VoiturierLayout>
        {data && !data.error ? (
          <Navbar subtitle='Vous êtes au' title={data.name} isLoading={isLoading} />
        ) : (
          <Navbar subtitle='Bonjour' title='Prêt, à travailler ?' isLoading={isLoading} />
        )}
        <div className="w-full flex flex-col justify-center gap-10">
          {isLoading ? (
            <>
              <Skeleton className="rounded-lg">
                <div className='w-full h-14 bg-gray-400/50 rounded-lg'></div>
              </Skeleton>
              <Skeleton className="rounded-lg">
                <div className='w-full h-14 bg-gray-400/50 rounded-lg'></div>
              </Skeleton>
              <Skeleton className="rounded-lg">
                <div className='w-full h-6 bg-gray-400/50 rounded-lg'></div>
              </Skeleton>
            </>
          ) : (
            data ? (
              <>
                <Input label="Numéro de Téléphone" type="tel" onChange={(e) => setPhoneNumber(e.target.value)}/>
                <Input 
                  label="Mot de Passe" 
                  onChange={(e) => setPassword(e.target.value)} 
                  endContent={
                    <button className="focus:outline-none w-8 h-8 text-default-400" type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                      {isPasswordVisible ? (
                        <EyeSlashIcon />
                      ) : (
                        <EyeIcon />
                      )}
                    </button>
                  }
                  type={isPasswordVisible ? "text" : "password"} 
                />
                <Link href={`forget${data && `?site=${data?.id}`}`} color="primary" underline="hover">
                  Mot de passe oublié ?
                </Link>
              </>
          ) : (
            <>
              <div className='text-center text-foreground mx-auto w-full flex justify-center items-center'>
                <p className={`text-center font-bold mr-4 text-[26px]`}>Scanner le QR Code</p>
                <div className='w-[40px] text-primary'>
                  <QrCodeIcon  />
                </div>
              </div>
              <div className="text-foreground text-base text-center">
                <p>pour vous connecter</p>
              </div>
            </>
          ))}
        </div>
        <div className={`flex flex-col justify-between gap-5`}>
          <Button onClick={handleLogIn} className='fill-primary-foreground' size="lg" color="primary" variant="solid" radius='full' endContent={< ArrowRightIcon width={20}/>} isLoading={loading} isDisabled={!data}>
            Se connecter
          </Button>
          <Button onClick={() => router.push(`register${data && `?site=${data?.id}`}`)} color="primary" variant="light" radius='full' endContent={< ArrowRightIcon width={20}/>} isDisabled={!data}>
            Créer mon compte
          </Button>
        </div>
    </VoiturierLayout>
  )
}

export default LogIn;
