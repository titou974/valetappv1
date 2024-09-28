'use client';
import Image from 'next/image';
import styles from './components/style';
import { QrCodeIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { Roboto_Mono } from 'next/font/google';
import TypewriterComponent from 'typewriter-effect';
import useSessionRedirection from '@/app/stores/sessionredirection';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

const roboto_mono = Roboto_Mono({ subsets: ['latin'] });

const Home = () => {
  const router = useRouter();

  useSessionRedirection();
  const introductionTexts = [
    'Bonjour, je suis Nestor, votre assistant voiturier.',
    'Scannez le QR code proposé par votre voiturier pour créer votre ticket.',
  ];

  return (
    <main className='relative h-screen w-full bg-primary text-primary-foreground'>
      <div
        className={`${styles.padding} mx-auto flex h-full max-w-screen-sm flex-col justify-center gap-8`}
      >
        <div className={`relative mx-auto ${roboto_mono.className}`}>
          <div className='absolute right-5 top-1'>
            <div className='relative h-[120px] w-[330px] min-w-[330px] rounded-full border-[2px] border-white bg-[#1b2e35] px-5 py-5 shadow-xl'>
              <TypewriterComponent
                onInit={(typewriter) => {
                  typewriter
                    .changeDelay(50)
                    .changeDeleteSpeed(10)
                    .typeString(`${introductionTexts[0]}`)
                    .pauseFor(5000)
                    .deleteAll(1)
                    .typeString(`<strong>${introductionTexts[1]}</strong>`)
                    .pauseFor(10000)
                    .deleteAll(1)
                    .start();
                }}
                options={{
                  delay: 100,
                  loop: true,
                }}
              />
              <svg
                width='37'
                height='48'
                viewBox='0 0 37 48'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='absolute bottom-[-43px] right-[120px]'
              >
                <mask id='path-1-inside-1_86_73' fill='white'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M0 1C1.52231 23.8587 16.5703 42.6127 36.431 47.7336C29.8149 38.4613 25.873 26.7957 25.873 14.1232C25.873 9.5995 26.3753 5.20406 27.3223 1H0Z'
                  />
                </mask>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M0 1C1.52231 23.8587 16.5703 42.6127 36.431 47.7336C29.8149 38.4613 25.873 26.7957 25.873 14.1232C25.873 9.5995 26.3753 5.20406 27.3223 1H0Z'
                  fill='#1B2E35'
                />
                <path
                  d='M36.431 47.7336L35.9316 49.6702L41.2478 51.0409L38.059 46.5719L36.431 47.7336ZM0 1V-1H-2.13762L-1.99558 1.1329L0 1ZM27.3223 1L29.2734 1.43949L29.8229 -1H27.3223V1ZM36.9303 45.7969C17.9875 40.9127 3.46639 22.9525 1.99558 0.867102L-1.99558 1.1329C-0.421777 24.7649 15.1531 44.3127 35.9316 49.6702L36.9303 45.7969ZM23.873 14.1232C23.873 27.2124 27.9451 39.2841 34.8029 48.8952L38.059 46.5719C31.6848 37.6386 27.873 26.379 27.873 14.1232H23.873ZM25.3712 0.560508C24.3918 4.90837 23.873 9.4512 23.873 14.1232H27.873C27.873 9.7478 28.3588 5.49975 29.2734 1.43949L25.3712 0.560508ZM27.3223 -1H0V3H27.3223V-1Z'
                  fill='white'
                  mask='url(#path-1-inside-1_86_73)'
                />
                <rect width='31' height='5' fill='#1B2E35' />
              </svg>
            </div>
          </div>
          <Image
            src='/nestor.png'
            width={400}
            height={400}
            alt='Nestor during his job'
          />
        </div>
        <div className='flex w-full flex-col items-center gap-20 text-base'>
          <div className='flex w-full flex-col gap-5'>
            <div className='mx-auto flex w-full items-center justify-center text-center'>
              <p className={`mr-4 text-center text-base font-bold`}>
                Scanner le QR Code
              </p>
              <div className='w-[40px]'>
                <QrCodeIcon />
              </div>
            </div>
            <div className='text-center font-bold'>
              <p>ou</p>
            </div>
            <Button
              onClick={() => router.push('/newticket')}
              size='lg'
              color='secondary'
              className='text-primary'
              variant='solid'
              radius='full'
              endContent={<ArrowRightIcon width={20} />}
            >
              Créer votre ticket
            </Button>
            <Button
              onClick={() => router.push('/sign-in')}
              color='secondary'
              variant='light'
              radius='full'
              endContent={<ArrowRightIcon width={20} />}
            >
              Je suis voiturier
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
