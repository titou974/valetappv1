"use client"

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import InputTicket from './inputticket';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Button } from '@nextui-org/react';

const EmailModal = ({isOpen, setIsOpen, siteName, scannedAt, ticketPrice, ticketNumber, userId}) => {

  const [email, setEmail] = useState("");
  const [loadingEmail, setLoadingEmail ] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/  ;
    return emailRegex.test(email);
  };


  const handleSubmit = async (e) => {
    setLoadingEmail(true);
    if (!validateEmail(email)) {
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
      try {
        const response = await axios.patch(`/api/user/${userId}`, {
          email: email,
        });
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
        console.log("erreur de mail", error.message);
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
                    <Button radius="full" variant="bordered" color="success" onClick={(e) => handleSubmit(e)} isLoading={loadingEmail}>
                      Recevoir par e-mail
                    </Button>
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
