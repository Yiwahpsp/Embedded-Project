import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import LogCard from '@/components/log-card';
import { Log } from '@/interfaces/log';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getLogs } from '@/firebase/log';
import { useState, useEffect } from 'react';
import LogList from '@/components/lock-list';

export default function LogTablePage() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const logs = await getLogs();
      setLogs(logs);
    }
    fetchLogs();
  }, [])

  return (
    <div className="flex flex-col justify-center items-start gap-16 px-4 py-8 w-full text-primary">
      <h1 className="w-full font-semibold text-2xl text-center md:text-3xl">Log Status</h1>
      <div className='flex flex-col justify-start items-start gap-4 mx-auto w-full max-w-lg'>
        <LogList />
      </div>
    </div>
  )
}