import React, { useEffect, useState } from 'react';
import { getLogs, LogEntry } from '@/firebase/log';
import LogCard from './log-card';

const LogList: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const fetchedLogs = await getLogs();
        setLogs(fetchedLogs);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return <p>Loading logs...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error fetching logs: {error}</p>;
  }

  if (logs.length === 0) {
    return <p>No logs available.</p>;
  }

  return (
    <div className="w-full log-list">
      <h2 className="mb-4 font-semibold text-xl md:text-2xl">Latest Logs</h2>
      <ul className="space-y-2">
        {logs.map((log) => (
          <li key={log.id} className="p-4 rounded-md w-full">
            <LogCard info={log} />
            {/* <p className="font-medium">{log.message || 'No message'}</p>
            <p className="text-gray-600 text-sm">
              {new Date(log.timestamp).toLocaleString()}
            </p>
            {log.success !== undefined && (
              <p className="text-gray-600 text-sm">
                Success: {log.success}
              </p>
            )} */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogList;