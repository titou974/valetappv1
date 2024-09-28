'use client';

import styles from '@/app/components/style';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import formatTimeDifference from '@/lib/formattimedifference';
import VoiturierLayout from '@/app/layouts/voiturierlayout';
import Navbar from '@/app/components/navbar';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import FooterBarLayout from '@/app/layouts/footerbarlayout';

const getSession = async (id) => {
  let sessionData = {};
  try {
    const apiUrl = `${window.location.protocol}//${window.location.host}`;
    const response = await axios.get(`${apiUrl}/api/session/${id}`);
    sessionData = response.data;
  } catch (error) {
    console.log('Error fetching user:', error.message);
  }
  return sessionData;
};

const SessionDone = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session');
  const [sessionExist, setSessionExist] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [sessionTime, setSessionTime] = useState('');
  const [loadingDiv, setLoadingDiv] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getSessionData = async () => {
      const session = await getSession(sessionId);
      if (!session || Object.keys(session).length === 0) {
        setSessionExist(false);
        setLoadingDiv(false);
      } else {
        setSessionExist(true);
        setSessionData(session);
        setSessionTime(formatTimeDifference(session.createdAt, session.endAt));
        setLoadingDiv(false);
      }
      console.log(session.startedAt, session.endAt);
    };
    if (sessionId) {
      getSessionData();
    } else {
      setSessionExist(false);
    }
  }, [sessionId]);

  return (
    <VoiturierLayout>
      <Navbar
        subtitle={`Bravo ${sessionData?.user.name}`}
        title={'À bientôt 👋'}
        isLoading={loadingDiv}
      />
      <div>
        <p className={`py-2 text-center text-foreground`}>
          Vous avez travaillé pendant{' '}
          {loadingDiv ? (
            <span
              className='h-[50px] animate-pulse rounded-md bg-gray-400/50'
              style={{
                animationDelay: `${2 * 0.05}s`,
                animationDuration: '1s',
              }}
            >
              <span className='invisible'>50 minutes</span>
            </span>
          ) : (
            <span className='font-bold'>{sessionTime}</span>
          )}
        </p>
        <p className={`py-2 text-center text-foreground`}>
          au{' '}
          {loadingDiv ? (
            <span
              className='h-[50px] animate-pulse rounded-md bg-gray-400/50'
              style={{
                animationDelay: `${2 * 0.05}s`,
                animationDuration: '1s',
              }}
            >
              <span className='invisible'>Nylsa Café</span>
            </span>
          ) : (
            <span className='font-bold italic'>
              {sessionData?.restaurant.name}
            </span>
          )}
        </p>
      </div>
      <FooterBarLayout fixed={false}>
        <Button
          onClick={() => router.push('sign-in')}
          className='fill-primary-foreground'
          size='lg'
          color='primary'
          variant='solid'
          radius='full'
          fullWidth={true}
          endContent={<ArrowRightIcon width={20} />}
          isLoading={loadingDiv}
          isDisabled={loadingDiv}
        >
          Se connecter
        </Button>
        <Button
          onClick={() => router.push(`register`)}
          color='primary'
          variant='light'
          radius='full'
          endContent={<ArrowRightIcon width={20} />}
          fullWidth={true}
          isDisabled={loadingDiv}
        >
          Créer mon compte
        </Button>
      </FooterBarLayout>
    </VoiturierLayout>
  );
};

export default SessionDone;
