export interface FocusPillar {
  index: string;
  title: string;
  description: string;
  iconName: "workflow" | "blocks" | "gauge";
}

export interface MethodStep {
  index: string;
  title: string;
  question: string;
}

export interface MetricItem {
  value: string;
  label: string;
  description: string;
}

export interface RoleExperience {
  period: string;
  company: string;
  title: string;
  description: string;
  caseStudyHref?: string;
}

export interface ContributionItem {
  type: "speaking" | "mentoring";
  title: string;
  description: string;
}

export interface AboutData {
  eyebrow: string;
  headline: string;
  bio: string;
  proofTags: string[];
  status: {
    name: string;
    note: string;
  };
  pillars: FocusPillar[];
  methodology: MethodStep[];
  experience: RoleExperience;
  metrics: MetricItem[];
  contributions: ContributionItem[];
  principles: string[];
}

export const aboutData: AboutData = {
  eyebrow: "About / Software engineer and systems architect",
  headline: "I turn complex workflows into high-performance web systems.",
  bio: "Software Engineer with three years of production experience building high-performance web applications, AI-driven tooling, and distributed backend services. Physics Engineering background combined with pragmatic engineering across React, Next.js, Astro, FastAPI, and mobile platforms.",
  proofTags: [
    "Frontend performance",
    "Full stack architecture",
    "Agentic AI systems",
  ],
  status: {
    name: "Raka Grarizki",
    note: "Leading frontend performance and building resilient product systems",
  },
  pillars: [
    {
      index: "01",
      title: "Complex workflows",
      description:
        "Interfaces shaped by high-throughput enterprise operations, asynchronous state, and real-time data flows.",
      iconName: "workflow",
    },
    {
      index: "02",
      title: "Product architecture",
      description:
        "Clean boundaries across frontend platforms, microservices, and backend APIs keeping systems maintainable.",
      iconName: "blocks",
    },
    {
      index: "03",
      title: "Engineering leverage",
      description:
        "Measurable performance optimizations, developer tooling, and reusable architecture foundations.",
      iconName: "gauge",
    },
  ],
  methodology: [
    {
      index: "01",
      title: "Workflow",
      question: "What user outcome does the system serve?",
    },
    {
      index: "02",
      title: "Constraint",
      question: "What operational and network limits create pressure?",
    },
    {
      index: "03",
      title: "Ownership",
      question: "Which service or component layer owns the responsibility?",
    },
    {
      index: "04",
      title: "Mechanism",
      question: "What represents the simplest sufficient implementation?",
    },
    {
      index: "05",
      title: "Evidence",
      question: "How do we verify speed and correctness under load?",
    },
  ],
  experience: {
    period: "2023 to Present",
    company: "PT. BFI Finance Indonesia",
    title: "Software Engineer",
    description:
      "Led frontend performance optimization initiatives across enterprise digital platforms. Delivered a 97% LCP speedup, reduced CMS API requests by 50-60%, and engineered full-stack services across React, Next.js, and FastAPI.",
    caseStudyHref: "/work",
  },
  metrics: [
    {
      value: "97%",
      label: "LCP speedup",
      description: "Achieved through asset pipeline tuning and bundle optimization.",
    },
    {
      value: "50-60%",
      label: "API reduction",
      description: "Delivered via structured caching and payload pruning.",
    },
    {
      value: "3+",
      label: "years",
      description: "Building production web systems, AI pipelines, and mobile apps.",
    },
  ],
  contributions: [
    {
      type: "speaking",
      title: "Technical Knowledge Sharing",
      description:
        "Sharing practical lessons on web performance, Astro, Next.js, and API architecture.",
    },
    {
      type: "mentoring",
      title: "Engineering Mentorship",
      description:
        "Guiding developers on clean architecture, type safety, and analytical problem-solving.",
    },
  ],
  principles: [
    "Performance work requires objective, reproducible metrics.",
    "Component and service contracts must remain explicit.",
    "System boundaries determine long-term team velocity.",
    "Reusable foundations outlast temporary library choices.",
    "Code clarity takes precedence over clever abstractions.",
  ],
};
