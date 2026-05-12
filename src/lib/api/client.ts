import { env } from "@/src/config/env";
import { toApiError, type ApiError } from "@/src/lib/api/error";

type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiEnvelope<T> =
  | ApiSuccess<T>
  | {
      success: false;
      error?: {
        code?: string;
        message?: string;
        details?: unknown;
      };
      meta?: {
        requestId?: string;
      };
    };

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = `${env.NEXT_PUBLIC_API_URL}${path}`;
  const method = options.method ?? "GET";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    // Ba'zi endpointlar bo'sh body qaytarishi mumkin.
  }

  if (!response.ok) {
    throw toApiError(payload, response.status);
  }

  if (!payload || typeof payload !== "object" || !("success" in payload)) {
    throw {
      code: "INVALID_RESPONSE",
      message: "Serverdan noto'g'ri javob keldi",
      status: response.status,
    } satisfies ApiError;
  }

  const envelope = payload as ApiEnvelope<T>;
  if (envelope.success !== true) {
    throw toApiError(payload, response.status);
  }

  return envelope.data;
}

export const apiClient = {
  get: <T>(path: string, token?: string) => request<T>(path, { method: "GET", token }),
  post: <T>(path: string, body?: unknown, token?: string) =>
    request<T>(path, { method: "POST", body, token }),
  patch: <T>(path: string, body?: unknown, token?: string) =>
    request<T>(path, { method: "PATCH", body, token }),
  delete: <T>(path: string, token?: string) => request<T>(path, { method: "DELETE", token }),
};
