import { env } from "@/config/env";
import type { Profile } from "../types";

const fallbackProfile: Profile = {
  id: "1",
  name: "Alex Developer",
  role: "Frontend Engineer",
};

export async function fetchProfile(): Promise<Profile> {
  try {
    const response = await fetch(`${env.apiUrl}/profile`);

    if (!response.ok) {
      return fallbackProfile;
    }

    return response.json();
  } catch {
    return fallbackProfile;
  }
}
