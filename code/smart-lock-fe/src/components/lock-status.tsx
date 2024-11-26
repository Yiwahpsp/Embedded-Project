import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';

export default function LockStatus({ status }: { status?: boolean }) {
  let style = "";

  if (status === undefined) {
    style = "text-panorama-blue bg-ambrosia-ivory";
  } else if (status) {
    style = "text-panorama-blue bg-ambrosia-ivory";
  } else if (!status) {
    style = "text-ambrosia-ivory bg-panorama-blue";
  }

  return (
    <div
      className={`flex flex-col h-52 sm:h-60 justify-between items-start border-1 border-panorama-blue p-4 border rounded-xl w-full overflow-hidden ${style} transition-all duration-300 ease-in-out`}
    >
      {status !== undefined ? (
        <div className="flex flex-col flex-wrap justify-start items-start gap-1 w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <p className="line-clamp-1 font-semibold text-pretty text-xl sm:text-2xl">Name</p>
            <ReportGmailerrorredIcon className='sm:scale-125' sx={{ fontSize: 24 }} />
          </div>
          <div className="flex flex-row justify-start items-end gap-1">
            <LocationOnIcon className='sm:scale-125' sx={{ fontSize: 24 }} />
            <p className="line-clamp-1 text-base text-pretty sm:text-lg">location</p>
          </div>
        </div>
      ) : null}

      {/* Lock icon div with height control */}
      <div className="flex flex-col flex-1 justify-center items-center gap-1 w-full max-h-full font-semibold text-lg sm:text-xl">
        {status === undefined ? (
          <>
            <EnhancedEncryptionIcon className='sm:scale-125' sx={{ fontSize: 72 }} />
            <p>Add Your Lock</p>
          </>
        ) : status ? (
          <>
            <LockIcon className='sm:scale-125' sx={{ fontSize: 72 }} />
            <p>Locked</p>
          </>
        ) : (
          <>
            <LockOpenIcon className='sm:scale-125' sx={{ fontSize: 72 }} />
            <p>Unlocked</p>
          </>
        )}
      </div>
    </div>
  );
}
