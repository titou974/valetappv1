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
import useSessionRedirection from "@/app/stores/sessionredirection";
import useSite from "@/app/stores/site";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneAlert, setPhoneAlert] = useState(false);
  const [phoneNumberExist, setPhoneNumberExist] = useState(false);
  const [fillTextAlert, setFillTextAlert] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {data, isLoading, isError} = useSite();
  const router = useRouter();

  useSessionRedirection()

  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);
    setFillTextAlert(false);
    setPhoneNumberExist(false);
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
    <div className="w-full h-screen bg-black">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={`${styles.padding} flex flex-col justify-between h-full`}>
        <div>
          <h3 className={styles.subText}>Remplissez</h3>
          <h2 className={styles.headText}>vos Informations</h2>
        </div>
        <div className="w-full relative flex flex-col justify-center gap-10">
          {isLoading ? (
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
            ) : (data && data.id ? (
              <>
                <Input placeholder="Prénom" input={name} setInput={(e) => setName(e)} />
                <Input placeholder="Numéro de Téléphone" input={phoneNumber} setInput={(e) => setPhoneNumber(e)} />
                <Input placeholder="Password" input={password} setInput={(e) => setPassword(e)} />
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
        {isLoading ? (
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
            <div className={`flex flex-col justify-between gap-5 ${!data && "invisible"}`}>
              <button onClick={handleRegister} className="bg-primary w-full py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors">
                <p className="text-black font-semibold text-[26px]">Créer votre compte</p>
                <div className="w-[26px]">
                  <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </button>
              <Link href={`sign-in${data === null ? "" : `?site=${data?.id}`}`} className="mx-auto w-2/3 py-[12px] rounded-full font-bold hover:bg-primary transition-colors flex justify-center items-center gap-2 text-primary hover:text-black">
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
