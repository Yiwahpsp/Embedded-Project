import Image from "next/image"
import { Log } from "@/interfaces/log"
import { formatDate, formatTime } from "@/utils/date-time-utils"
import Link from "next/link"
export default function LogCard({
  info
}: {
  info: Log
}) {
  return (
    <Link
      className="flex flex-row justify-start items-center gap-4 border-1 border-panorama-blue p-4 border rounded-xl w-full transition-all duration-300 ease-in-out"
      href={`/log/${info.logId}`}
    >
      {
        !info.faceImage ?
          <Image
            src={''}
            alt=""
            width={200}
            height={200}
            className="rounded-lg w-1/3 max-w-32 aspect-square"
          />
          :
          <div className="bg-primary rounded-lg w-1/3 max-w-32 aspect-square">
          </div>
      }
      <div className="flex flex-col flex-grow justify-start items-start gap-1 h-full">
        <div className="flex flex-row justify-start items-center gap-2 w-full">
          <p className="font-semibold text-base sm:text-lg">Status:</p>
          {
            info.status ?
              <div className="bg-success px-2 py-1 rounded-lg w-20 text-center text-secondary text-sm sm:text-base">Success</div>
              : <div className="bg-danger px-2 py-1 rounded-lg w-20 text-center text-secondary">Fail</div>
          }
        </div>
        {
          info.status ?
            <div className="flex flex-row justify-start items-center gap-2 w-full">
              <p className="font-semibold text-base sm:text-lg">Scanner:</p>
              <p className="text-sm sm:text-base">{info.fingerprintId}</p>
            </div>
            : null
        }
        <div className="flex flex-row justify-start items-center gap-2 w-full">
          <p className="font-semibold text-base sm:text-lg">Date:</p>
          <p className="text-sm sm:text-base">{formatDate(info.timestamp.toString())}</p>
        </div>
        <div className="flex flex-row justify-start items-center gap-2 w-full">
          <p className="font-semibold text-base sm:text-lg">Timestamp:</p>
          <p className="text-sm sm:text-base">{formatTime(info.timestamp.toString())}</p>
        </div>
      </div>
    </Link>
  )
}