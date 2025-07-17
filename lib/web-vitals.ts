import { type Metric, onCLS, onLCP, onFCP, onTTFB } from 'web-vitals';

/**
 * Reports Web Vitals metrics to Google Analytics
 * @see https://web.dev/vitals/
 */
export function reportWebVitals(metric: Metric): void {
  // Only run on client side and if Google Analytics is initialized
  if (typeof window === 'undefined' || !window.gtag) return;

  // Ensure the value is an integer as required by GA
  const value = Math.round(metric.value * 10) / 10;

  try {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: value,
      non_interaction: true, // Avoids affecting bounce rate
      metric_id: metric.id, // Unique identifier for this metric
      metric_value: value,
      metric_delta: metric.delta, // The delta between current and last value
    });
  } catch (error) {
    console.error('Failed to report Web Vitals:', error);
  }
}

/**
 * Measures all Core Web Vitals metrics
 * CLS: Cumulative Layout Shift
 * LCP: Largest Contentful Paint
 * FCP: First Contentful Paint
 * TTFB: Time to First Byte
 */
export function measureWebVitals(): void {
  try {
    // Core Web Vitals
    onCLS(reportWebVitals);
    onLCP(reportWebVitals);

    // Additional metrics
    onFCP(reportWebVitals);
    onTTFB(reportWebVitals);
  } catch (error) {
    console.error('Failed to measure Web Vitals:', error);
  }
}
