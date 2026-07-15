/**
 * Thin HTTP client for the MASPRO API.
 * Swap EXPO_PUBLIC_API_URL in .env to point at real backend.
 * All errors are classified so React Query can handle them distinctly.
 */

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "https://api.maspro.in/v1";

// ─── Error Classes ────────────────────────────────────────────────────────────
export class NetworkError extends Error {
  constructor(message = "No internet connection") {
    super(message);
    this.name = "NetworkError";
  }
}

export class AuthError extends Error {
  constructor(message = "Session expired. Please log in again.") {
    super(message);
    this.name = "AuthError";
  }
}

export class ClientError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ClientError";
  }
}

export class ServerError extends Error {
  constructor(
    public readonly status: number,
    message = "Something went wrong on our end. Please try again.",
  ) {
    super(message);
    this.name = "ServerError";
  }
}

/** Returns true for 4xx client errors — don't auto-retry these */
export function isClientError(err: unknown): boolean {
  return err instanceof ClientError || err instanceof AuthError;
}

// ─── API Client ───────────────────────────────────────────────────────────────
interface RequestOptions extends RequestInit {
  token?: string;
}

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { token, ...init } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((init.headers as Record<string, string>) ?? {}),
  };

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, { ...init, headers });
  } catch {
    throw new NetworkError();
  }

  if (response.status === 401) throw new AuthError();
  if (response.status >= 400 && response.status < 500) {
    const body = await response.json().catch(() => ({}));
    throw new ClientError(
      response.status,
      body.message ?? `Request failed (${response.status})`,
    );
  }
  if (response.status >= 500) {
    throw new ServerError(response.status);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string, token?: string) =>
    request<T>(path, { method: "GET", token }),

  post: <T>(path: string, body: unknown, token?: string) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body), token }),

  patch: <T>(path: string, body: unknown, token?: string) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body), token }),

  delete: <T>(path: string, token?: string) =>
    request<T>(path, { method: "DELETE", token }),
};
