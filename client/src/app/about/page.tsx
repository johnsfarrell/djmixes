/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This is the about page. About how to use the DJMixes app.
 */

"use client";

/**
 * The about page component displays information about how to use the DJMixes app.
 */
export default function AboutPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-8">
      <h1 className="text-4xl font-bold text-white mb-4">About</h1>
      <p>
        This is our DJmixes application. This application is helpful for DJs
        trying to share and discover new mixes. It comes with features sepcific
        to mixes, and even a studio mode for editting existing mixes. Below are
        helpful instructions for using the DJMixes application.
      </p>
      <h2 className="text-3xl font-bold text-white mb-4 mt-8">
        Creating an Account
      </h2>
      <p>
        To get started, you can <a href="/register">create an account</a>. You
        must provide a username, email, and password.
      </p>
      <p>
        If you have an account or once you have created an account, you can{" "}
        <a href="/login">login</a>.
      </p>
      <h2 className="text-3xl font-bold text-white mb-4 mt-8">
        Uploading and Listening to a Mix
      </h2>
      <p>
        Once you have an account, you can <a href="/mix/new">upload a mix</a>.
        You must provide a title, cover art, and audio for you mix. As well, you
        can choose accessibility settings such as privacy, downloadability, and
        tags.
      </p>
      <p>
        Once you have uploaded a mix, you will be redirected to the mix's
        specific page. That page is shareable and can be accessed by anyone.
        Once your mix has been processed by our algorithm, stem and split
        details will be shared there as well.
      </p>
      <p>
        Once you've uploaded a mix, you can listen to it on the mix page. You
        can also like and comment on the mix.
      </p>
      <h2 className="text-3xl font-bold text-white mb-4 mt-8">Studio 🪄</h2>
      <p>
        Once a mix has been processed by the algorithm, you can access the
        studio page. The studio allows you to edit the mix in-place, changing
        volume and arrangements of stems. This an experimental feature to help
        DJs improve their mixes.
      </p>
    </div>
  );
}
