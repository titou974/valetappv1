"use client";

import { useState, useEffect, useRef } from "react"
import TicketDashboard from "./ticketdashboard"
import { slideIn } from "@/lib/motion"
import { motion } from "framer-motion"
import useTicketsOfSession from "../stores/ticketsofsession";
import { toast } from 'react-toastify';
import Navbar from "./navbar";
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@nextui-org/react";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import FooterBarLayout from "@/app/layouts/footerbarlayout";
import { signOut } from "next-auth/react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';


const DashboardLogged = ({ siteId, sessionId, startedAt }) => {
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [ticketsWithoutImmat, setTicketsWithoutImmat] = useState(null);
  const [loading, setLoading] = useState(false);
  const footerRef = useRef(null);

  const { data: ticketsData, isFetching: isTicketsLoading, isSuccess, refetch } = useTicketsOfSession({ siteId, startedAt })
  
  const refreshTickets = () => {
    refetch()
    if (isSuccess) {
      toast.success('Tickets rafraîchis')
    } else {
      toast.error('Erreur lors du rafraîchissement des tickets. Si le problème persiste, contactez le support')
    }
  }
  
  useEffect(() => {
    const ref = footerRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsFooterVisible(!entry.isIntersecting);
      },
      {
        root: null, 
        threshold: 1.0, 
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
}, [footerRef]);

const handleSignOut = async e => {
  e.preventDefault()
  setLoading(true)
  try {
    await axios.patch(`/api/session/${sessionId}`, {
      endAt: new Date(),
    })
  } catch(error) {
    console.log('patch session failed')
  } finally {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/done?session=${sessionId}`
    })
  }
}


  return (
    <>
      <Navbar subtitle='Vous avez' title={`${ticketsData?.tickets.length} ticket${ticketsData?.tickets.length > 1 ? 's' : ''}`} isLoading={isTicketsLoading} />
      <div className={`flex flex-col justify-center h-screen py-10`}>
        <div className="flex flex-col gap-8 h-full">
          <div className="space-y-4">
            {ticketsWithoutImmat > 0 ? (
              <p>Vous avez {ticketsWithoutImmat} {ticketsWithoutImmat > 1 ? 'tickets' : 'ticket'} à compléter</p>
            ) : (
              <p>Tout vos tickets sont complétés</p>
            )}
            <Button
              color="primary"
              variant="bordered"
              size="md" 
              radius='full'
              onClick={() => {refreshTickets()}}
              disabled={isTicketsLoading}
              endContent={< ArrowPathIcon width={20} className={`${isTicketsLoading && 'animate-spin'}`}/>}
            >
              Rafraîchir
            </Button>
          </div>
          <div className="text-white min-h-fit grid grid-cols-1 gap-4">
            {ticketsData &&
              ticketsData.tickets
                .slice()
                .sort((a, b) => new Date(b.scannedAt) - new Date(a.scannedAt))
                .map((ticket, index) => {
                  return (
                    <motion.div key={index} initial="hidden" variants={slideIn('left', 'tween', index * 0.25, 0.5)} whileInView="show" viewport={{ once: true }} >
                      <TicketDashboard
                        ticketData={ticket}
                        refreshTickets={refetch}
                        loading={isTicketsLoading}
                        index={index}
                      />
                    </motion.div>
                  )
            })}
          </div>
        </div>
        <FooterBarLayout isVisible={isFooterVisible}>
          <Button onClick={handleSignOut} className='fill-primary-foreground' size="lg" color="primary" variant="solid" radius='full' fullWidth={true} isLoading={loading}>
            J'ai terminé 
          </Button>
        </FooterBarLayout>
      </div>
      <div ref={footerRef}/>
    </>
  );
};

export default DashboardLogged;
