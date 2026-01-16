"use client"

import { useEffect, useState, useRef } from "react"
import { io } from "socket.io-client"

export function useWebSocket(url = process.env.NEXT_PUBLIC_WS_URL) {
  const [isConnected, setIsConnected] = useState(false);
  const [sensorData, setSensorData] = useState(null);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(url, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    const socket = socketRef.current;

    // Connection event handlers
    socket.on("connect", () => {
      console.log("✅ WebSocket connected");
      setIsConnected(true);
      setError(null);
    });

    socket.on("disconnect", () => {
      console.log("❌ WebSocket disconnected");
      setIsConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
      setError("Failed to connect to server");
      setIsConnected(false);
    });

    // Listen for sensor updates
    socket.on("sensorUpdate", (data) => {
      if (data.success) {
        setSensorData(data.data);
        setError(null);
      } else {
        setError(data.error || "Failed to receive sensor data");
      }
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [url]);

  const requestSensorData = (sensorId) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit("requestSensorData", sensorId);
    }
  };

  return {
    isConnected,
    sensorData,
    error,
    requestSensorData,
  };
}
