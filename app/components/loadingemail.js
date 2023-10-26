"use client"

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import styles from './style';
import InputTicket from './inputticket';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const EmailModal = ({isOpen, setIsOpen, siteName, scannedAt, ticketPrice}) => {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/  ;
    return emailRegex.test(email);
  };


  const handleSubmit = async (e) => {
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
      return null;
    } else {
      setEmailError(false);
      try {
        const response = await post("/api/sendticket", {
          email: email,
          siteName: siteName,
          scannedAt: scannedAt,
          ticketPrice: ticketPrice,
        });
        console.log("reponse de l'api email", response);
      } catch (error) {
        console.log("erreur de mail", error.message);
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
                  <div className='mt-10'>
                    <button onClick={(e) => handleSubmit(e)} className='rounded-full py-4 bg-tertiary w-full text-white font-semibold flex justify-center gap-2 stroke-white hover:stroke-black hover:text-black hover:bg-white transition-all'>
                      <p>Recevoir mon ticket</p>
                      <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.75 23.25H8.25C4.5 23.25 2 21.375 2 17V8.25C2 3.875 4.5 2 8.25 2H20.75C24.5 2 27 3.875 27 8.25V17C27 21.375 24.5 23.25 20.75 23.25Z" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M20.75 8.875L16.8375 12C15.55 13.025 13.4375 13.025 12.15 12L8.25 8.875" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
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
