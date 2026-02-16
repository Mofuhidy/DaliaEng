"use client";
import { ReactLenis } from "lenis/react";
import { PropsWithChildren } from "react";

export default function SmoothScroll({ children }: PropsWithChildren) {
  return <ReactLenis root>{children}</ReactLenis>;
}
