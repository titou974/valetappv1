'use client';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

export default function SelectInput({ input, setInput, db, placeholder }) {
  return (
    <div className='w-full text-base'>
      <Listbox value={input} onChange={setInput}>
        <div className='relative mt-1'>
          <Listbox.Button className='relative w-full cursor-default rounded-full bg-white px-[20px] py-[12px] text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
            <span className='block truncate'>
              {input?.name || placeholder}
              <span>*</span>
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-[20px]'>
              {db?.map((site, siteIdx) => (
                <Listbox.Option
                  key={siteIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none px-[20px] py-2 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={site}
                >
                  {({ input }) => (
                    <>
                      <span
                        className={`block truncate ${
                          input ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {site.name}
                      </span>
                      {input ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
