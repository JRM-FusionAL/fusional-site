const MAX_BODY_BYTES = 16_384;
const WINDOW_MS = 10 * 60_000;
const MAX_REQUESTS = 3;
const attempts = new Map<string, { count: number; until: number }>();

export async function guardContact(request: Request): Promise<
  | { body: Record<string, unknown> }
  | { response: Response }
> {
  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const now = Date.now();
  if (attempts.size >= 10_000) {
    for (const [key, value] of attempts) {
      if (value.until <= now) attempts.delete(key);
    }
    if (attempts.size >= 10_000 && !attempts.has(ip)) {
      return { response: Response.json({ error: "Please try again later." }, { status: 429 }) };
    }
  }
  const attempt = attempts.get(ip);
  if (attempt && attempt.until > now && attempt.count >= MAX_REQUESTS) {
    return { response: Response.json({ error: "Please try again later." }, { status: 429 }) };
  }
  attempts.set(ip, {
    count: attempt && attempt.until > now ? attempt.count + 1 : 1,
    until: attempt && attempt.until > now ? attempt.until : now + WINDOW_MS,
  });

  const length = Number(request.headers.get("content-length"));
  if (length > MAX_BODY_BYTES) {
    return { response: Response.json({ error: "Request is too large." }, { status: 413 }) };
  }
  let size = 0;
  const chunks: Uint8Array[] = [];
  const reader = request.body?.getReader();
  if (!reader) {
    return { response: Response.json({ error: "Invalid request body." }, { status: 400 }) };
  }
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return { response: Response.json({ error: "Request is too large." }, { status: 413 }) };
      }
      chunks.push(value);
    }
    const parsed: unknown = JSON.parse(
      new TextDecoder().decode(Buffer.concat(chunks)),
    );
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      throw new Error("Invalid JSON object");
    }
    return { body: parsed as Record<string, unknown> };
  } catch {
    return { response: Response.json({ error: "Invalid request body." }, { status: 400 }) };
  }
}
