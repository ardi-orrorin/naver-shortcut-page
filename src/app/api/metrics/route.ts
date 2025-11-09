import { isPrometheusEnabled, metricsRegistry } from "@/lib/metrics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  if (!isPrometheusEnabled) {
    return new Response("Prometheus metrics disabled", { status: 503 });
  }

  const metrics = await metricsRegistry.metrics();

  return new Response(metrics, {
    status: 200,
    headers: {
      "Content-Type": metricsRegistry.contentType
    }
  });
}
