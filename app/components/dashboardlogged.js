"use client"

import { PlayCircleIcon, ChevronDoubleDownIcon } from "@heroicons/react/20/solid";
import StartingHour from "./startinghour";
import TimeCounter from "./timecounter";
import styles from "./style";
import style from "../startbutton.module.css";
import { useState, useEffect } from "react";
import UserAccountNav from "./useraccountnav";
import axios from "axios";


const DashboardLogged = ({siteName, sessionId, userName}) => {

  const [startedHour, setStartedHour] = useState(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [restaurantId, setRestaurantId] = useState(null);

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
      setStartedHour(response.data.startedAt)
    } catch(error) {
      console.log('patch session failed', error.message)
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }

  const getTicketsOfSession = async () => {
    console.log(restaurantId, startedHour);
    try {
      const apiUrl = `${window.location.protocol}//${window.location.host}`;
      const response = await axios.get(`${apiUrl}/api/ticketsforvalet`,
        { params: { restaurantId: restaurantId, startDate: startedHour } }
      );
      console.log("voila vos tickets", response.data);
    } catch (error) {
      console.log('Error fetching tickets:', error.message);
    }
  }

  const updateTicketImmatriculation = async (ticketId, immatriculation) => {
    setLoading(true);
    try {
      const response = await axios.patch(`/api/ticket/${ticketId}`, {
        immatriculation: immatriculation,
      });
      console.log("la plaque d'immatriculation update !", response);
    } catch(error) {
      console.log('patch ticket failed', error.message)
    } 
    setLoading(false);
  }

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
        console.log('Error fetching user:', error.message);
      }
      if (sessionData && sessionData.startedAt) {
        setSessionStarted(true);
        setStartedHour(sessionData.startedAt);
        setRestaurantId(sessionData.restaurantId);
      };
    }
    getSessionData();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [])
  
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  return (
    <div className='bg-black h-full w-full text-white'>
      <div className={`fixed top-0 gradientTop w-full ${styles.padding} z-50`}>
        <h2 className={`${styles.subText}`}>Bon courage,</h2>
        <h2 className={`${styles.headText}`}>{userName} 🚗</h2>
      </div>
      <div className={`flex flex-col ${styles.padding} justify-center h-full`}>
        <div className={`flex flex-col justify-center h-screen`}>
          {loading ? (
            <div className="animate-pulse bg-gray-400/50 rounded-md w-fit mx-auto h-fit mb-5" style={{ animationDelay: `${1 * 0.05}s`, animationDuration: "1s"}}>
              <h3 className="invisible text-[40px] text-center py-4 font-semibold">
                <TimeCounter startingHour={startedHour} sessionStarted={sessionStarted} setLoading={(e) => setLoading(e)} />
              </h3>
            </div>
          ) : (
            <h3 className='text-[40px] text-center py-4 font-semibold'>
              <TimeCounter startingHour={startedHour} sessionStarted={sessionStarted} setLoading={(e) => setLoading(e)} />
            </h3>
          )}
          {loading ? (
              <div className="animate-pulse bg-gray-400/50 rounded-full w-fit mx-auto" style={{ animationDelay: `${2 * 0.05}s`, animationDuration: "1s"}}>
                <button onClick={(e) => startSession(e)} className={`${style.startButton} invisible`}>
                  <p>Démarrer la session</p>
                  <PlayCircleIcon />
                </button>
              </div>
            ) : (
            sessionStarted ? (
              <div className="flex flex-col justify-center items-center gap-16">
                <div>
                  <StartingHour startingHour={startedHour} />
                  <p className='text-center py-2'>Vous êtes au <span className='italic'>{siteName}</span></p>
                </div>
                <button className="w-16 h-16 linearBackground rounded-full animate-bounce flex items-center justify-center" onClick={(e) => scrollToBottom()}>
                  <ChevronDoubleDownIcon classsName="w-8 h-8 text-white" />
                </button>
              </div>
            ) : (
              <button onClick={(e) => startSession(e)} className={style.startButton}>
                <p>Démarrer la session</p>
                <PlayCircleIcon />
              </button>
            )
          )}
        </div>
        <div className="text-white h-full min-h-screen flex flex-col justify-between">

          <p className="text-4xl">coucou</p>
          <p className="text-4xl">coucou</p>
          <p className="text-4xl">coucou</p>
          <p className="text-4xl">coucou</p>
          <p className="text-4xl">coucou</p>
        </div>
        <div className={`fixed ${styles.padding} bottom-0 w-full left-1 right-1 gradientDashboardBottom z-50 flex justify-center items-center`}>
          <UserAccountNav sessionId={sessionId} startedHour={startedHour} />
        </div>
        <div className="text-center">
          <p className="text-white">Nestor App 🇫🇷</p>
        </div>
      </div>
    </div>
  )
};

export default DashboardLogged;