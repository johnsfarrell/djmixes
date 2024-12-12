/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the home page component that displays the
 * currently playing mix's details and user's library.
 */

'use client';
import React, { useEffect, useState } from 'react';
import CurrentMixDetails from '@/components/CurrentMixDetails/CurrentMixDetails';
import UserLibrary from '@/components/UserLibrary/UserLibrary';
import { GetMixResponse } from '@/app/api/types';
import { getMix } from '@/app/api/api';

/**
 * The home page component displays all the content on the home page, including
 * the currently playing mix's details and the user's library.
 * @returns The home page component
 */
export default function Home(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-900 p-4 pb-32">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-4">
          <div className="lg:col-span-9">
            <UserLibrary />
          </div>
        </div>
      </div>
    </div>
  );
}
