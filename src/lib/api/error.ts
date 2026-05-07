export type ApiError = {
  code: string;
  message: string;
  requestId?: string;
  status?: number;
  details?: unknown;
};

type BackendErrorEnvelope = {
  success?: boolean;
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
  meta?: {
    requestId?: string;
  };
};

export function toApiError(payload: unknown, status?: number): ApiError {
  const fallback: ApiError = {
    code: "UNKNOWN_ERROR",
    message: "Noma'lum xatolik yuz berdi",
    status,
  };

  if (!payload || typeof payload !== "object") {
    return fallback;
  }

  const body = payload as BackendErrorEnvelope;

  if (!body.error) {
    return fallback;
  }

  return {
    code: body.error.code ?? "UNKNOWN_ERROR",
    message: body.error.message ?? "Xatolik yuz berdi",
    requestId: body.meta?.requestId,
    details: body.error.details,
    status,
  };
}
