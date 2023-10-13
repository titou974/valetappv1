"use client"

import styles from "../../../components/style";
import Link from "next/link";
import Input from "../../../components/inputvalet";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


const Register = ({params}) => {
  const router = useRouter();
  const handleRegister = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/ticket", {
        role: "CLIENT",
        restaurant: params.id
      });
      console.log(response);
      const data = await response.data
      if (data.ticketId) {
        router.push(`/ticket/${data.ticketId}`)
      }
    } catch(error) {
      console.log("creation of Ticket failed")
    }
  }
  return (
    <div className="w-full h-screen bg-secondary">
      <div className={`${styles.padding} flex flex-col justify-between h-full`}>
        <div>
          <h3 className={styles.subTextBlack}>Créer</h3>
          <h2 className={styles.headTextBlack}>votre Ticket 🅿️</h2>
        </div>
        <div href="/" className="mb-10">
          <button onClick={handleRegister} className="bg-tertiary w-full py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors text-white">
            <p className="font-semibold text-[26px]">Créer votre ticket</p>
            <div className="w-[26px]">
              <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register;
