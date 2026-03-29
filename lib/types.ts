import { ReactNode } from "react";

// 1. Base Component Models
export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

// 2. GSAP & Animation Models
export interface AnimationProps {
  delay?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
}

// 3. Core Data Models (Bio-Tech Theme)
export interface MetricData {
  id: string;
  label: string;
  value: string | number;
  unit: string;
  colorClass?: string; // e.g., 'text-rekcal-cyan'
}

export interface SectionContent {
  id: string;
  title: string;
  subtitle?: string;
  body: string[];
}

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}
