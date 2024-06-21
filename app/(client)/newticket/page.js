"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingModal from "@/app/components/loadingmodal";
import { QrCodeIcon } from "@heroicons/react/20/solid";
import useTicket from "@/app/stores/ticket";
import { useSearchParams } from "next/navigation";
import ClientLayout from "@/app/layouts/clientlayout";
import Navbar from "@/app/components/navbar";

const Register = () => {
  const searchParams = useSearchParams();
  const siteId = searchParams.get("site");

  const router = useRouter();
  const { data, isLoading } = useTicket({ siteId, router })

  return (
    <ClientLayout>
      <>
        {data?.name ? (
          <Navbar subtitle="Bienvenue au" title={data?.name} isLoading={isLoading} transparent />
        ) : (
          <Navbar subtitle="Créer" title="votre Ticket 🅿️" isLoading={isLoading} transparent />
        )}
      </>
      {isLoading? (
        <div className="w-full flex flex-col justify-center items-center gap-10">
          <div className='text-center mx-auto w-fit flex justify-center items-center animate-pulse bg-gray-400/50'>
            <p className={`text-center font-bold mr-4 text-[26px] invisible`}>Scanner le QR Code</p>
            <div className='text-primary w-[40px] invisible'>
              <QrCodeIcon  />
            </div>
          </div>
          <div className="text-foreground text-base text-center animate-pulse bg-gray-400/50 w-fit">
            <p className="invisible">pour vous créer votre ticket</p>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col justify-center gap-10">
            <div className='text-center mx-auto w-full flex justify-center items-center'>
              <p className={`text-center font-bold mr-4 text-[26px]`}>Scanner le QR Code</p>
              <div className='text-primary w-[40px]'>
                <QrCodeIcon  />
              </div>
            </div>
            <div className="text-foreground text-base text-center">
              <p>pour vous créer votre ticket</p>
            </div>
          </div>
        </>
      )}
      <div className="mb-20">
      </div>
      <LoadingModal isOpen={isLoading} setIsOpen={(e) => setIsModalLoading(e)} title="Création de votre ticket" canClose={false} />
    </ClientLayout>
  )
}

export default Register;
