/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the registration page component that renders
 * the registration form, handles form submission, and redirects the user to the
 * home page upon successful registration.
 */

"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/Auth/AuthCard";
import AuthInput from "@/components/Auth/AuthInput";
import { createProfile, register } from "@/app/api/api";

/**
 * The register page component renders the registration form, handles form
 * submission, and redirects the user to the home page upon successful
 * registration.
 * @returns The register page component
 */
export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const username = e.currentTarget.username.value;
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const confirmPassword = e.currentTarget.confirmPassword.value;
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    try {
      // Call the register API endpoint
      const res = await register(username, email, password);
      const resBody = await res.json();
      if (res.ok && resBody.user_id) {
        localStorage.setItem("userId", resBody.user_id);
        await createProfile(resBody.user_id);
        router.push("/");
      } else {
        const data = await res.json();
        setError(data.error);
        setIsLoading(false);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create an account"
      subtitle="Start sharing your mixes with the world"
    >
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-md">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        <AuthInput
          label="DJ Name"
          name="username"
          type="text"
          placeholder="Your DJ name"
          required
        />

        <AuthInput
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />

        <AuthInput
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
        />

        <AuthInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white text-gray-900 py-2 px-4 rounded-md font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-white hover:text-gray-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
