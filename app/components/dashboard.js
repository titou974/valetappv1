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
  const [loading, setLoading] = useState(false);

  const startSession = async (e) => {
    setLoading(true);
    e.preventDefault();
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
      setLoading(false);
    }
  }

  useEffect(() => {
    const getSessionData = async () => {
      let sessionData = {};
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(`${apiUrl}/api/session/${sessionId}`)
        sessionData = response.data;
        console.log(sessionData);
      } catch (error) {
        console.log('Error fetching user:', error.message);
      }
      if (sessionData) {
        if (sessionData.startedAt) {
          setSessionStarted(true);
          setStartedHour(sessionData.startedAt)
        }
      };
    }

    getSessionData()

  }, [])


  return (
    <>
      <div className={styles.subText}>
        <h3 className='text-[40px] text-center py-4 font-semibold'><TimeCounter startingHour={startedHour} sessionStarted={sessionStarted} /></h3>
        {sessionStarted ? (
          <div>
            <StartingHour startingHour={startedHour} />
            <p className='text-center py-2'>Vous êtes au <span className='italic'>{siteName}</span></p>
          </div>
        ) : (
          <button onClick={(e) => startSession(e)} className={style.startButton}>
            <p>Démarrer la session</p>
            <PlayCircleIcon />
          </button>
        )}
      </div>
      <div>
        <UserAccountNav sessionId={sessionId} startedHour={startedHour} />
      </div>
    </>
  )
};

export default DashboardLogged;
