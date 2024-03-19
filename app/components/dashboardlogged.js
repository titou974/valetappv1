"use client";

import {
  PlayCircleIcon,
  ChevronDoubleDownIcon,
  ArrowPathIcon
} from "@heroicons/react/20/solid";
import StartingHour from "./startinghour";
import TimeCounter from "./timecounter";
import styles from "./style";
import style from "../styles/startbutton.module.css";
import { useState, useEffect, useRef } from "react";
import UserAccountNav from "./useraccountnav";
import axios from "axios";
import TicketDashboard from "./ticketdashboard";
import { slideIn, textVariant } from "@/lib/motion";
import { motion } from "framer-motion";
import useTicketsOfSession from "../stores/ticketsofsession";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardLogged = ({ siteName, siteId, sessionId, startedAt, userName }) => {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [ticketsWithoutImmat, setTicketsWithoutImmat] = useState(null);
  const [showNavbarTickets, setShowNavbarTickets] = useState(false);

  const footerRef = useRef(null);
  const ticketsRef = useRef(null);

  const startSession = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/session/${sessionId}`, {
        startedAt: new Date(),
      });

    } catch (error) {
      console.log("patch session failed", error.message);
    } 
  };

  const { data: ticketsData, isFetching: isTicketsLoading, isError, isSuccess, refetch } = useTicketsOfSession({ siteId, startedAt })
  
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


  useEffect(() => {
    const ticketsRefCurrent = ticketsRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        setShowNavbarTickets(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.5, 
      }
    );

    if (ticketsRef.current) {
      observer.observe(ticketsRef.current);
    }

    return () => {
      if (ticketsRefCurrent) {
        observer.unobserve(ticketsRefCurrent);
      }
    };
  }, [ticketsRef]);

  const scrollToTickets = () => {
    const id = 'profilePhoto';
    const yOffset = -150; 
    const y = ticketsRef.current.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({top: y, behavior: 'smooth'});
  };

  return (
    <div className="bg-black h-full w-full text-white">
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={`fixed top-0 gradientTop w-full ${styles.padding} z-50`}>
        {!showNavbarTickets && (
          <motion.div initial='hidden' animate='show' exit='hidden' variants={textVariant(0.25)}>
            <h2 className={`${styles.subText}`}>Bon courage,</h2>
            <h2 className={`${styles.headText}`}>{userName} 🚗</h2>
          </motion.div>
        )}
        {showNavbarTickets && (
          <motion.div initial='hidden' animate='show' exit='hidden' variants={textVariant(0.25)}>
            <h2 className={`${styles.subText}`} initial='hidden' animate='show' exit='hidden' variants={textVariant(0.5)} >Vous avez</h2>
            <h2 className={`${styles.headText}`}>{ticketsData?.tickets.length} ticket{ticketsData?.tickets.length > 1 && 's'}</h2>
          </motion.div>
        )}
      </div>
      <div className={`flex flex-col ${styles.paddingX} justify-center h-full`}>
        <div className={`flex flex-col justify-center h-screen items-center gap-4`}>
          {!startedAt ? (
            <div
              className="animate-pulse bg-gray-400/50 rounded-md w-fit mx-auto h-fit mb-5"
              style={{
                animationDelay: `${1 * 0.05}s`,
                animationDuration: "1s",
              }}
            >
              <h3 className="invisible text-[40px] text-center font-semibold">
                <TimeCounter
                  startingHour={startedAt}
                  sessionStarted={!!startedAt}
                />
              </h3>
            </div>
          ) : (
            <h3 className="text-[40px] text-center font-semibold">
              <TimeCounter
                startingHour={startedAt}
                sessionStarted={!!startedAt}
              />
            </h3>
          )}
          {startedAt ? (
            <div>
              <StartingHour startingHour={startedAt} />
              <p className="text-center py-2">
                Vous êtes au <span className="italic">{siteName}</span>
              </p>
            </div>
          ) : (
            <button
              onClick={(e) => startSession(e)}
              className={style.startButton}
            >
              <p>Démarrer la session</p>
              <PlayCircleIcon />
            </button>
          )}
          {!startedAt ? (
            <button
              className="mt-2 w-12 h-12 linearBackground rounded-full flex items-center justify-center animate-pulse bg-gray-400/50"
              style={{
                animationDelay: `${1 * 0.05}s`,
                animationDuration: "1s",
              }}
            >
              <ChevronDoubleDownIcon className="w-6 h-6 text-white invisible" />
            </button>
          ) : (
            <button
              className="mt-2 w-12 h-12 linearBackground rounded-full animate-bounce flex items-center justify-center"
              onClick={(e) => scrollToTickets()}
            >
              <ChevronDoubleDownIcon className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
          <div className="flex flex-col gap-8 h-full min-h-screen" ref={ticketsRef}>
            {ticketsWithoutImmat > 0 ? (
              <p>Vous avez {ticketsWithoutImmat} {ticketsWithoutImmat > 1 ? 'tickets' : 'ticket'} à compléter</p>
            ) : (
              <p>Tout vos tickets sont complétés</p>
            )}
            <button
              className="rounded-full bg-green-500 text-white p-2 min-h-fit w-1/2 hover:bg-white hover:text-green-500 flex justify-center items-center gap-2 transition-all"
              onClick={() => {refreshTickets()}}
            >
              Rafraîchir
              <ArrowPathIcon className={`h-6 w-6 ${isTicketsLoading && 'animate-spin'}`} />
            </button>
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
                    );
              })}
            </div>
          </div>
          {isFooterVisible && (
            <motion.div
              className={`fixed ${styles.padding} bottom-0 w-full left-1 right-1 gradientDashboardBottom z-50 flex justify-center items-center`}
              initial={{ opacity: 0}}
              animate={{ opacity: 1}}
            >
              <UserAccountNav sessionId={sessionId} startedHour={startedAt} />
            </motion.div>
          )}
      </div>
      <div className="text-center py-4" ref={footerRef}>
        <p className="text-white">Nestor App 🇫🇷</p>
      </div>
    </div>
  );
};

export default DashboardLogged;
