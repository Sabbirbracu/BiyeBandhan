// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { receiver_id, message } = await req.json();
//     const accessToken = req.headers.get("authorization")?.replace("Bearer ", "");

//     const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/send`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify({ receiver_id, message }),
//     });

//     const data = await res.json();
//     return NextResponse.json(data, { status: res.status });
//   } catch (err) {
//     console.error("Send chat error:", err);
//     return NextResponse.json({ success: false, message: "Failed to send chat" }, { status: 500 });
//   }
// }
