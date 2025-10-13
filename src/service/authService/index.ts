"use server";
import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const SignUpUser = async (userData: FieldValues) => {
  console.log(userData, "userData from service");
  try {
    const res = await fetch(`http://193.168.195.68/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // <--- must stringify
    });

    if (!res.ok) {
      // Optional: catch non-200 responses
      const text = await res.text();
      console.error("Server response not OK:", text);
      throw new Error("Failed to signup");
    }

    const result = await res.json(); // Now it will parse JSON
    return result;
  } catch (error: any) {
    console.error("SignUpUser error:", error);
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
    console.log(res, "response from login user service");
    const result = await res.json();
    console.log(result);
    if (result?.status) {
      console.log(result, "result from login user service");
      (await cookies()).set("accessToken", result?.token);

      revalidateTag("loginUser");
    }

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Error(error);
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
    const accessToken = (await cookies()).get("accessToken")?.value;

    if (!accessToken) {
      return null;
    }

    // First decode the token to get basic user info
    const decodedData = jwtDecode(accessToken);
    // Then fetch complete user data from the server
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
      // If server request fails, still return decoded token data as fallback
      return decodedData;
    }

    const userData = await res.json();

    if (userData.success) {
      return userData.data;
    } else {
      return decodedData;
    }
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
  revalidateTag("loginUser");
};
