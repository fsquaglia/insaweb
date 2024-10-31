"use client";
import { onClickSignOut } from "@/utils/OnSignOutEvent";
import { GiPowerButton } from "react-icons/gi";

import React from "react";

function SignOutComponent() {
  return (
    <div
      onClick={() => onClickSignOut()}
      className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex flex-row gap-2 cursor-pointer"
    >
      <GiPowerButton className="text-red-600 text-xl hover:text-white" />

      <span className="">LogOut</span>
    </div>
  );
}

export default SignOutComponent;
