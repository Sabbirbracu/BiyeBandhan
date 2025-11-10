import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(req: Request) {
  try {
    // Get user data & token from cookies
    const cookieStore = await cookies();
    const userData = cookieStore.get("userData")?.value;
    const token = cookieStore.get("accessToken")?.value || "";

    if (!userData) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const parsedUser = JSON.parse(userData);
    const userPlan = parsedUser?.plan?.plan_name || "Basics";

    // ✅ Restrict Basics users from creating chat
    if (userPlan === "Basics") {
      return NextResponse.json(
        { error: "Chat not allowed for Basics plan users" },
        { status: 403 }
      );
    }

    // Proceed to create chat normally
    const body = await req.json();
    const res = await fetch(`${BASE_URL}/api/chat/list`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Failed to create chat:", error);
    return NextResponse.json({ error: "Failed to create chat" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value || "";

    const res = await fetch(`${BASE_URL}/api/chat/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Failed to fetch chat list:", error);
    return NextResponse.json({ error: "Failed to fetch chat list" }, { status: 500 });
  }
}
