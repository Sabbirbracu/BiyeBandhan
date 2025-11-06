import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("authorization");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/list`, {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("Chat list data:", data);
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Failed to fetch chat list:", error);
    return NextResponse.json({ error: "Failed to fetch chat list" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization");
    const body = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/list`, {
      method: "POST",
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("Response from backend chat creation:", res);

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Failed to create chat:", error);
    return NextResponse.json({ error: "Failed to create chat" }, { status: 500 });
  }
}
