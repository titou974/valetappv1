import {Accordion, AccordionItem} from "@nextui-org/react";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import formatDateToFrench from '@/lib/formatdate';
import style from "../styles/ticket.module.css";
import { cguContent } from '@/constants';

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
                    <div className='text-base text-white space-y-2'>
                        <p>{isTicketLoading ? <span className="animate-pulse bg-gray-400/70 rounded-md h-[50px]" style={{ animationDelay: `${4 * 0.05}s`, animationDuration: "1s"}}><span className="invisible">crée à 01h35 le 26/10/2023</span></span> : formatDateToFrench(ticketData?.scannedAt)}</p>
                        <p><span className='italic font-semibold'>{isTicketLoading ? <span className="animate-pulse bg-gray-400/70 rounded-md h-[50px]" style={{ animationDelay: `${3 * 0.05}s`, animationDuration: "1s"}}><span className="invisible">au Gourmet Galaxy</span></span> : `au ${ticketData?.restaurant.name}`}</span></p>
                    </div>
                }
                title={
                    <div>
                        <div className='flex flex-col gap-2 rounded-md text-white'>
                            <div className='flex items-center gap-4'>
                                <p className={`text-xl font-bold pb-2`}>Votre Ticket</p>
                                <div className='border-2 px-1 mb-[10px] rounded-md'>
                                    <p className='font-semibold text-base'>{isTicketLoading ? <span className="animate-pulse bg-gray-400/70 rounded-md h-[50px]" style={{ animationDelay: `${2 * 0.05}s`, animationDuration: "1s"}}><span className="invisible">#16</span></span>  : `#${ticketData?.ticketNumber}`}</p>
                                </div>
                            </div>
                            <p className='font-semibold text-xl'>{isTicketLoading ? <span className="animate-pulse bg-gray-400/70 rounded-md h-[50px]" style={{ animationDelay: `${2 * 0.05}s`, animationDuration: "1s"}}><span className="invisible">16 €</span></span>  : `${ticketData?.restaurant.ticketPrice} €`}</p>
                            <div className='border w-full mb-4'>
                            </div>
                        </div>
                    </div>
                }
                indicator={({ isOpen }) => (isOpen ? <ChevronUpIcon className="h-6 w-6 text-white mx-auto transition-all rotate-90" /> : <ChevronDownIcon className="h-6 w-6 text-white mx-auto transition-all" />)}
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