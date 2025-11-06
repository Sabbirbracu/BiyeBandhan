import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { receiverId: string } }) {
  try {
    const accessToken = req.headers.get("authorization")?.replace("Bearer ", "");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/history/${params.receiverId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Fetch chat history error:", err);
    return NextResponse.json({ success: false, message: "Failed to load chat history" }, { status: 500 });
  }
}
