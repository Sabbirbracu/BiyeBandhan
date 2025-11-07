import { NextRequest, NextResponse } from "next/server";

// GET /api/user/other/:id
export async function GET(req: NextRequest, context: { params: { id?: string } }) {
  try {
    const userId = context.params?.id;
    const token = req.headers.get("authorization") || "";

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${userId}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return NextResponse.json(
        { success: false, error: "Failed to fetch user data", details: errorData },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Proxy fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
