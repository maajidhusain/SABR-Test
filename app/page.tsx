import { Hero } from "@/components/hero";
import { MetricStrip } from "@/components/metric-strip";
import { SiteHeader } from "@/components/site-header";
import { getViewer } from "@/lib/auth";

export default async function HomePage() {
  const viewer = await getViewer();

  return (
    <>
      <SiteHeader viewer={viewer} />
      <Hero />
      <MetricStrip />
    </>
  );
}
