import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

function LoadingModal({title, isOpen, setIsOpen}) {

  function closeModal() {
    setIsOpen(true)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
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
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Patientez quelques secondes...
                    </p>
                  </div>
                  <div className="mt-6">
                  <div class="flex-col gap-4 w-full flex items-center justify-center">
                    <div class="w-16 h-16 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="animate-ping" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.92857 0H1.07143C0.479911 0 0 0.479911 0 1.07143V8.92857C0 9.52009 0.479911 10 1.07143 10H8.92857C9.52009 10 10 9.52009 10 8.92857V1.07143C10 0.479911 9.52009 0 8.92857 0ZM5.35714 6.42857H4.28571V7.5C4.28571 7.69643 4.125 7.85714 3.92857 7.85714H3.21429C3.01786 7.85714 2.85714 7.69643 2.85714 7.5V2.5C2.85714 2.30357 3.01786 2.14286 3.21429 2.14286H5.35714C6.53795 2.14286 7.5 3.10491 7.5 4.28571C7.5 5.46652 6.53795 6.42857 5.35714 6.42857ZM5.35714 3.57143H4.28571V5H5.35714C5.75 5 6.07143 4.67857 6.07143 4.28571C6.07143 3.89286 5.75 3.57143 5.35714 3.57143Z" fill="#24A0ED"/>
                      </svg>
                    </div>
                  </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default LoadingModal;
