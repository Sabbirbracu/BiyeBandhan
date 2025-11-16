// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// declare global {
//   interface Window {
//     Pusher: typeof Pusher;
//     Echo: Echo<any>;
//   }
// }

// window.Pusher = Pusher;

// let echoInstance: Echo<any> | null = null;

// export const getEchoInstance = () => {
//   if (echoInstance) return echoInstance;

//   const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
//   if (!token) throw new Error("No access token found for Echo authorization");

//   echoInstance = new Echo({
//     broadcaster: "reverb",
//     key: process.env.NEXT_PUBLIC_REVERB_APP_KEY!,
//     wsHost: process.env.NEXT_PUBLIC_REVERB_HOST!,
//     wsPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT || '443'),
//     wssPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT || '443'),
//     forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME === 'https'),
//     disableStats: true,
//     enabledTransports: ["ws", "wss"],
//     authEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/broadcasting/auth`,
//     auth: {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/json",
//       },
//     },
//   });

//   echoInstance.connector.pusher.connection.bind('connected', () => {
//     console.log('✅ Reverb connected successfully!');
//   });

//   echoInstance.connector.pusher.connection.bind('error', (error: any) => {
//     console.error('❌ Reverb connection error:', error);
//   });

//   return echoInstance;
// };


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

export const getEchoInstance = () => {
  if (echoInstance) return echoInstance;

  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (!token) throw new Error("No access token found for Echo authorization");

  echoInstance = new Echo({
    broadcaster: "reverb",
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY!,
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST!,
    wsPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT || '443'),
    wssPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT || '443'),
    wsPath: process.env.NEXT_PUBLIC_REVERB_PATH || '/ws', // Add this line
    forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME === 'https'),
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
    console.log('✅ Reverb connected successfully!');
  });

  echoInstance.connector.pusher.connection.bind('error', (error: any) => {
    console.error('❌ Reverb connection error:', error);
  });

  // Add more connection state listeners for debugging
  echoInstance.connector.pusher.connection.bind('connecting', () => {
    console.log('🔄 Reverb connecting...');
  });

  echoInstance.connector.pusher.connection.bind('disconnected', () => {
    console.log('🔴 Reverb disconnected');
  });

  return echoInstance;
};