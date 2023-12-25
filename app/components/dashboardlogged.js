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
import { m } from "framer-motion";
import { slideIn } from "@/lib/motion";
import { AnimatePresence } from "framer-motion";

const DashboardLogged = ({ siteName, sessionId, userName }) => {
  const [startedHour, setStartedHour] = useState(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [restaurantId, setRestaurantId] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [isFooterVisible, setIsFooterVisible] = useState(true);

  const ticketsScrollRef = useRef(null);

  const cardVariants = {
    offscreen: {
      y: 300
    },
    onscreen: {
      y: 50,
      rotate: -10,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  const startSession = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStartedHour(new Date());
    setSessionStarted(true);
    try {
      const response = await axios.patch(`/api/session/${sessionId}`, {
        startedAt: new Date(),
      });
      console.log("voilà la réponse du patch", response);
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
    console.log(restaurantId, startedHour);
    try {
      const apiUrl = `${window.location.protocol}//${window.location.host}`;
      const response = await axios.get(`${apiUrl}/api/ticketsforvalet`,
        { params: { restaurantId: restaurantId, startDate: startedHour } }
      );
      setTickets(response.data.tickets);
      console.log("voila vos tickets", response.data);
    } catch (error) {
      console.log("Error fetching tickets:", error.message);
    }
  };

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
        console.log(sessionData);
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
  if (ticketsScrollRef.current) {
    observer.observe(ticketsScrollRef.current);
  }

  // Clean up the observer
  return () => {
    if (ticketsScrollRef.current) {
      observer.unobserve(ticketsScrollRef.current);
    }
  };
}, [ticketsScrollRef]);


  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-black h-full w-full text-white">
      <div className={`fixed top-0 gradientTop w-full ${styles.padding} z-50`}>
        <h2 className={`${styles.subText}`}>Bon courage,</h2>
        <h2 className={`${styles.headText}`}>{userName} 🚗</h2>
      </div>
      <div className={`flex flex-col ${styles.padding} justify-center h-full`}>
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
                onClick={(e) => scrollToBottom()}
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
        {sessionStarted && (
          <div className="flex flex-col gap-8 h-full min-h-screen">
            <button
              className="rounded-full bg-green-500 text-white p-2 min-h-fit w-1/2 hover:bg-white hover:text-green-500 flex justify-center items-center gap-2 transition-all"
              onClick={(e) => refreshTickets()}
            >
              Rafraichir
              <ArrowPathIcon className={`h-6 w-6 ${loading && 'animate-spin'}`} />
            </button>
            <div className="text-white min-h-fit grid grid-cols-1 gap-4" >
              {tickets &&
                tickets
                  .slice()
                  .sort((a, b) => new Date(b.scannedAt) - new Date(a.scannedAt))
                  .map((ticket, index) => {
                    return (
                      <TicketDashboard
                        key={index}
                        ticketData={ticket}
                        refreshTickets={refreshTickets}
                        loading={loading}
                        setLoading={(e) => setLoading(e)}

                      />
                    );
              })}
            </div>
          </div>
        )}
        <AnimatePresence>
          {isFooterVisible && (
            <m.div
              className={`fixed ${styles.padding} bottom-0 w-full left-1 right-1 gradientDashboardBottom z-50 flex justify-center items-center`}
              viewport={{ root: ticketsScrollRef }}
              initial={{ opacity: 1}}
              animate={{ opacity: 1}}
              exit={{opacity: 0}}
            >
              <UserAccountNav sessionId={sessionId} startedHour={startedHour} />
            </m.div>
          )}
        </AnimatePresence>
      </div>
      <div className="text-center py-4" ref={ticketsScrollRef}>
        <p className="text-white">Nestor App 🇫🇷</p>
      </div>
    </div>
  );
};

export default DashboardLogged;
