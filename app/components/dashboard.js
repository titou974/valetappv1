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
      setLoading(true);
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
          setStartedHour(sessionData.startedAt);
          setLoading(false);
        }
        setLoading(false);
      };
      setLoading(false);
    }

    getSessionData();
    setLoading(false);
  }, [loading])


  return (
    <>
      <div className={styles.subText}>
        {loading ? (
          <div className="animate-pulse bg-gray-400/50 rounded-md w-fit mx-auto h-fit mb-5" style={{ animationDelay: `${1 * 0.05}s`, animationDuration: "1s"}}>
            <h3 className="invisible text-[40px] text-center py-4 font-semibold">
              00 : 00 : 00
            </h3>
          </div>
        ) : (
          <h3 className='text-[40px] text-center py-4 font-semibold'>
            <TimeCounter startingHour={startedHour} sessionStarted={sessionStarted} setLoading={(e) => setLoading(e)} />
          </h3>
        )}
        {loading ? (
            <div className="animate-pulse bg-gray-400/50 rounded-md w-fit mx-auto" style={{ animationDelay: `${2 * 0.05}s`, animationDuration: "1s"}}>
              <span className="invisible">
                <StartingHour startingHour={startedHour} />
                <p className='text-center py-2'>Vous êtes au <span className='italic'>{siteName}</span></p>
              </span>
            </div>
          ) : (
          sessionStarted ? (
            <div>
              <StartingHour startingHour={startedHour} />
              <p className='text-center py-2'>Vous êtes au <span className='italic'>{siteName}</span></p>
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
