"use client";
import type { ReactNode } from "react";
import { ExperienceProvider, SiteHeader } from "./experience";
import { SiteFooter } from "./site-footer";

export function PageShell({ children }: { children: ReactNode }) {
  return <ExperienceProvider><div id="top"><a className="skip-link" href="#main">Skip to content</a><SiteHeader homePath="/"/><main id="main" className="information-main">{children}</main><SiteFooter homePath="/"/></div></ExperienceProvider>;
}
