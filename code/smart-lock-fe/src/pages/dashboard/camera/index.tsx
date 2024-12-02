import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Button from "@/components/button";

export default function Camera() {
  const router = useRouter();
  const streamRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState("STREAMING");
  const [streamUrl, setStreamUrl] = useState<string>("http://172.20.10.4:81"); // Replace with your stream URL
  const WS_URL = "ws://172.20.10.4:82"; // Replace with your WebSocket URL
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const websocket = new WebSocket(WS_URL);
    setWs(websocket);

    websocket.onmessage = (message) => {
      if (typeof message.data === "string") {
        setStatus(message.data);
      } else if (message.data instanceof Blob) {
        const blobUrl = URL.createObjectURL(message.data);
        if (streamRef.current) {
          streamRef.current.src = blobUrl;
        }
      }
    };

    websocket.onopen = () => console.log("WebSocket connected");
    websocket.onerror = (error) => console.error("WebSocket error:", error);
    websocket.onclose = () => console.log("WebSocket closed");

    return () => {
      websocket.close();
    };
  }, [WS_URL]);

  return (
    <div className="flex flex-col justify-center items-start gap-16 px-4 py-8 w-full text-primary">
      <div className="relative flex flex-col w-full">
        <button
          className="top-0 left-0 absolute"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          <KeyboardBackspaceIcon sx={{ fontSize: 24 }} />
        </button>
        <h1 className="w-full font-semibold text-2xl text-center md:text-3xl">Camera</h1>
      </div>

      {/* Display the stream */}
      <div className="flex flex-col justify-center items-center w-full">
        <img
          id="stream"
          ref={streamRef}
          src={streamUrl}
          alt="Camera Stream"
          className="border rounded-lg w-full max-w-lg"
        />
        <p className="mt-4 text-center">Status: {status}</p>
      </div>
      <Button variant="" onClick={() => router.push('http://172.20.10.4')}>Go to camera website</Button>
    </div>
  );
}
