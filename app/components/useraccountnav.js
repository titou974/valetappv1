'use client';
import { signOut } from "next-auth/react";
import LoadingModal from "@/app/components/loadingmodal";
import { useState } from "react";
import axios from "axios";

const UserAccountNav = ({sessionId}) => {
  const [loading, setLoading] = useState(false);
    const handleSignOut = async e => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await axios.patch(`/api/session/${sessionId}`, {
          endAt: new Date(),
        });
        console.log("voilà la réponse du patch", response);
      } catch(error) {
        console.log('patch session failed')
      } finally {
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`
        })
      }
    };


  return (
    <>
      <button onClick={handleSignOut} className="bg-primary w-full py-3 rounded-full flex items-center justify-center gap-3 hover:bg-white transition-colors bottom-28">
        <p className="text-black font-semibold text-[32px]">J&apos;ai Terminé</p>
        <div className="w-[26px] text-black">
          <svg width="38" height="39" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.0049 38.0769H24.7639C16.5331 38.0769 12.566 34.8327 11.8801 27.5659C11.8059 26.8058 12.3621 26.1199 13.1407 26.0458C13.8822 25.9716 14.5866 26.5463 14.6608 27.3064C15.1984 33.1273 17.942 35.2962 24.7825 35.2962H25.0235C32.5684 35.2962 35.2378 32.6267 35.2378 25.0818V12.9951C35.2378 5.45014 32.5684 2.78068 25.0235 2.78068H24.7825C17.9049 2.78068 15.1613 4.98669 14.6608 10.9188C14.5681 11.6789 13.9193 12.2535 13.1407 12.1794C12.3621 12.1238 11.8059 11.4379 11.8616 10.6778C12.4918 3.29975 16.4775 0 24.7639 0H25.0049C34.107 0 38 3.89296 38 12.9951V25.0818C38 34.1839 34.107 38.0769 25.0049 38.0769Z" fill="black"/>
          <path d="M24.5574 20.4288H3.46139C2.70133 20.4288 2.07104 19.7985 2.07104 19.0385C2.07104 18.2784 2.70133 17.6481 3.46139 17.6481H24.5574C25.3175 17.6481 25.9478 18.2784 25.9478 19.0385C25.9478 19.7985 25.3175 20.4288 24.5574 20.4288Z" fill="black"/>
          <path d="M7.5959 26.6392C7.24368 26.6392 6.89146 26.5094 6.61339 26.2313L0.403199 20.0211C-0.1344 19.4836 -0.1344 18.5937 0.403199 18.0561L6.61339 11.8459C7.15099 11.3083 8.04081 11.3083 8.57841 11.8459C9.11601 12.3835 9.11601 13.2733 8.57841 13.8109L3.35072 19.0386L8.57841 24.2663C9.11601 24.8039 9.11601 25.6937 8.57841 26.2313C8.31888 26.5094 7.94812 26.6392 7.5959 26.6392Z" fill="black"/>
          </svg>
        </div>
        <LoadingModal isOpen={loading} setIsOpen={(e) => setLoading(e)} title="Fin de votre session" />
      </button>
    </>
  )
};

export default UserAccountNav;
