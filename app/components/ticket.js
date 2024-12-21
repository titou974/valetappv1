import { Accordion, AccordionItem, Skeleton } from '@nextui-org/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { formatDateToFrench } from '@/lib/formatdate';
import style from '../styles/ticket.module.css';
import { cguContent } from '@/constants';
import { Chip } from '@nextui-org/react';
import { HashtagIcon } from '@heroicons/react/20/solid';

const Ticket = ({ isTicketLoading, ticketData, companyData }) => {
  const itemClasses = {
    base: 'py-0 w-full',
    titleWrapper: 'w-full',
    title: 'font-normal text-medium',
    trigger: 'px-2 py-0 rounded-lg flex flex-col items-start',
    indicator: 'text-medium self-center',
    content: 'text-small px-2',
  };
  return (
    <Accordion
      showDivider={false}
      className={`${style.digitalTicket} data-[hover=true]:bg-default-100`}
      variant='shadow'
      itemClasses={itemClasses}
    >
      <AccordionItem
        key='1'
        aria-label='Votre Ticket'
        subtitle={
          isTicketLoading ? (
            <div className='space-y-2 text-base text-primary-foreground'>
              <Skeleton className='w-fit rounded-lg'>
                crée à 01h35 le 26/10/2023
              </Skeleton>
              <Skeleton className='w-fit rounded-lg'>
                au Gourmet Palace
              </Skeleton>
            </div>
          ) : (
            <div className='space-y-2 text-base text-primary-foreground'>
              {formatDateToFrench(ticketData?.scannedAt)}
              <p className='font-semibold italic'>
                au {ticketData?.restaurant.name}
              </p>
            </div>
          )
        }
        title={
          <div>
            <div className='flex flex-col gap-2 rounded-md text-primary-foreground'>
              <div className='flex items-center gap-4'>
                <p className='text-xl font-bold'>Votre Ticket</p>
                {isTicketLoading ? (
                  <Skeleton className='w-fit rounded-lg'>
                    <Chip
                      startContent={<HashtagIcon width={16} />}
                      size='md'
                      color='primary'
                      radius='sm'
                      classNames={{
                        content: 'font-bold text-base pt-px',
                      }}
                    >
                      1000
                    </Chip>
                  </Skeleton>
                ) : (
                  <Chip
                    startContent={<HashtagIcon width={14} />}
                    size='md'
                    color='secondary'
                    variant='bordered'
                    radius='sm'
                    classNames={{
                      content: 'font-bold text-base pt-px',
                    }}
                  >
                    {ticketData?.ticketNumber}
                  </Chip>
                )}
              </div>
              {isTicketLoading ? (
                <Skeleton className='w-fit rounded-lg'>10 €</Skeleton>
              ) : (
                <p className='text-xl font-semibold'>
                  {ticketData?.restaurant?.ticketPrice} €
                </p>
              )}
              <div className='mb-4 w-full border'></div>
            </div>
          </div>
        }
        indicator={({ isOpen }) =>
          isOpen ? (
            <ChevronUpIcon className='mx-auto h-6 w-6 rotate-90 text-primary-foreground transition-all' />
          ) : (
            <ChevronDownIcon className='mx-auto h-6 w-6 text-primary-foreground transition-all' />
          )
        }
      >
        <p className='pb-5'>
          CONDITIONS GÉNÉRALES D&rsquo;UTILISATION DE NESTOR APP
        </p>
        {companyData?.cgu
          ? companyData?.cgu.map((part, index) => (
              <div key={index} className='pb-5'>
                <h3 className='font-semibold'>{part.subtitle}</h3>
                <p className=''>{part.text}</p>
              </div>
            ))
          : cguContent?.map((part, index) => (
              <div key={index} className='pb-5'>
                <h3 className='font-semibold'>{part.subtitle}</h3>
                <p className=''>{part.text}</p>
              </div>
            ))}
      </AccordionItem>
    </Accordion>
  );
};

export default Ticket;
