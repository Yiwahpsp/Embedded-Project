import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import LogCard from '@/components/log-card';
import { Log } from '@/interfaces/log';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function LogTablePage() {
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
  const arrays = new Array(2).fill(null);
  return (
    <div className="flex flex-col justify-center items-start gap-16 px-4 py-8 w-full text-primary">
      <h1 className="w-full font-semibold text-2xl text-center md:text-3xl">Log Status</h1>
      <div className='flex flex-col justify-start items-start gap-4 mx-auto w-full max-w-lg'>
        {
          arrays.map((_, index) =>
          (
            <Accordion className='bg-transparent shadow-none w-full'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className='w-full text-lg md:text-xl'
              >
                27 May 2024
              </AccordionSummary>
              <AccordionDetails
                className='flex flex-col gap-4 w-full'
              >
                {
                  mockLogs.map((log: Log) => (
                    <LogCard key={log.logId} info={log} />
                  ))
                }
              </AccordionDetails>
            </Accordion>
          ))}
      </div>
    </div>
  )
}