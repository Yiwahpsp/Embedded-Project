import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import { useRouter } from 'next/navigation';
export default function LockStatus({
  status
}: {
  status?: boolean
}) {
  const router = useRouter();
  let style = "";

  if (status === undefined) {
    style = "text-panorama-blue bg-ambrosia-ivory";
  } else if (status) {
    style = "text-panorama-blue bg-ambrosia-ivory";
  } else if (!status) {
    style = "text-ambrosia-ivory bg-panorama-blue";
  }

  return (
    <button
      className={`flex flex-col h-52 md:h-60 justify-between items-start border-1 border-panorama-blue p-4 border rounded-xl w-full overflow-hidden ${style} transition-all duration-300 ease-in-out`}
      onClick={() => router.push("/lock")}
    >
      {status !== undefined ? (
        <div className="flex flex-col flex-wrap justify-start items-start gap-1 w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <p className="line-clamp-1 font-semibold text-pretty text-xl md:text-2xl">Name</p>
            <ReportGmailerrorredIcon className='md:scale-125' sx={{ fontSize: 24 }} />
          </div>
          <div className="flex flex-row justify-start items-end gap-1">
            <LocationOnIcon className='md:scale-125' sx={{ fontSize: 24 }} />
            <p className="line-clamp-1 text-base text-pretty md:text-lg">location</p>
          </div>
        </div>
      ) : null}

      {/* Lock icon div with height control */}
      <div className="flex flex-col flex-1 justify-center items-center gap-1 w-full max-h-full font-semibold text-lg md:text-xl">
        {status === undefined ? (
          <>
            <EnhancedEncryptionIcon className='md:scale-125' sx={{ fontSize: 72 }} />
            <p>Add Your Lock</p>
          </>
        ) : status ? (
          <>
            <LockIcon className='md:scale-125' sx={{ fontSize: 72 }} />
            <p>Locked</p>
          </>
        ) : (
          <>
            <LockOpenIcon className='md:scale-125' sx={{ fontSize: 72 }} />
            <p>Unlocked</p>
          </>
        )}
      </div>
    </button>
  );
}
