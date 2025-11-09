import http from "node:http";
import { AddressInfo } from "node:net";
import { isPrometheusEnabled, metricsRegistry } from "./metrics";

declare global {
  var __NAVER_SHORTCUT_METRICS_SERVER__: http.Server | undefined;
}

const parsePort = (value: string | undefined): number | null => {
  if (!value) {
    return null;
  }

  const numericPort = Number(value);

  if (Number.isNaN(numericPort) || numericPort <= 0 || numericPort >= 65536) {
    console.warn(`[metrics] 잘못된 포트가 설정되었습니다: ${value}`);
    return null;
  }

  return numericPort;
};

const metricsPort =
  parsePort(process.env.PROMETHEUS_PORT) ??
  parsePort(process.env.METRICS_PORT) ??
  parsePort(process.env.PROM_CLIENT_PORT);

export const ensureMetricsServer = () => {
  if (!isPrometheusEnabled || !metricsPort || globalThis.__NAVER_SHORTCUT_METRICS_SERVER__) {
    return;
  }

  const server = http.createServer(async (req, res) => {
    const requestUrl = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);

    const respondWithMetrics = async () => {
      const payload = await metricsRegistry.metrics();
      res.writeHead(200, {
        "Content-Type": metricsRegistry.contentType
      });
      res.end(payload);
    };

    try {
      if (requestUrl.pathname === "/" || requestUrl.pathname === "/metrics") {
        await respondWithMetrics();
        return;
      }

      const body = JSON.stringify({
        status: "error",
        errorType: "not_found",
        error: "지원하지 않는 경로입니다. /metrics 만 사용할 수 있습니다."
      });
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(body);
    } catch (error) {
      console.error("[metrics] 메트릭 응답 생성 중 오류", error);
      const body = JSON.stringify({
        status: "error",
        errorType: "server_error",
        error: "metrics_error"
      });
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(body);
    }
  });

  server.listen(metricsPort, process.env.PROMETHEUS_HOST ?? "0.0.0.0", () => {
    const { port, address } = server.address() as AddressInfo;
    console.info(`[metrics] Prometheus 엔드포인트가 ${address}:${port} 에서 대기 중입니다.`);
  });

  server.on("error", (error) => {
    console.error("[metrics] 서버 오류", error);
  });

  globalThis.__NAVER_SHORTCUT_METRICS_SERVER__ = server;
};
