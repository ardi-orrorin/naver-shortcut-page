import { Counter, Registry, collectDefaultMetrics } from "prom-client";

declare global {
  var __NAVER_SHORTCUT_REGISTRY__: Registry | undefined;
  var __NAVER_SHORTCUT_CUSTOM_METRICS__: {
    rootRequestsCounter: Counter;
  } | undefined;
}

export const isPrometheusEnabled = process.env.PROMETHEUS_ENABLED === "true";

const registry = (isPrometheusEnabled ? globalThis.__NAVER_SHORTCUT_REGISTRY__ : undefined) ?? new Registry();

if (isPrometheusEnabled && !globalThis.__NAVER_SHORTCUT_REGISTRY__) {
  collectDefaultMetrics({
    register: registry,
    labels: { app: "naver-shortcut-page" }
  });

  globalThis.__NAVER_SHORTCUT_REGISTRY__ = registry;
}

const customMetrics =
  (isPrometheusEnabled ? globalThis.__NAVER_SHORTCUT_CUSTOM_METRICS__ : undefined) ??
  (isPrometheusEnabled
    ? {
        rootRequestsCounter: new Counter({
          name: "naver_shortcut_root_requests_total",
          help: "루트 페이지 요청 횟수",
          registers: [registry]
        })
      }
    : undefined);

if (isPrometheusEnabled && customMetrics && !globalThis.__NAVER_SHORTCUT_CUSTOM_METRICS__) {
  globalThis.__NAVER_SHORTCUT_CUSTOM_METRICS__ = customMetrics;
}

export const metricsRegistry = registry;

export const recordRootRequest = () => {
  if (!isPrometheusEnabled || !customMetrics) {
    return;
  }

  customMetrics.rootRequestsCounter.inc();
};
