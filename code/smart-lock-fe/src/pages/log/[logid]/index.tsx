import { useRouter } from "next/navigation"
import Image from "next/image";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function LogPage() {
  const router = useRouter()
  return (
    <div className="flex flex-col justify-center items-start gap-16 px-4 py-8 w-full text-primary">
      <div className="relative flex flex-col w-full">
        <button
          className="top-0 left-0 absolute"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}>
          <KeyboardBackspaceIcon sx={{ fontSize: 24 }} />
        </button>
        <h1 className="w-full font-semibold text-2xl text-center md:text-3xl">Log</h1>
      </div>

      {/* Data */}
      <div className="flex flex-col justify-center items-start gap-8 mx-auto w-full max-w-sm">
        {
          false ?
            <Image
              src={''}
              alt=""
              width={200}
              height={200}
              className="rounded-lg w-full aspect-square"
            />
            :
            <div className="bg-primary rounded-lg w-full aspect-square">
            </div>
        }
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-row justify-start items-start gap-2 w-full">
            <p className="font-semibold text-base md:text-lg">Status:</p>
            <div className="bg-success px-2 py-1 rounded-lg w-20 text-center text-secondary text-sm md:text-base">Success</div>
          </div>
          <div className="flex flex-row justify-start items-start gap-2 w-full">
            <p className="font-semibold text-base md:text-lg">Scanner:</p>
            <p className="text-sm md:text-base">fp123</p>
          </div>
          <div className="flex flex-row justify-start items-start gap-2 w-full">
            <p className="font-semibold text-base md:text-lg">Date:</p>
            <p className="text-sm md:text-base">27 May 2024</p>
          </div>
          <div className="flex flex-row justify-start items-start gap-2 w-full">
            <p className="font-semibold text-base md:text-lg">Timestamp:</p>
            <p className="text-sm md:text-base">10:00:00</p>
          </div>
        </div>

      </div>
    </div>
  )
}