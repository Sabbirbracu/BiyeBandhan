// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// // Make Pusher available globally
// declare global {
//   interface Window {
//     Pusher: typeof Pusher;
//     Echo: Echo<any>;
//   }
// }

// window.Pusher = Pusher;

// // Define Echo configuration for Reverb
// export const echo = new Echo({
//   broadcaster: "reverb" as const,
//   key: process.env.NEXT_PUBLIC_REVERB_APP_KEY!,
//   wsHost: process.env.NEXT_PUBLIC_REVERB_HOST!,
//   wsPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT!),
//   wssPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT!),
//   forceTLS: process.env.NEXT_PUBLIC_REVERB_SCHEME === "https",
//   enabledTransports: ["ws", "wss"],
// });



"use client";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

// Make Pusher available globally
declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo<any>; // ✅ Use Echo<any> to suppress the generic type requirement
  }
}

window.Pusher = Pusher;

// Initialize Echo (Reverb acts as a Pusher-compatible server)
export const echo = new Echo({
  broadcaster: "pusher", // ✅ keep this as "pusher"
  key: process.env.NEXT_PUBLIC_REVERB_APP_KEY!,
  wsHost: process.env.NEXT_PUBLIC_REVERB_HOST!,
  wsPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT!),
  wssPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT!),
  forceTLS: process.env.NEXT_PUBLIC_REVERB_SCHEME === "https",
  enabledTransports: ["ws", "wss"],
});
