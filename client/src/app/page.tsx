import React, { useState } from 'react';
import CurrentMixDetails from '@/components/CurrentMixDetails/CurrentMixDetails';
import UserLibrary from '@/components/UserLibrary/UserLibrary';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-4">
          {/* Left column */}
          <div className="lg:col-span-3">
            <CurrentMixDetails />
          </div>

          {/* Middle column */}
          <div className="lg:col-span-6">
            <UserLibrary />
          </div>

          {/* Right column - TODO? */}
          {/* <div className="lg:col-span-3"> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};