export async function fetchJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  const response = await fetch(input, {
    credentials: "include",
    cache: "no-store",
    ...init,
  });

  if (!response.ok) {
    // If the server tells us the user isn't whitelisted, redirect immediately
    if (response.status === 403) {
      try {
        const body = await response.clone().json();
        if (body?.code === "not_whitelisted") {
          window.location.href = "/auth-error?reason=not_whitelisted";
          // Throw to stop SWR from retrying while redirect is in progress
          throw new Error("not_whitelisted");
        }
      } catch (e) {
        if ((e as Error).message === "not_whitelisted") throw e;
        // JSON parse failed — fall through to generic error
      }
    }
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}
