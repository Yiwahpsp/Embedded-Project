'use client'
import { useState } from "react"
import { useEffect } from 'react';
import DHTStatus from "@/components/status/dht-status"
import LockStatus from "@/components/status/lock-status"
import NightLightStatus from "@/components/status/night-light-status"

import {getTemp} from '@/pages/api/get-temp'
import { getHumid } from "../api/get-humid";

export default function DashboardPage() {
  const [nightLight, setNightLight] = useState<boolean>(false)
  const [temperature, setTemperature] = useState<number>(0);
  const [Humidity, setHumidity] = useState<number>(0);
  const handleNightLightChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setNightLight(checked);
  };

    const fetchTemperature = async () => {
      const tempData = await getTemp();
      if (tempData) {
        setTemperature(tempData);  // Set the temperature value returned from getTemp
      }else {
        setTemperature(0);
      }
    };

    const fetchHumidity = async () => {
      const humidData = await getHumid();
      if (humidData) {
        setHumidity(humidData);  // Set the temperature value returned from getTemp
      }else {
        setHumidity(0);
      }
    };

  useEffect(() => {
    fetchTemperature();
    fetchHumidity();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTemperature();
      fetchHumidity();
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col justify-center items-start gap-16 px-4 py-8 w-full text-primary">
      <h1 className="w-full font-semibold text-2xl text-center text-oxford-blue md:text-3xl">Dashboard</h1>
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



