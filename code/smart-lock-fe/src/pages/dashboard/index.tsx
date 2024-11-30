'use client'
import { useState } from "react"

import DHTStatus from "@/components/status/dht-status"
import LockStatus from "@/components/status/lock-status"
import NightLightStatus from "@/components/status/night-light-status"

export default function DashboardPage() {
  const [nightLight, setNightLight] = useState<boolean>(false)

  const handleNightLightChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setNightLight(checked);
  };
  
  return (
    <div className="flex flex-col justify-center items-start gap-16 px-4 py-8 w-full text-primary">
      <h1 className="w-full font-semibold text-2xl text-center md:text-3xl">Dashboard</h1>
      <div className="gap-5 grid grid-cols-2 mx-auto w-full max-w-lg" >
        {/* Lock Status */}
        <div className="col-span-full">
          <LockStatus status={true} />
        </div>

        {/* Temperature */}
        <DHTStatus type="Temperature" num={20} />

        {/* Humidity */}
        <DHTStatus type="Humidity" num={20} />

        {/* Light Section */}
        <div className="col-span-full">
          <NightLightStatus status={nightLight} handleChange={handleNightLightChange}/>
        </div>
      </div>
    </div>
  )
}