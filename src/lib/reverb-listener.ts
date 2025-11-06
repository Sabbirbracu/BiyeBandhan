"use client";

import { useEffect } from "react";
import { echo } from "./echo";

export default function useReverbListener(
  channelName: string,
  eventName: string,
  onEvent: (data: any) => void
) {
  useEffect(() => {
    if (!channelName || !eventName) return;
    const channel = echo.private(channelName);

    channel.listen(`.${eventName}`, (data: any) => {
      console.log(`🔔 Event received on ${channelName}:`, data);
      onEvent(data);
    });

    return () => {
      echo.leave(channelName);
    };
  }, [channelName, eventName, onEvent]);
}
