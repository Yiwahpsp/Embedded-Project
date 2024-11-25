import Button from '@/components/button'
import Status from "@/components/status"
import LockStatus from '@/components/LockStatus'
export default function Home() {
  return (
    <div className="">
      <h1 className="">Create Your Account</h1>
      <div className='flex flex-col gap-1'>
        <p>test component dai na</p>
        <p>you can using mi component for easy life and fast work</p>
        <Button variant='' wFull>Primary</Button>
        <Button variant='secondary' wFull>Secondary</Button>
        <Button variant='danger' wFull>Danger</Button>
         { /*example of status */ }
        {/* <Status type='Temp' num= {12}/>
        <Status type='Humidity' num = {18}/> */}
        <LockStatus type = 'lock' lockName='ชื่ออะไรดี' locklocation='บ้านแม่มึง'/>
        <LockStatus type = 'unlock' lockName='ชื่ออะไรดี' locklocation='บ้านแม่มึง'/>
        <LockStatus type = 'addlock' lockName='-' locklocation='-'/>

      </div>
    </div>
  )
}