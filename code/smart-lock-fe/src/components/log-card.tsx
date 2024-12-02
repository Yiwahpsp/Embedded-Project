import Image from "next/image"
import { Log } from "@/interfaces/log"
import { formatDate, formatTime } from "@/utils/date-time-utils"
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export default function LogCard({
  info
}: {
  info: Log
}) {
  return (
    <div
      className="flex flex-row justify-start items-center gap-5 border-1 border-primary p-4 border rounded-xl w-full transition-all duration-300 ease-in-out"
    >
      {
        info.success ?
          (
            <>
              <LockOpenIcon className='md:scale-125' sx={{ fontSize: 72 }} />
            </>
          ) : (
            <>
              <LockIcon className='md:scale-125' sx={{ fontSize: 72 }} />
            </>
          )}
      <div className="flex flex-col flex-grow justify-start items-start gap-1 h-full">
        <div className="flex flex-row justify-start items-center gap-2 w-full">
          <p className="font-semibold text-base md:text-lg">Status:</p>
          {
            info.success ?
              <div className="bg-success px-2 py-1 rounded-lg w-20 text-center text-secondary text-sm md:text-base">Success</div>
              : <div className="bg-danger px-2 py-1 rounded-lg w-20 text-center text-secondary">Fail</div>
          }
        </div>
        {/* {
          info.success ?
            <div className="flex flex-row justify-start items-center gap-2 w-full">
              <p className="font-semibold text-base md:text-lg">Scanner:</p>
              <p className="text-sm md:text-base">{info.}</p>
            </div>
            : null
        } */}
        <div className="flex flex-row justify-start items-center gap-2 w-full">
          <p className="font-semibold text-base md:text-lg">Date:</p>
          <p className="text-sm md:text-base">{formatDate(info.timestamp)}</p>
        </div>
        <div className="flex flex-row justify-start items-center gap-2 w-full">
          <p className="font-semibold text-base md:text-lg">Timestamp:</p>
          <p className="text-sm md:text-base">{formatTime(info.timestamp)}</p>
        </div>
      </div>
    </div>
  )
}