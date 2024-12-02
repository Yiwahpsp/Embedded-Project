'use client'
import { useState } from "react"
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

import Button from "@/components/button";
import DHTStatus from "@/components/status/dht-status"
import LockStatus from "@/components/status/lock-status"
import NightLightStatus from "@/components/status/night-light-status"
import { auth, firestore } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";

import { getTemp } from '@/api/temperature'
import { getHumid } from "../../api/humidity";
import { getLockStatus } from "@/api/lock";
import { isDeviceConnected } from "@/api/is-device-connect";
import { SIGNIN_ROUTE } from "@/routes";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [unlockStatus, setUnlockStatus] = useState<boolean>(false);
  const [deviceConnected, setDeviceConnected] = useState<boolean>(false);
  const [temperature, setTemperature] = useState<number>(0);
  const [Humidity, setHumidity] = useState<number>(0);
  const router = useRouter();

  const fetchTemperature = async () => {
    const tempData = await getTemp();
    if (tempData) {
      setTemperature(tempData);  // Set the temperature value returned from getTemp
    } else {
      setTemperature(0);
    }
  };

  const fetchHumidity = async () => {
    const humidData = await getHumid();
    if (humidData) {
      setHumidity(humidData);  // Set the temperature value returned from getTemp
    } else {
      setHumidity(0);
    }
  };

  const fetchLockStatus = async () => {
    const lockState = await getLockStatus();
    if (lockState) {
      setUnlockStatus(lockState);
    } else {
      setUnlockStatus(false);
    }
  }

  const fetchDeviceConnection = async () => {
    const deviceConnection = await isDeviceConnected();
    setDeviceConnected(deviceConnection);
  }

  useEffect(() => {
    fetchDeviceConnection();
    if (!deviceConnected) return;
    fetchTemperature();
    fetchHumidity();
    fetchLockStatus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchDeviceConnection();
      if (!deviceConnected) return;
      fetchTemperature();
      fetchHumidity();
      fetchLockStatus();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-start gap-16 px-4 py-8 w-full text-primary">
      <h1 className="w-full font-semibold text-2xl text-center text-oxford-blue md:text-3xl">Dashboard</h1>
      <div className="gap-5 grid grid-cols-2 mx-auto w-full max-w-lg" >
        {
          !deviceConnected ?
            <p className="col-span-2 w-full text-danger text-sm italic">*Device is not connect</p>
            : null
        }
        {/* Lock Status */}
        <div className="col-span-full">
          <LockStatus status={!unlockStatus} />
        </div>

        {/* Temperature */}
        <DHTStatus type="Temperature" num={temperature ? temperature : 0} disabled={!deviceConnected} />

        {/* Humidity */}
        <DHTStatus type="Humidity" num={Humidity ? Humidity : 0} disabled={!deviceConnected} />

        {/* Light Section */}
        <div className="col-span-full">
          <NightLightStatus disabled={!deviceConnected} />
        </div>

        <div className="col-span-full">
          <Button variant="secondary" className="flex flex-col" disabled={!deviceConnected} wFull onClick={(e) => { e.preventDefault(); router.push("/dashboard/camera") }}>
            <p className="font-semibold text-base md:text-lg">
              Go to camera
            </p>
            <p className="text-panorama-blue text-xs">
              (same wifi with device)
            </p>
          </Button>
        </div>
      </div>
    </div>
  )
}



