// "use client";

// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// // Make Pusher available globally for Echo
// // (this line is required when using laravel-echo with pusher-js)
// window.Pusher = Pusher;

// let echoInstance: Echo<any> | null = null;

// export const getEchoInstance = () => {
//   if (echoInstance) return echoInstance;

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
//   if (!token) throw new Error("No access token found for Echo authorization");

//   echoInstance = new Echo({
//     broadcaster: "reverb", // ✅ important for Reverb
//     key: process.env.NEXT_PUBLIC_REVERB_APP_KEY!,
//     wsHost: process.env.NEXT_PUBLIC_REVERB_HOST!,
//     wsPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT!),
//     forceTLS: process.env.NEXT_PUBLIC_REVERB_SCHEME === "https",
//     disableStats: true,
//     enabledTransports: ["ws", "wss"],
//     authorizer: (channel, options) => ({
//       authorize: (socketId, callback) =>
//         callback(null, { auth: `Bearer ${token}` }),
//     }),
//   });

//   return echoInstance;
// };



"use client";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo<any>;
  }
}

window.Pusher = Pusher;

let echoInstance: Echo<any> | null = null;
console.log("Reverb ENV:", {
  key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
  host: process.env.NEXT_PUBLIC_REVERB_HOST,
  port: process.env.NEXT_PUBLIC_REVERB_PORT,
  scheme: process.env.NEXT_PUBLIC_REVERB_SCHEME,
  backend: process.env.NEXT_PUBLIC_BACKEND_URL,
});


export const getEchoInstance = () => {
  if (echoInstance) return echoInstance;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    console.log("Echo access token from echo.ts is :", token);
  if (!token) throw new Error("No access token found for Echo authorization");

  echoInstance = new Echo({
    broadcaster: "reverb",
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY!,
    
    // wsHost: "127.0.0.1",
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST || "127.0.0.1",
    wsPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT!),
    forceTLS: process.env.NEXT_PUBLIC_REVERB_SCHEME === "https",
    disableStats: true,
    enabledTransports: ["ws", "wss"],
    authEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  });

  echoInstance.connector.pusher.connection.bind('connected', () => {
  console.log('%c✅ Reverb connected successfully!', 'color: green; font-weight: bold;');
  });

  echoInstance.connector.pusher.connection.bind('error', (err: any) => {
    console.error('%c❌ Reverb connection error:', 'color: red;', err);
  });

  echoInstance.connector.pusher.connection.bind('state_change', (states: any) => {
    console.log('🔄 Reverb state changed:', states);
  });

  echoInstance.connector.pusher.connection.bind('unavailable', () => {
    console.warn('⚠️ Reverb is temporarily unavailable');
  });

  echoInstance.connector.pusher.connection.bind('failed', () => {
    console.error('❌ Reverb connection failed completely');
  });


  return echoInstance;
};
