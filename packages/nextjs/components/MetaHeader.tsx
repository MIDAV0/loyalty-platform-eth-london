import React from "react";
import Head from "next/head";

// Images must have an absolute path to work properly on Twitter.
// We try to get it dynamically from Vercel, but we default to relative path.

export const MetaHeader = () => {
  return (
    <Head>
      <div className="flex flex-col h-screen justify-center items-center">
        <h1 className="text-6xl font-bold text-center mb-8">LLP</h1>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Button 1</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Button 2</button>
        </div>
      </div>
    </Head>
  );
};
