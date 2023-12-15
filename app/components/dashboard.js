"use client"

import { PlayCircleIcon } from "@heroicons/react/20/solid";
import StartingHour from "./startinghour";
import TimeCounter from "./timecounter";
import styles from "./style";
import style from "../startbutton.module.css";
import { useState, useEffect } from "react";
import UserAccountNav from "./useraccountnav";
import axios from "axios";


const DashboardLogged = ({siteName, sessionId}) => {

  const [startedHour, setStartedHour] = useState(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [restaurantId, setRestaurantId] = useState(null);
  const [tickets, setTickets] = useState(null);

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
      setRestaurantId(response.data.restaurantId)
      setSessionStarted(true);
    } catch(error) {
      console.log('patch session failed', error.message)
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }

  const getTicketsOfSession = async (e) => {
    e.preventDefault();
    console.log(restaurantId, startedHour);
    try {
      const apiUrl = `${window.location.protocol}//${window.location.host}`;
      const response = await axios.get(`${apiUrl}/api/ticketsforvalet`,
        { params: { restaurantId: restaurantId, startDate: startedHour } }
      );
      setTickets(response.data.tickets);
      console.log("voila vos tickets", response.data.tickets);
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
        console.log("id du restaurant", sessionData.restaurantId);
      };
    }
    getSessionData();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [])


  return (
    <>
      <div className={styles.subText}>
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
            <div>
              <StartingHour startingHour={startedHour} />
              <p className='text-center py-2'>Vous êtes au <span className='italic'>{siteName}</span></p>
              <button onClick={(e) => getTicketsOfSession(e)} className={style.startButton}>
                <p>Obtenir les tickets</p>
                <PlayCircleIcon />
              </button>
              {tickets && (
                tickets.map((ticket, index) => (
                  <div key={index} className="flex flex-col items-center text-white">
                    <p className="text-center py-2">Ticket {ticket.ticketNumber}</p>
                    <div className="flex flex-col items-center">
                      <p className="text-center py-2">Immatriculation</p>
                      <input type="text" className="border-2 border-gray-400 rounded-md w-40 text-center text-black" defaultValue={ticket.immatriculation} onBlur={(e) => updateTicketImmatriculation(ticket.id, e.target.value)} />
                    </div>
                  </div>
                ))
              )} 
            </div>
          ) : (
            <button onClick={(e) => startSession(e)} className={style.startButton}>
              <p>Démarrer la session</p>
              <PlayCircleIcon />
            </button>
          )
        )}
      </div>
      <div>
        <UserAccountNav sessionId={sessionId} startedHour={startedHour} />
      </div>
    </>
  )
};

export default DashboardLogged;
