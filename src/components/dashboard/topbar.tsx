"use client";

import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function Topbar() {
  const { data: sessionData } = useSession();

  console.log("Session: ", sessionData);

  return (
    <div className="sticky top-0 border-b border-border h-24 px-12 flex justify-between items-center bg-white">
      {/* Logo Section */}
      <div className="flex items-center space-x-5">
        <Image
          src={"/images/logo.png"}
          alt="Witklip Farm Logo"
          width={1000}
          height={900}
          className="object-contain w-24 aspect-4/3"
        />
        <div className="">
          <h1 className="text-2xl font-bold">Witklip</h1>
          <p>BBBEE-Compliant Agricultural Management</p>
        </div>
      </div>
      <div className="flex items-center h-full">
        <div className="border-l-2 pl-4">
          {sessionData?.user && (
            <div className="">
              <h3>{sessionData.user.name}</h3>
              <p>{sessionData.user.role}</p>
            </div>
          )}
        </div>
        <div
          onClick={() => signOut()}
          className="border-2 h-12 w-16 flex items-center justify-center ml-3 rounded-lg cursor-pointer"
        >
          <LogOut />
        </div>
      </div>
    </div>
  );
}
