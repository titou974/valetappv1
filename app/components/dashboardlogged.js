"use client";

import {
  PlayCircleIcon,
  ChevronDoubleDownIcon,
  ArrowPathIcon
} from "@heroicons/react/20/solid";
import StartingHour from "./startinghour";
import TimeCounter from "./timecounter";
import styles from "./style";
import style from "../startbutton.module.css";
import { useState, useEffect, useRef } from "react";
import UserAccountNav from "./useraccountnav";
import axios from "axios";
import TicketDashboard from "./ticketdashboard";
import { slideIn, textVariant } from "@/lib/motion";
import { motion, AnimatePresence } from "framer-motion";

const DashboardLogged = ({ siteName, sessionId, userName }) => {
  const [startedHour, setStartedHour] = useState(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [restaurantId, setRestaurantId] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [ticketsWithoutImmat, setTicketsWithoutImmat] = useState(null);
  const [showNavbarTickets, setShowNavbarTickets] = useState(false);

  const footerRef = useRef(null);
  const ticketsRef = useRef(null);

  const startSession = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStartedHour(new Date());
    setSessionStarted(true);
    try {
      const response = await axios.patch(`/api/session/${sessionId}`, {
        startedAt: new Date(),
      });
      setStartedHour(response.data.startedAt);
      setRestaurantId(response.data.restaurantId);
    } catch (error) {
      console.log("patch session failed", error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const getTicketsOfSession = async () => {
    try {
      const apiUrl = `${window.location.protocol}//${window.location.host}`;
      const response = await axios.get(`${apiUrl}/api/ticketsforvalet`,
        { params: { restaurantId: restaurantId, startDate: startedHour } }
      );
      setTickets(response.data.tickets);
    } catch (error) {
      console.log("Error fetching tickets:", error.message);
    }
  };


  useEffect(() => {
    setTicketsWithoutImmat(tickets.filter(ticket => !ticket.immatriculation).length);
  }, [tickets])


  const refreshTickets = async () => {
    setLoading(true);
    await getTicketsOfSession();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const getSessionData = async () => {
      setLoading(true);
      let sessionData = {};
      try {
        const apiUrl = `${window.location.protocol}//${window.location.host}`;
        const response = await axios.get(`${apiUrl}/api/session/${sessionId}`)
        sessionData = response.data;
      } catch (error) {
        console.log("Error fetching user:", error.message);
      }
      if (sessionData && sessionData.startedAt) {
        setSessionStarted(true);
        setStartedHour(sessionData.startedAt);
        setRestaurantId(sessionData.restaurantId);
      }
    };
    getSessionData();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (sessionStarted) {
      getTicketsOfSession();
    }
  }, [sessionStarted]);

  useEffect(() => {
    const ref = footerRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Set footer visibility based on intersection
        setIsFooterVisible(!entry.isIntersecting);
      },
      {
        root: null, // viewport as the root
        threshold: 1.0, // fully intersecting the target
      }
    );

    // Start observing the tickets section
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    // Clean up the observer
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
        console.log("xouxou", entry.isIntersecting);
        setShowNavbarTickets(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.5, // Adjust threshold as needed
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
            <h2 className={`${styles.headText}`}>{tickets.length} ticket{tickets.length > 1 && 's'}</h2>
          </motion.div>
        )}
      </div>
      <div className={`flex flex-col ${styles.paddingX} justify-center h-full`}>
        <div className={`flex flex-col justify-center h-screen`}>
          {loading ? (
            <div
              className="animate-pulse bg-gray-400/50 rounded-md w-fit mx-auto h-fit mb-5"
              style={{
                animationDelay: `${1 * 0.05}s`,
                animationDuration: "1s",
              }}
            >
              <h3 className="invisible text-[40px] text-center py-4 font-semibold">
                <TimeCounter
                  startingHour={startedHour}
                  sessionStarted={sessionStarted}
                  setLoading={(e) => setLoading(e)}
                />
              </h3>
            </div>
          ) : (
            <h3 className="text-[40px] text-center py-4 font-semibold">
              <TimeCounter
                startingHour={startedHour}
                sessionStarted={sessionStarted}
                setLoading={(e) => setLoading(e)}
              />
            </h3>
          )}
          {loading ? (
            <div
              className="animate-pulse bg-gray-400/50 rounded-full w-fit mx-auto"
              style={{
                animationDelay: `${2 * 0.05}s`,
                animationDuration: "1s",
              }}
            >
              <button
                onClick={(e) => startSession(e)}
                className={`${style.startButton} invisible`}
              >
                <p>Démarrer la session</p>
                <PlayCircleIcon />
              </button>
            </div>
          ) : sessionStarted ? (
            <div className="flex flex-col justify-center items-center gap-16">
              <div>
                <StartingHour startingHour={startedHour} />
                <p className="text-center py-2">
                  Vous êtes au <span className="italic">{siteName}</span>
                </p>
              </div>
              <button
                className="w-12 h-12 linearBackground rounded-full animate-bounce flex items-center justify-center"
                onClick={(e) => scrollToTickets()}
              >
                <ChevronDoubleDownIcon className="w-6 h-6 text-white" />
              </button>
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
        </div>
          <div className="flex flex-col gap-8 h-full min-h-screen" ref={ticketsRef}>
            {ticketsWithoutImmat > 0 ? (
              <p>Vous avez {ticketsWithoutImmat} {ticketsWithoutImmat > 1 ? 'tickets' : 'ticket'} à compléter</p>
            ) : (
              <p>Tout vos tickets sont complétés</p>
            )}
            <button
              className="rounded-full bg-green-500 text-white p-2 min-h-fit w-1/2 hover:bg-white hover:text-green-500 flex justify-center items-center gap-2 transition-all"
              onClick={(e) => refreshTickets()}
            >
              Rafraîchir
              <ArrowPathIcon className={`h-6 w-6 ${loading && 'animate-spin'}`} />
            </button>
            <div className="text-white min-h-fit grid grid-cols-1 gap-4">
              {tickets &&
                tickets
                  .slice()
                  .sort((a, b) => new Date(b.scannedAt) - new Date(a.scannedAt))
                  .map((ticket, index) => {
                    return (
                      <motion.div key={index} initial="hidden" variants={slideIn('left', 'tween', index * 0.25, 0.5)} whileInView="show" viewport={{ once: true }} >
                        <TicketDashboard
                          ticketData={ticket}
                          refreshTickets={refreshTickets}
                          loading={loading}
                          setLoading={(e) => setLoading(e)}
                          index={index}
                          tickets={tickets}
                          setTickets={(e) => setTickets(e)}
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
              <UserAccountNav sessionId={sessionId} startedHour={startedHour} />
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
