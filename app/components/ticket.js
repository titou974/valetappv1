import {Accordion, AccordionItem, Skeleton } from "@nextui-org/react";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import formatDateToFrench from '@/lib/formatdate';
import style from "../styles/ticket.module.css";
import { cguContent } from '@/constants';
import { Chip } from "@nextui-org/react";
import { HashtagIcon } from '@heroicons/react/20/solid';

const Ticket = ({ isTicketLoading, ticketData, companyData }) => { 
    const itemClasses = {
        base: "py-0 w-full",
        titleWrapper: "w-full",
        title: "font-normal text-medium",
        trigger: "px-2 py-0 rounded-lg flex flex-col items-start",
        indicator: "text-medium self-center",
        content: "text-small px-2",
    }
    return (
        <Accordion
            showDivider={false}
            className={`${style.digitalTicket} data-[hover=true]:bg-default-100`}
            variant="shadow"
            itemClasses={itemClasses}
        >
            <AccordionItem
                key="1"
                aria-label="Votre Ticket"
                subtitle={
                            isTicketLoading ? (
                                <div className='text-base text-primary-foreground space-y-2'>
                                    <Skeleton className="rounded-lg w-fit">
                                        crée à 01h35 le 26/10/2023
                                    </Skeleton>
                                    <Skeleton className="rounded-lg w-fit">
                                        au Gourmet Palace
                                    </Skeleton>
                                </div>
                            ) : (
                                <div className="text-base text-primary-foreground space-y-2">
                                    { formatDateToFrench(ticketData?.scannedAt) }
                                    <p className="italic font-semibold">
                                        au {ticketData?.restaurant.name}
                                    </p>
                                </div>
                            )
                        }
                title={
                    <div>
                        <div className='flex flex-col gap-2 rounded-md text-primary-foreground'>
                            <div className='flex items-center gap-4'>
                                <p className='font-bold text-xl'>Votre Ticket</p>
                                        {
                                            isTicketLoading ? (
                                                <Skeleton className="rounded-lg w-fit">
                                                    <Chip startContent={<HashtagIcon width={16} />} size="sm" color="primary" radius="sm" className="font-bold">1000</Chip>
                                                </Skeleton>  
                                            ) : (
                                                <Chip startContent={<HashtagIcon width={14} />} size="sm" color="secondary" variant="bordered" radius="sm" className="font-bold">{ticketData?.ticketNumber}</Chip>
                                            )
                                        }
                            </div>
                                {
                                    isTicketLoading ? (
                                        <Skeleton className="rounded-lg w-fit">
                                            10 €
                                        </Skeleton>
                                    ) : (
                                        <p className='font-semibold text-xl'>
                                            {ticketData?.restaurant?.ticketPrice} €
                                        </p>
                                    )
                                }
                            <div className='border w-full mb-4'>
                            </div>
                        </div>
                    </div>
                }
                indicator={({ isOpen }) => (isOpen ? <ChevronUpIcon className="h-6 w-6 text-primary-foreground mx-auto transition-all rotate-90" /> : <ChevronDownIcon className="h-6 w-6 text-primary-foreground mx-auto transition-all" />)}
            >
                <p className='pb-5'>CONDITIONS GÉNÉRALES D&rsquo;UTILISATION DE NESTOR APP</p>
                {companyData?.cgu ? (companyData?.cgu.map((part, index) => (
                    <div key={index} className='pb-5'>
                        <h3 className='font-semibold'>{part.subtitle}</h3>
                        <p className=''>{part.text}</p>
                    </div>
                ))) : (
                    cguContent?.map((part, index) => (
                        <div key={index} className='pb-5'>
                            <h3 className='font-semibold'>{part.subtitle}</h3>
                            <p className=''>{part.text}</p>
                        </div>
                    ))
                )}
            </AccordionItem>
        </Accordion>
    )
}

export default Ticket;