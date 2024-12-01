'use client'
import { useState } from "react"
import { useEffect } from 'react';
import DHTStatus from "@/components/status/dht-status"
import LockStatus from "@/components/status/lock-status"
import NightLightStatus from "@/components/status/night-light-status"
import {getTemp} from '@/pages/api/gettmp'
import { getHumid } from "../api/getHumid";

export default function DashboardPage() {
  const [nightLight, setNightLight] = useState<boolean>(false)
  const [temperature, setTemperature] = useState<number | null>(null);
  const [Humidity, setHumidity] = useState<number | null>(null);
  const handleNightLightChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setNightLight(checked);
  };

  

  useEffect(() => {
    const fetchTemperature = async () => {
      const tempData = await getTemp();
      if (tempData != null) {
        setTemperature(tempData);  // Set the temperature value returned from getTemp
      }else {
        setTemperature(0);
      }
    };

    fetchTemperature();
  }, []);

  useEffect(() => {
    const fetchHumidity = async () => {
      const tempData = await getHumid();
      if (tempData != null) {
        setHumidity(tempData);  // Set the temperature value returned from getTemp
      }else {
        setHumidity(0);
      }
    };

    fetchHumidity();
  }, []);
  
  return (
    <div className="flex flex-col justify-center items-start gap-16 px-4 py-8 w-full text-primary">
      <h1 className="w-full font-semibold text-2xl text-center md:text-3xl text-oxford-blue">Dashboard</h1>
      <div className="gap-5 grid grid-cols-2 mx-auto w-full max-w-lg" >
        {/* Lock Status */}
        <div className="col-span-full">
          <LockStatus status={true} />
        </div>

        {/* Temperature */}
        <DHTStatus type="Temperature" num={temperature? temperature: 0} />

        {/* Humidity */}
        <DHTStatus type="Humidity" num={Humidity?  Humidity : 0} />

        {/* Light Section */}
        <div className="col-span-full">
          <NightLightStatus status={nightLight} handleChange={handleNightLightChange}/>
        </div>
      </div>
    </div>
  )
}



