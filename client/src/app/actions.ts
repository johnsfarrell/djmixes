/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains common actions that can be used across the
 * application.
 */
'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Logs the user out by deleting the auth token cookie and redirecting to the
 * login page.
 */
export async function logout(): Promise<void> {
  (await cookies()).delete('auth-token'); // Delete the auth token cookie
  redirect('/login');
}