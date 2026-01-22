import { getStrapiURL } from "@/lib/utils";
import { mockLogin, mockRegister } from "../mock-data/users";

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

interface LoginUserProps {
  identifier: string;
  password: string;
}

const baseUrl = getStrapiURL();

// Demo mode flag
const DEMO_MODE = true;

export async function registerUserService(userData: RegisterUserProps) {
  if (DEMO_MODE) {
    // Simulate async delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    const result = mockRegister(
      userData.username,
      userData.email,
      userData.password
    );

    if (result.success) {
      return {
        jwt: result.jwt,
        user: result.user,
      };
    } else {
      return {
        error: {
          message: result.error || "Registration failed",
        },
      };
    }
  }

  const url = new URL("/api/auth/local/register", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}

export async function loginUserService(userData: LoginUserProps) {
  if (DEMO_MODE) {
    // Simulate async delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    const result = mockLogin(userData.identifier, userData.password);

    if (result.success) {
      return {
        jwt: result.jwt,
        user: result.user,
      };
    } else {
      return {
        error: {
          message: result.error || "Login failed",
        },
      };
    }
  }

  const url = new URL("/api/auth/local", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}
