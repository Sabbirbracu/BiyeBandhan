"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const SignUpUser = async (userData: FieldValues) => {
  console.log(userData, "userData from service");
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/signup`;
  console.log("API URL:", apiUrl);
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // <--- must stringify
    });

    console.log("Response status:", res.status);
    console.log("Response headers:", Object.fromEntries(res.headers.entries()));

    if (!res.ok) {
      // Optional: catch non-200 responses
      const text = await res.text();
      console.error("Server response not OK:", res.status, text);
      throw new Error(`Failed to signup: ${res.status} - ${text || 'No response body'}`);
    }

    const result = await res.json(); // Now it will parse JSON
    return result;
  } catch (error: any) {
    console.error("SignUpUser error:", error.message);
    return { success: false, message: error.message || "Unknown error" };
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    console.log("Login result:", result);
    
    if (result?.status) {
      console.log("Token received:", result?.token);
      
      if (result?.token) {
        const cookieStore = await cookies();
        cookieStore.set("accessToken", result.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
        });
        
        // Store user data in cookie as well
        if (result?.data) {
          cookieStore.set("userData", JSON.stringify(result.data), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
          });
        }
        console.log("Cookie set successfully");
      }

      revalidateTag("loginUser");
    }

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { status: false, message: error.message || "Login failed" };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PasswordChange = async (payload: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/changePassword`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    revalidateTag("loginUser");

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Error(error.message);
  }
};
export const getCurrentUser = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const userDataCookie = cookieStore.get("userData")?.value;

    if (!accessToken) {
      console.log("No access token found");
      return null;
    }

    console.log("Access token exists, length:", accessToken.length);

    // First try to get user data from cookie (faster)
    if (userDataCookie) {
      try {
        const userData = JSON.parse(userDataCookie);
        console.log("User data found in cookie");
        return userData;
      } catch (parseError) {
        console.error("Error parsing user data from cookie:", parseError);
      }
    }

    // If not in cookie, fetch from server
    console.log("Fetching user data from server");
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["loginUser"],
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch user data", res.status);
      return null;
    }

    const responseData = await res.json();

    if (responseData.success) {
      // Update cookie with fetched data
      cookieStore.set("userData", JSON.stringify(responseData.data), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return responseData.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("userData");
  revalidateTag("loginUser");
};
