'use client';

import React from 'react'

type Props = {
  onClose: () => void;
}

const PremiumModal = ({ onClose }: Props) => {
  return (
    <div
      className="relative z-40"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-all backdrop-blur-sm"></div>
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-12 text-center ">
          <div className="relative w-[450px] sm:w-[450px] my-auto rounded-2xl bg-gray-800 text-slate-100 text-left shadow-xl transition-all z-50">
            <div className="px-5 py-4 flex flex-col items-center justify-center">
              <span className="close-button" onClick={onClose}>
                &times;
              </span>
              <h2>Premium Content</h2>
              <p>This is some premium content.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PremiumModal