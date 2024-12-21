'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import {
  QrCodeIcon,
  ArrowRightIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/20/solid';
import useSessionRedirection from '@/app/stores/sessionredirection';
import useSite from '@/app/stores/site';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VoiturierLayout from '@/app/layouts/voiturierlayout';
import { Button, Input, Link, Skeleton } from '@nextui-org/react';
import Navbar from '@/app/components/navbar';

const LogIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { data, isLoading } = useSite();

  useSessionRedirection(router);

  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!phoneNumber || !password || !data) {
      setLoading(false);
      toast.error('Remplissez tout les champs.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    const session = await signIn('credentials', {
      phoneNumber,
      password,
      site: data.id,
      redirect: false, // Avoids automatic redirect
    });

    if (!session?.ok) {
      toast.error("Le mot de passe n'est pas correct.", {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <VoiturierLayout>
      {data && !data.error ? (
        <Navbar
          subtitle='Vous êtes au'
          title={data.name}
          isLoading={isLoading}
        />
      ) : (
        <Navbar
          subtitle='Bonjour'
          title='Prêt, à travailler ?'
          isLoading={isLoading}
        />
      )}
      <div className='flex w-full flex-col justify-center gap-10'>
        {isLoading ? (
          <>
            <Skeleton className='rounded-lg'>
              <div className='h-14 w-full rounded-lg bg-gray-400/50'></div>
            </Skeleton>
            <Skeleton className='rounded-lg'>
              <div className='h-14 w-full rounded-lg bg-gray-400/50'></div>
            </Skeleton>
            <Skeleton className='rounded-lg'>
              <div className='h-6 w-full rounded-lg bg-gray-400/50'></div>
            </Skeleton>
          </>
        ) : data ? (
          <>
            <Input
              label='Numéro de Téléphone'
              type='tel'
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Input
              label='Mot de Passe'
              onChange={(e) => setPassword(e.target.value)}
              endContent={
                <button
                  className='h-8 w-8 text-default-400 focus:outline-none'
                  type='button'
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              }
              type={isPasswordVisible ? 'text' : 'password'}
            />
            <Link
              href={`forget${data && `?site=${data?.id}`}`}
              color='primary'
              underline='hover'
            >
              Mot de passe oublié ?
            </Link>
          </>
        ) : (
          <>
            <div className='mx-auto flex w-full items-center justify-center text-center text-foreground'>
              <p className={`mr-4 text-center text-[26px] font-bold`}>
                Scanner le QR Code
              </p>
              <div className='w-[40px] text-primary'>
                <QrCodeIcon />
              </div>
            </div>
            <div className='text-center text-base text-foreground'>
              <p>pour vous connecter</p>
            </div>
          </>
        )}
      </div>
      <div className={`flex flex-col justify-between gap-5`}>
        <Button
          onClick={handleLogIn}
          className='fill-primary-foreground'
          size='lg'
          color='primary'
          variant='solid'
          radius='full'
          endContent={<ArrowRightIcon width={20} />}
          isLoading={loading}
          isDisabled={!data}
        >
          Se connecter
        </Button>
        <Button
          onClick={() => router.push(`register${data && `?site=${data?.id}`}`)}
          color='primary'
          variant='light'
          radius='full'
          endContent={<ArrowRightIcon width={20} />}
          isDisabled={!data}
        >
          Créer mon compte
        </Button>
      </div>
    </VoiturierLayout>
  );
};

export default LogIn;
