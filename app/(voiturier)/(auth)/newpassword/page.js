'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import LoadingModal from '@/app/components/loadingmodal';
import VoiturierLayout from '@/app/layouts/voiturierlayout';
import { Button, Skeleton, Input } from '@nextui-org/react';
import Navbar from '@/app/components/navbar';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import FooterBarLayout from '@/app/layouts/footerbarlayout';
import useSite from '@/app/stores/site';
import useSessionRedirection from '@/app/stores/sessionredirection';
import useCheckToken from '@/app/stores/checktoken';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetToken = searchParams.get('t');

  useSessionRedirection();
  const { data: siteData, loading: isSiteLoading } = useSite();
  const { data: tokenData, loading: isTokenLoading } = useCheckToken({
    resetToken,
  });

  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!tokenData || !siteData) {
      toast.error('Token invalide');
      setLoading(false);
      return;
    } else if (!password || !newPassword) {
      toast.error('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    } else if (password !== newPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.patch(`/api/forget/${resetToken}`, {
        password: password,
      });
      if (!data) {
        setLoading(false);
        toast.error('Une erreur est survenue. Veuillez réessayer');
        return null;
      } else {
        router.push(`/sign-in?site=${siteData.id}`);
        setLoading(false);
        return null;
      }
    } catch (error) {
      console.log(error, 'reset of password failed');
      setLoading(false);
    }
  };

  return (
    <VoiturierLayout>
      <Navbar
        subtitle='Réintialiser votre'
        title='Mot de passe'
        isLoading={isSiteLoading || isTokenLoading}
      />
      {isSiteLoading || isTokenLoading ? (
        <>
          <Skeleton className='rounded-lg'>
            <div className='h-14 w-full rounded-lg bg-gray-400/50'></div>
          </Skeleton>
          <Skeleton className='rounded-lg'>
            <div className='h-14 w-full rounded-lg bg-gray-400/50'></div>
          </Skeleton>
        </>
      ) : (
        <div className='flex flex-col gap-6'>
          <Input
            label='Mot de Passe'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label='Confirmer votre mot de passe'
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      )}
      <FooterBarLayout fixed={false}>
        <Button
          onClick={resetPassword}
          className='fill-primary-foreground'
          size='lg'
          color='primary'
          variant='solid'
          radius='full'
          fullWidth={true}
          endContent={<ArrowRightIcon width={20} />}
          isLoading={loading}
          disabled={isTokenLoading || isSiteLoading}
        >
          Confirmer
        </Button>
      </FooterBarLayout>
      <LoadingModal
        isOpen={loading}
        setIsOpen={(e) => setLoading(e)}
        title='Réinitialisation de votre mot de passe'
      />
    </VoiturierLayout>
  );
};

export default ResetPassword;
