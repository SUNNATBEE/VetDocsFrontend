export const env = {
  // Browser dan so'rovlar Next.js proxy orqali ketadi (CORS muammosini hal qiladi)
  // Server side da to'g'ridan-to'g'ri Railway ga ketadi
  NEXT_PUBLIC_API_URL:
    typeof window !== "undefined"
      ? "/api/proxy"  // browser → Next.js proxy → Railway
      : (process.env.NEXT_PUBLIC_API_URL ?? "https://vetclinicbackend.up.railway.app/api/v1"),
};
