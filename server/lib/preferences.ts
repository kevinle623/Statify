import { cookies } from "next/headers";
import {
  PREFERENCE_PREFIX,
  type PreferenceKey,
} from "@/client/lib/preferences";

export async function getServerPreference(
  key: PreferenceKey,
): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(`${PREFERENCE_PREFIX}${key}`)?.value ?? null;
}
