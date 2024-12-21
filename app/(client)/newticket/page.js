'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingModal from '@/app/components/loadingmodal';
import { QrCodeIcon } from '@heroicons/react/20/solid';
import useTicket from '@/app/stores/ticket';
import { useSearchParams } from 'next/navigation';
import ClientLayout from '@/app/layouts/clientlayout';
import Navbar from '@/app/components/navbar';

const Register = () => {
  const searchParams = useSearchParams();
  const siteId = searchParams.get('site');

  const router = useRouter();
  const { data, isLoading } = useTicket({ siteId, router });

  return (
    <ClientLayout>
      <>
        {data?.name ? (
          <Navbar
            subtitle='Bienvenu au'
            title={data?.name}
            isLoading={isLoading}
            transparent
          />
        ) : (
          <Navbar
            subtitle='Créer'
            title='votre Ticket 🅿️'
            isLoading={isLoading}
            transparent
          />
        )}
      </>
      {isLoading ? (
        <div className='flex w-full flex-col items-center justify-center gap-10'>
          <div className='mx-auto flex w-fit animate-pulse items-center justify-center bg-gray-400/50 text-center'>
            <p className={`invisible mr-4 text-center text-[26px] font-bold`}>
              Scanner le QR Code
            </p>
            <div className='invisible w-[40px] text-primary'>
              <QrCodeIcon />
            </div>
          </div>
          <div className='w-fit animate-pulse bg-gray-400/50 text-center text-base text-foreground'>
            <p className='invisible'>pour vous créer votre ticket</p>
          </div>
        </div>
      ) : (
        <>
          <div className='flex w-full flex-col justify-center gap-10'>
            <div className='mx-auto flex w-full items-center justify-center text-center'>
              <p className={`mr-4 text-center text-[26px] font-bold`}>
                Scanner le QR Code
              </p>
              <div className='w-[40px] text-primary'>
                <QrCodeIcon />
              </div>
            </div>
            <div className='text-center text-base text-foreground'>
              <p>pour vous créer votre ticket</p>
            </div>
          </div>
        </>
      )}
      <div className='mb-20'></div>
      <LoadingModal
        isOpen={isLoading}
        setIsOpen={(e) => setIsModalLoading(e)}
        title='Création de votre ticket'
        canClose={false}
      />
    </ClientLayout>
  );
};

export default Register;
