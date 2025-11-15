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
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST || "193.168.195.68",
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
      // ✅ This function ensures socket_id is sent automatically
      params: (socketId: string) => ({ socket_id: socketId }),
    },
  });

  echoInstance.connector.pusher.connection.bind('connected', () => {
    console.log('✅ Reverb connected successfully!');
  });

  return echoInstance;
};

// import Pusher from "pusher-js";

// declare global {
//   interface Window {
//     Pusher: typeof Pusher;
//   }
// }

// // Initialize Pusher on window
// if (typeof window !== "undefined") {
//   window.Pusher = Pusher;
// }

// let echoInstance: Echo<any> | null = null;

// export const getEchoInstance = (): Echo<any> => {
//   if (echoInstance) return echoInstance;

//   const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
//   if (!token) {
//     console.error("❌ No access token found in localStorage");
//     throw new Error("No access token found for Echo authorization");
//   }

//   console.log("🔑 Using token for Echo:", token.substring(0, 20) + "...");

//   echoInstance = new Echo({
//     broadcaster: "reverb",
//     key: process.env.NEXT_PUBLIC_REVERB_APP_KEY!,
//     wsHost: process.env.NEXT_PUBLIC_REVERB_HOST || "127.0.0.1",
//     wsPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT!),
//     wssPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT!),
//     forceTLS: false,
//     disableStats: true,
//     enabledTransports: ["ws", "wss"],
//     authEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/broadcasting/auth`,
//     auth: {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     },
//     // Add Pusher compatibility options
//     cluster: "", // Empty for Reverb
//     useTLS: false,
//   });

//   // Enhanced debugging
//   echoInstance.connector.pusher.connection.bind('connected', () => {
//     console.log('✅ Reverb connected successfully! Socket ID:', echoInstance!.socketId());
//   });

//   echoInstance.connector.pusher.connection.bind('error', (error: any) => {
//     console.error('❌ Reverb connection error:', error);
//   });

//   echoInstance.connector.pusher.connection.bind('disconnected', () => {
//     console.warn('⚠️ Reverb disconnected');
//   });

//   return echoInstance;
// };

// export const disconnectEcho = (): void => {
//   if (echoInstance) {
//     echoInstance.disconnect();
//     echoInstance = null;
//   }
// };