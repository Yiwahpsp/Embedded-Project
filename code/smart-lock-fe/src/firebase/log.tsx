import { getDatabase, ref, query, orderByChild, limitToLast, get } from "firebase/database";

export interface LogEntry {
  id: string;
  message?: string;
  timestamp: number;
  success?: number;
}

export async function getLogs(): Promise<LogEntry[]> {
  try {
    const db = getDatabase();
    const logsRef = ref(db, "fingerprint/log");

    // Query logs ordered by 'timestamp' and limit to the last 7
    const logsQuery = query(logsRef, orderByChild("timestamp"), limitToLast(7));

    // Execute the query
    const snapshot = await get(logsQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();

      // Convert logs object to an array of LogEntry
      const logs: LogEntry[] = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      // Sort logs by timestamp in descending order (latest first)
      const latestLogs = logs.sort((a, b) => b.timestamp - a.timestamp);

      return latestLogs;
    } else {
      console.log("No logs available.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw new Error("Failed to fetch logs");
  }
}
