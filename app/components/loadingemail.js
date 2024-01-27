"use client"

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import styles from './style';
import InputTicket from './inputticket';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const EmailModal = ({isOpen, setIsOpen, siteName, scannedAt, ticketPrice, ticketNumber, userId}) => {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [loadingEmail, setLoadingEmail ] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/  ;
    return emailRegex.test(email);
  };


  const handleSubmit = async (e) => {
    setLoadingEmail(true);
    if (!validateEmail(email)) {
      setEmailError(true);
      toast.error('Email Invalide', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setLoadingEmail(false);
      return null;
    } else {
      setEmailError(false);
      try {
        const response = await axios.patch(`/api/user/${userId}`, {
          email: email,
        });
        console.log(response);
      } catch (error) {
        console.log("sauvegarde de l'email fail", error)
      }
      try {
        const response = await axios.post("/api/sendticket", {
          email: email,
          siteName: siteName,
          scannedAt: scannedAt,
          ticketNumber: ticketNumber,
          ticketPrice: ticketPrice,
        });
        console.log("reponse de l'api email", response);
        toast.success("Votre ticket est arrivé dans votre boite mail !", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          closeModal();
        setLoadingEmail(false);
      } catch (error) {
        console.log("erreur de mail", error.message);7
        toast.error("Un bug à eu lieu lors de l'envoi de votre ticket...", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        setLoadingEmail(false);
      }
    }
  }



  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[20px] font-medium leading-6 text-gray-900"
                  >
                    Rentrer votre Email
                  </Dialog.Title>
                  <div className="mt-10">
                    <InputTicket input={email} setInput={(e) => setEmail(e)} />
                  </div>
                  <div className='mt-10 transition-all'>
                    {loadingEmail ? (
                      <div className="w-16 h-16 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full mx-auto">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="animate-ping" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.92857 0H1.07143C0.479911 0 0 0.479911 0 1.07143V8.92857C0 9.52009 0.479911 10 1.07143 10H8.92857C9.52009 10 10 9.52009 10 8.92857V1.07143C10 0.479911 9.52009 0 8.92857 0ZM5.35714 6.42857H4.28571V7.5C4.28571 7.69643 4.125 7.85714 3.92857 7.85714H3.21429C3.01786 7.85714 2.85714 7.69643 2.85714 7.5V2.5C2.85714 2.30357 3.01786 2.14286 3.21429 2.14286H5.35714C6.53795 2.14286 7.5 3.10491 7.5 4.28571C7.5 5.46652 6.53795 6.42857 5.35714 6.42857ZM5.35714 3.57143H4.28571V5H5.35714C5.75 5 6.07143 4.67857 6.07143 4.28571C6.07143 3.89286 5.75 3.57143 5.35714 3.57143Z" fill="#24A0ED"/>
                        </svg>
                      </div>
                    ) : (
                      <button onClick={(e) => handleSubmit(e)} className='rounded-full py-4 bg-tertiary w-full text-white font-semibold flex justify-center gap-2 stroke-white hover:stroke-black hover:text-black hover:bg-white transition-all'>
                        <p>Recevoir mon ticket</p>
                        <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.75 23.25H8.25C4.5 23.25 2 21.375 2 17V8.25C2 3.875 4.5 2 8.25 2H20.75C24.5 2 27 3.875 27 8.25V17C27 21.375 24.5 23.25 20.75 23.25Z" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M20.75 8.875L16.8375 12C15.55 13.025 13.4375 13.025 12.15 12L8.25 8.875" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
};

export default EmailModal;
