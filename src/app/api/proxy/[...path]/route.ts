/**
 * Next.js API proxy — CORS muammosini hal qiladi.
 * Browser → Next.js server → Railway backend
 * Backend ga tegmaymiz, faqat frontend proxy qo'shamiz.
 */

import { NextRequest, NextResponse } from "next/server";

const BACKEND = "https://vetclinicbackend.up.railway.app/api/v1";

async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const backendUrl = `${BACKEND}/${path.join("/")}`;

  // Query string ni ham uzatamiz
  const { search } = new URL(request.url);
  const targetUrl = search ? `${backendUrl}${search}` : backendUrl;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Authorization header ni uzatamiz
  const auth = request.headers.get("authorization");
  if (auth) headers["Authorization"] = auth;

  const body =
    request.method !== "GET" && request.method !== "HEAD"
      ? await request.text()
      : undefined;

  const res = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
    cache: "no-store",
  });

  const data = await res.text();

  return new NextResponse(data, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}

export const GET    = handler;
export const POST   = handler;
export const PATCH  = handler;
export const DELETE = handler;
