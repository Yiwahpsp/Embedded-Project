'use client'
import { useState } from 'react'
import Button from '@/components/button'
import LockStatus from '@/components/lock-status'
import LogCard from '@/components/log-card'
import { Log } from '@/interfaces/log';
import Status from "@/components/status"
import SimpleBottomNavigation from '@/components/narvigationbar'
import NightLightToggle from '@/components/nightlightstetus'

export default function Home() {
  const mockLogs: Log[] = [
    {
      logId: "1",
      fingerprintId: "fp123",
      faceImage: "face1.png",
      status: true,
      timestamp: new Date("2023-11-01T10:00:00Z"),
    },
    {
      logId: "2",
      fingerprintId: "fp456",
      faceImage: "face2.png",
      status: false,
      timestamp: new Date("2023-11-02T11:00:00Z"),
    },
    {
      logId: "3",
      fingerprintId: "fp789",
      faceImage: "face3.png",
      status: true,
      timestamp: new Date("2023-11-03T12:00:00Z"),
    },
  ];
  return (
    <div className="">
      <h1 className="">Create Your Account</h1>
      <div className='flex flex-col gap-1'>
        <p>test component dai na</p>
        <p>you can using mi component for easy life and fast work</p>
        <Button variant='' wFull>Primary</Button>
        <Button variant='secondary' wFull>Secondary</Button>
        <Button variant='danger' wFull>Danger</Button>
        <LockStatus status={true}/>
        <LockStatus status={false}/>
        <LockStatus />
        {
          mockLogs.map((log:Log)=>(
            <LogCard key={log.logId} info={log}/>
          ))
        }
         { /*example of status */ }
        {/* <Status type='Temp' num= {12}/>
        <Status type='Humidity' num = {18}/> */}
       < NightLightToggle/>
        <SimpleBottomNavigation/> 
      </div>
      
    </div>
  )
}