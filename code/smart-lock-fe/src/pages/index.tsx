import Button from '@/components/button'
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
      </div>
    </div>
  )
}