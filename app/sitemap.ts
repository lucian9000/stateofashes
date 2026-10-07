import type { MetadataRoute } from "next";
import { services, site } from "./content/services";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/services", ...services.map(service => `/services/${service.slug}`), "/privacy"].map(path => ({ url: `${site.url}${path}` }));
}
