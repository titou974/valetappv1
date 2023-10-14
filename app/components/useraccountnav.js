'use client';
import { signOut } from "next-auth/react";

const UserAccountNav = () => {


  return (
    <>
      <button onClick=
      {() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/sign-in`
      })}
        className="bg-primary w-full py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors bottom-28">
        <p className="text-black font-semibold text-[32px]">J&apos;ai Terminé</p>
        <div className="w-[26px] text-black">
          <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </button>
    </>
  )
};

export default UserAccountNav;
