import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
  const runtimeComparison = [
    {
      metric: "Startup speed",
      node: "Optimized for warm servers and long-lived processes.",
      bun: "Rust core delivers noticeably faster cold starts and script execution.",
    },
    {
      metric: "Package ecosystem",
      node: "Largest ecosystem via npm; mature tooling and enterprise support.",
      bun: "npm-compatible installs plus built-in bundler, test runner, and transpiler.",
    },
    {
      metric: "Language features",
      node: "Stable ES modules, top-level await, and broad compatibility.",
      bun: "Ships the latest JS/TypeScript features and JSX/TSX out of the box.",
    },
    {
      metric: "Runtime extras",
      node: "Relies on external tools (webpack, ts-node, vitest) for modern DX.",
      bun: "All-in-one toolchain with bundling, hot reload, and Web APIs implemented natively.",
    },
  ];

  type RuntimeMetric = {
    metric: string;
    node: number;
    bun: number;
    unit?: string;
    better: "higher" | "lower";
  };

  const runtimePerformance: RuntimeMetric[] = [
    { metric: "Cold start latency", node: 90, bun: 20, unit: "ms", better: "lower" },
    { metric: "HTTP server throughput", node: 13254, bun: 52479, unit: "req/s", better: "higher" },
    { metric: "Package install time", node: 38, bun: 2.5, unit: "s", better: "lower" },
    { metric: "Average response latency", node: 71.7, bun: 4.5, unit: "ms", better: "lower" },
  ];

  const formatRuntimeValue = (value: number, unit?: string) => {
    if (!Number.isFinite(value)) {
      return "n/a";
    }

    const absValue = Math.abs(value);
    const formatter = new Intl.NumberFormat("en-US", {
      notation: absValue >= 1000 ? "compact" : "standard",
      maximumFractionDigits: absValue >= 1000 ? 1 : 0,
    });

    return unit ? `${formatter.format(value)} ${unit}` : formatter.format(value);
  };

  const getRuntimeBarWidth = (
    value: number,
    comparison: { node: number; bun: number; better?: "higher" | "lower" }
  ) => {
    if (!Number.isFinite(value)) {
      return 0;
    }

    const better = comparison.better ?? "higher";
    const { node, bun } = comparison;

    if (better === "lower") {
      const best = Math.min(node, bun);
      if (best === 0) {
        return 100;
      }
      return Math.max(5, Math.min(100, Math.round((best / value) * 100)));
    }

    const best = Math.max(node, bun);
    if (best === 0) {
      return 0;
    }

    return Math.max(5, Math.min(100, Math.round((value / best) * 100)));
  };

  const frameworkHighlights = [
    {
      name: "Next.js",
      tagline: "React-first meta-framework built by Vercel",
      highlights: ["App Router with React Server Components", "Hybrid rendering (SSR, SSG, ISR)", "Huge plugin ecosystem"],
      bestFor: "Product teams needing wide deployment targets, ISR, and edge-ready React.",
      accent: "bg-blue-500/10 text-blue-600",
    },
    {
      name: "Remix",
      tagline: "Progressive enhancement meets nested routing",
      highlights: ["Data loaders/actions run on the server", "Fine-grained error boundaries", "Streams responses for instant UX"],
      bestFor: "Teams who value web fundamentals, forms, and granular route control.",
      accent: "bg-emerald-500/10 text-emerald-600",
    },
    {
      name: "SvelteKit",
      tagline: "Compiler-driven UI with minimal runtime",
      highlights: ["Reactive syntax without virtual DOM", "File-based routing with server hooks", "Ships lean bundles by default"],
      bestFor: "Performance-sensitive apps and teams embracing the Svelte paradigm.",
      accent: "bg-orange-500/10 text-orange-600",
    },
  ];

  const frameworkMatrix = [
    {
      capability: "Rendering & delivery",
      next: "SSR, SSG, ISR, React Server Components, Edge support",
      remix: "SSR-first, streaming responses, granular nested layouts",
      svelte: "SSR by default, adapters for edge/serverless, zero client runtime when possible",
    },
    {
      capability: "Data loading",
      next: "`fetch` caching, Route Handlers, Server Actions, per-route caches",
      remix: "Loaders/actions colocated with routes, progressive enhancement",
      svelte: "`load` functions with server context and form actions",
    },
    {
      capability: "Routing experience",
      next: "App Router with nested layouts and parallel routes",
      remix: "Convention-based flat routes with nested UI boundaries",
      svelte: "Filesystem routing, layouts, and advanced +page / +layout control",
    },
    {
      capability: "TypeScript & DX",
      next: "First-class TS, Turbopack dev server, rich Vercel integrations",
      remix: "Type-safe loaders/actions, testing utilities, strong CLI",
      svelte: "TypeScript opt-in with tight compiler feedback, Vite-powered dev server",
    },
  ];

  type FrameworkMetric = {
    framework: string;
    deployment: string;
    lighthouse: number;
    ttfb: number;
    bundleSize: number;
    buildTime: number;
    color: string;
    icon: string;
  };

  const frameworkPerformance: FrameworkMetric[] = [
    {
      framework: "Next.js",
      deployment: "Vercel Edge",
      lighthouse: 97,
      ttfb: 145,
      bundleSize: 92,
      buildTime: 18,
      color: "blue",
      icon: "",
    },
    {
      framework: "Remix",
      deployment: "Cloudflare Workers",
      lighthouse: 95,
      ttfb: 85,
      bundleSize: 67,
      buildTime: 11,
      color: "emerald",
      icon: "",
    },
    {
      framework: "SvelteKit",
      deployment: "Adapter Auto",
      lighthouse: 98,
      ttfb: 110,
      bundleSize: 38,
      buildTime: 7,
      color: "orange",
      icon: "",
    },
    {
      framework: "Plain React SPA",
      deployment: "Static CDN",
      lighthouse: 87,
      ttfb: 320,
      bundleSize: 142,
      buildTime: 22,
      color: "purple",
      icon: "",
    },
  ];

  type ReferenceLink = {
    label: string;
    url: string;
    summary: string;
  };

  type ReferenceGroup = {
    title: string;
    references: ReferenceLink[];
  };

  const referenceGroups: ReferenceGroup[] = [
    {
      title: "Runtime & tooling benchmarks",
      references: [
        {
          label: "Oven: Bun v1.0 release benchmarks",
          url: "https://bun.sh/blog/bun-v1.0",
          summary:
            "Cold start latency, HTTP throughput, and package install figures that shape the Bun vs Node runtime cards.",
        },
        {
          label: "Node.js Foundation: About Node.js",
          url: "https://nodejs.org/en/about",
          summary:
            "Background on Node.js' stability, LTS cadence, and ecosystem size referenced throughout the runtime comparison.",
        },
        {
          label: "Bun documentation: Runtime overview",
          url: "https://bun.sh/docs/runtime/overview",
          summary:
            "Describes Bun's TypeScript support, bundler, and built-in tooling cited under runtime extras and language features.",
        },
        {
          label: "Bun CLI install documentation",
          url: "https://bun.sh/docs/cli/install",
          summary:
            "Notes Bun's npm-compatible installer and install-time benchmarks inspiring the package install metric.",
        },
      ],
    },
    {
      title: "Framework performance & capabilities",
      references: [
        {
          label: "Next.js documentation",
          url: "https://nextjs.org/docs",
          summary:
            "App Router, SSR/SSG/ISR, and React Server Components capabilities grounding the framework matrix values.",
        },
        {
          label: "Remix documentation",
          url: "https://remix.run/docs/en/main",
          summary:
            "Explains loaders, actions, and streaming responses referenced in Remix highlights and performance cards.",
        },
        {
          label: "Announcing SvelteKit 1.0",
          url: "https://svelte.dev/blog/announcing-sveltekit-1.0",
          summary:
            "Outlines SvelteKit's compiler-first design, adapters, and bundle optimisations used for SvelteKit metrics.",
        },
        {
          label: "Krause's JS Framework Benchmark",
          url: "https://krausest.github.io/js-framework-benchmark/current.html",
          summary:
            "Independent Lighthouse, TTFB, and bundle size measurements informing the comparative framework performance chart.",
        },
        {
          label: "React documentation: Learn React",
          url: "https://react.dev/learn",
          summary:
            "Clarifies React's component model, hooks, and rendering strategies summarized in the React in context section.",
        },
      ],
    },
    {
      title: "Hosting & deployment trade-offs",
      references: [
        {
          label: "Vercel pricing and limits",
          url: "https://vercel.com/pricing",
          summary:
            "Free tier bandwidth and serverless execution limits referenced in the serverless hosting comparison table.",
        },
        {
          label: "Vercel edge network overview",
          url: "https://vercel.com/docs/concepts/edge-network/overview",
          summary:
            "Details on global edge regions and latency characteristics noted in the serverless hosting advantages.",
        },
        {
          label: "Cloudflare Workers limits",
          url: "https://developers.cloudflare.com/workers/platform/limits/",
          summary:
            "Execution time, cold start, and memory limits backing the Workers row in the platform comparison table.",
        },
        {
          label: "AWS Lambda service quotas",
          url: "https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html",
          summary:
            "Duration ceilings and scaling behaviour underpinning the AWS Lambda execution limit values.",
        },
        {
          label: "AWS serverless overview",
          url: "https://aws.amazon.com/serverless/",
          summary:
            "High-level definition of serverless computing referenced in the explanatory tooltip inside the hosting section.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 font-sans">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-8 sm:px-6 sm:py-12 md:gap-16 md:px-8 lg:gap-20 lg:px-12 lg:py-16">
        <section className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-xl shadow-zinc-900/5 backdrop-blur sm:rounded-3xl sm:p-8 md:p-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center sm:gap-6">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 sm:px-4 sm:text-sm">
              <span className="text-lg sm:text-xl">⚙️</span>
              <span className="hidden sm:inline">Modern JavaScript runtime and framework comparison</span>
              <span className="sm:hidden">JS Runtime & Framework Guide</span>
            </span>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl md:text-4xl lg:text-5xl">
              Node.js vs Bun, React fundamentals, and the frameworks that power the modern web
            </h1>
            <p className="text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8 md:text-lg">
              Understand how the platform, library, and framework layers fit together when you build with Next.js, Remix, or SvelteKit. This guide blends explanations with visual cues so you can decide what best suits your next project.
            </p>
          </div>
        </section>

        <section className="grid gap-4 rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-lg shadow-zinc-900/5 backdrop-blur sm:gap-6 sm:rounded-3xl sm:p-8 md:p-10">
          <header className="flex flex-col gap-3 sm:gap-4">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900 flex flex-col gap-2 items-start sm:flex-row sm:items-center sm:gap-3 sm:text-2xl">
                <span className="flex items-center gap-2">
                  <Image
                    src="/node.png"
                    alt="Node.js logo"
                    width={24}
                    height={24}
                    className="rounded sm:w-8 sm:h-8"
                  />
                  <span className="text-base sm:text-xl">Node.js</span>
                </span>
                <span className="text-zinc-400 text-base sm:text-xl">vs</span>
                <span className="flex items-center gap-2">
                  <Image
                    src="/bun.png"
                    alt="Bun logo"
                    width={24}
                    height={24}
                    className="rounded sm:w-8 sm:h-8"
                  />
                  <span className="text-base sm:text-xl">Bun</span>
                </span>
              </h2>
              <p className="text-sm text-zinc-600 mt-2 sm:text-base">
                Two JavaScript runtimes with different DNA. Node.js prioritizes stability and a vast ecosystem, while Bun focuses on speed and an all-in-one developer experience.
              </p>
              <p className="text-xs text-zinc-500 mt-2">
                💡 <em>Tap underlined terms</em> for explanations of technical concepts.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 sm:gap-3 sm:text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-1 font-medium text-blue-600 sm:gap-2 sm:px-3">
                <span className="text-base sm:text-lg">🟦</span>
                Node.js
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 font-medium text-amber-600 sm:gap-2 sm:px-3">
                <span className="text-base sm:text-lg">🟧</span>
                Bun
              </span>
            </div>
          </header>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {runtimeComparison.map((item) => (
              <article
                key={item.metric}
                className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 sm:gap-4 sm:rounded-2xl sm:p-6"
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-zinc-900 sm:text-lg">{item.metric}</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-zinc-400 hover:text-zinc-600 cursor-help text-sm">ⓘ</span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[200px] sm:max-w-sm">
                      {item.metric === "Startup speed" && "How quickly the runtime initializes and becomes ready to execute code"}
                      {item.metric === "Package ecosystem" && "Available libraries, tools, and community support through package registries"}
                      {item.metric === "Language features" && "Modern JavaScript/TypeScript features and standards compliance"}
                      {item.metric === "Runtime extras" && "Built-in tools like bundlers, test runners, and package managers"}
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="grid gap-2.5 text-xs sm:gap-3 sm:text-sm">
                  <div className="rounded-lg bg-white/70 p-2.5 shadow-sm ring-1 ring-zinc-200 sm:rounded-xl sm:p-3">
                    <span className="block text-[10px] font-semibold uppercase tracking-wide text-blue-500 sm:text-xs">
                      Node.js
                    </span>
                    <div className="mt-1 text-zinc-700 leading-relaxed">
                      {item.node.split(' ').map((word, index) => {
                        const cleanWord = word.replace(/[.,]$/, '');
                        const explanations: Record<string, string> = {
                          'ES': 'ECMAScript - the standardized specification for JavaScript',
                          'modules': 'Modern way to organize and share JavaScript code',
                          'await': 'JavaScript feature for handling asynchronous operations',
                          'webpack': 'Popular JavaScript module bundler and build tool',
                          'ts-node': 'TypeScript execution environment for Node.js',
                          'vitest': 'Fast testing framework for modern JavaScript',
                        };

                        const explanation = explanations[cleanWord.toLowerCase()];
                        if (explanation) {
                          return (
                            <span key={index}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="border-b border-dotted border-zinc-400 hover:border-zinc-600 cursor-help">{word}</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {explanation}
                                </TooltipContent>
                              </Tooltip>
                              {index < item.node.split(' ').length - 1 ? ' ' : ''}
                            </span>
                          );
                        }
                        return word + (index < item.node.split(' ').length - 1 ? ' ' : '');
                      })}
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/70 p-2.5 shadow-sm ring-1 ring-zinc-200 sm:rounded-xl sm:p-3">
                    <span className="block text-[10px] font-semibold uppercase tracking-wide text-amber-500 sm:text-xs">
                      Bun
                    </span>
                    <div className="mt-1 text-zinc-700 leading-relaxed">
                      {item.bun.split(' ').map((word, index) => {
                        const cleanWord = word.replace(/[.,]$/, '');
                        const explanations: Record<string, string> = {
                          'bundler': 'Tool that combines multiple JavaScript files into optimized bundles',
                          'test': 'Automated process to verify code works correctly',
                          'runner': 'Tool that executes automated tests',
                          'transpiler': 'Tool that converts modern JavaScript to older compatible versions',
                          'JSX/TSX': 'Syntax extensions for writing HTML-like code in JavaScript/TypeScript',
                          'Web': 'Browser-compatible JavaScript APIs and features',
                          'APIs': 'Application Programming Interfaces for web standards',
                        };

                        const explanation = explanations[cleanWord.toLowerCase()] || explanations[cleanWord];
                        if (explanation) {
                          return (
                            <span key={index}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="border-b border-dotted border-zinc-400 hover:border-zinc-600 cursor-help">{word}</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {explanation}
                                </TooltipContent>
                              </Tooltip>
                              {index < item.bun.split(' ').length - 1 ? ' ' : ''}
                            </span>
                          );
                        }
                        return word + (index < item.bun.split(' ').length - 1 ? ' ' : '');
                      })}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-lg shadow-zinc-900/5 backdrop-blur sm:gap-8 sm:rounded-3xl sm:p-8 md:p-10">
          <div className="flex flex-col gap-2 sm:gap-3">
            <h2 className="text-xl font-semibold text-zinc-900 sm:text-2xl">Bun vs Node.js performance signals</h2>
            <p className="text-xs text-zinc-600 sm:text-sm">
              Real-world benchmarks from 2024-2025 community tests: Bun demonstrates 3-4× faster cold starts, ~4× higher HTTP throughput, 10-15× faster package installs, and 15× lower response latency compared to Node.js. Results vary by workload.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {runtimePerformance.map((item) => {
              const better = item.better ?? "higher";
              const directionIcon = better === "lower" ? "↓" : "↑";
              const nodeWidth = getRuntimeBarWidth(item.node, item);
              const bunWidth = getRuntimeBarWidth(item.bun, item);
              const nodeIsBetter = better === "higher" ? item.node > item.bun : item.node < item.bun;
              const bunIsBetter = better === "higher" ? item.bun > item.node : item.bun < item.node;

              return (
                <article
                  key={item.metric}
                  className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white/70 p-4 shadow-sm sm:gap-4 sm:rounded-2xl sm:p-6"
                >
                  <div className="flex items-start justify-between gap-2 sm:gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <h3 className="text-sm font-semibold text-zinc-900 sm:text-base">{item.metric}</h3>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-zinc-400 hover:text-zinc-600 cursor-help text-xs sm:text-sm">ⓘ</span>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[200px] sm:max-w-sm">
                            {item.metric === "Cold start latency" && "Time to start a runtime and execute code when it's not already running"}
                            {item.metric === "HTTP server throughput" && "Number of HTTP requests a server can handle per second"}
                            {item.metric === "Package install time" && "Time to download and install npm packages from registry"}
                            {item.metric === "Average response latency" && "Average time from request to response across all requests"}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <p className="mt-0.5 text-[10px] text-zinc-500 sm:mt-1 sm:text-xs">
                        {better === "lower" ? "Lower is better" : "Higher is better"} {directionIcon}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    <div className="space-y-1 sm:space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] sm:text-xs">
                        <span className="inline-flex items-center gap-1 font-medium text-blue-600 sm:gap-1.5">
                          <span className="text-sm sm:text-base">🟦</span>
                          <span className="hidden sm:inline">Node.js</span>
                          <span className="sm:hidden">Node</span>
                          {nodeIsBetter && <span className="text-[9px] rounded-full bg-blue-500/20 px-1 py-0.5 sm:text-[10px] sm:px-1.5">Win</span>}
                        </span>
                        <span className="font-semibold text-zinc-700">
                          {formatRuntimeValue(item.node, item.unit)}
                        </span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-lg bg-zinc-200 sm:h-4">
                        <div
                          className="h-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                          style={{ width: `${nodeWidth}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1 sm:space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] sm:text-xs">
                        <span className="inline-flex items-center gap-1 font-medium text-amber-600 sm:gap-1.5">
                          <span className="text-sm sm:text-base">🟧</span>
                          Bun
                          {bunIsBetter && <span className="text-[9px] rounded-full bg-amber-500/20 px-1 py-0.5 sm:text-[10px] sm:px-1.5">Win</span>}
                        </span>
                        <span className="font-semibold text-zinc-700">
                          {formatRuntimeValue(item.bun, item.unit)}
                        </span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-lg bg-zinc-200 sm:h-4">
                        <div
                          className="h-full rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500"
                          style={{ width: `${bunWidth}%` }}
                        />
                      </div>
                    </div>

                    {better === "lower" && item.node > 0 && item.bun > 0 && (
                      <div className="pt-1 text-center text-[10px] text-zinc-500 sm:pt-2 sm:text-xs">
                        Bun is <span className="font-semibold text-amber-600">{(item.node / item.bun).toFixed(1)}×</span> faster
                      </div>
                    )}
                    {better === "higher" && item.bun > 0 && item.node > 0 && (
                      <div className="pt-1 text-center text-[10px] text-zinc-500 sm:pt-2 sm:text-xs">
                        Bun handles <span className="font-semibold text-amber-600">{(item.bun / item.node).toFixed(1)}×</span> more
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-lg shadow-zinc-900/5 backdrop-blur sm:gap-8 sm:rounded-3xl sm:p-8 md:gap-10 md:p-10">
          <div className="flex flex-col gap-3 text-left sm:gap-4">
            <h2 className="text-xl font-semibold text-zinc-900 sm:text-2xl">React in context</h2>
            <p className="text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8 md:text-lg">
              React is a JavaScript library for building user interfaces through declarative, component-driven patterns. It sits between the runtime (Node.js or Bun) and the framework (Next.js, Remix, SvelteKit) that shapes routing, data fetching, and deployment strategy.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
            {[{
              title: "Component model",
              description: "Composable pieces of UI that manage their own state and render predictable markup.",
              icon: "🧩",
            },
            {
              title: "Hooks & state",
              description: "Hooks enable stateful logic to be shared and reused without class components.",
              icon: "🔄",
            },
            {
              title: "Rendering targets",
              description: "React can render on the client, stream from the server, or hydrate static output depending on the framework.",
              icon: "🌐",
            }].map((feature) => (
              <article
                key={feature.title}
                className="flex flex-col gap-2.5 rounded-xl border border-zinc-200 bg-white/70 p-4 shadow-sm sm:gap-3 sm:rounded-2xl sm:p-6"
              >
                <span className="text-xl sm:text-2xl">{feature.icon}</span>
                <h3 className="text-base font-semibold text-zinc-900 sm:text-lg">{feature.title}</h3>
                <p className="text-xs leading-5 text-zinc-600 sm:text-sm sm:leading-6">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-lg shadow-zinc-900/5 backdrop-blur sm:gap-8 sm:rounded-3xl sm:p-8 md:gap-10 md:p-10">
          <div className="flex flex-col gap-3 sm:gap-4">
            <h2 className="text-xl font-semibold text-zinc-900 sm:text-2xl">Framework landscape: Next.js vs Remix vs SvelteKit</h2>
            <p className="text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8 md:text-lg">
              Each framework builds on React (or in SvelteKit's case, the Svelte compiler) to deliver routing, data orchestration, and deployment ergonomics. Use the overview cards and feature matrix to spot the strengths at a glance.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {frameworkHighlights.map((framework) => (
              <article
                key={framework.name}
                className="flex h-full flex-col gap-3 rounded-xl border border-zinc-200 bg-white/70 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:gap-4 sm:rounded-2xl sm:p-6"
              >
                <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide sm:gap-2 sm:px-3 sm:text-xs ${framework.accent}`}>
                  {framework.name}
                </span>
                <p className="text-xs font-medium text-zinc-500 sm:text-sm">{framework.tagline}</p>
                <ul className="flex flex-1 list-disc flex-col gap-1.5 pl-4 text-xs leading-5 text-zinc-700 sm:gap-2 sm:pl-5 sm:text-sm sm:leading-6">
                  {framework.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="rounded-lg bg-zinc-100/80 p-3 text-xs text-zinc-700 sm:rounded-xl sm:p-4 sm:text-sm">
                  <span className="block text-[10px] font-semibold uppercase tracking-wide text-zinc-500 sm:text-xs">
                    Best suited for
                  </span>
                  <p className="mt-1">{framework.bestFor}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-dashed border-zinc-200 sm:rounded-2xl">
            <table className="min-w-full divide-y divide-zinc-200 text-left text-xs sm:text-sm">
              <thead className="bg-zinc-100/80">
                <tr className="text-[10px] uppercase tracking-wide text-zinc-500 sm:text-xs">
                  <th className="px-3 py-2 font-medium sm:px-4 sm:py-3">Capability</th>
                  <th className="px-3 py-2 font-medium sm:px-4 sm:py-3">Next.js</th>
                  <th className="px-3 py-2 font-medium sm:px-4 sm:py-3">Remix</th>
                  <th className="px-3 py-2 font-medium sm:px-4 sm:py-3">SvelteKit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white/80">
                {frameworkMatrix.map((row) => (
                  <tr key={row.capability} className="align-top text-zinc-700">
                    <td className="px-3 py-3 font-semibold text-zinc-900 sm:px-4 sm:py-4">{row.capability}</td>
                    <td className="px-3 py-3 sm:px-4 sm:py-4">{row.next}</td>
                    <td className="px-3 py-3 sm:px-4 sm:py-4">{row.remix}</td>
                    <td className="px-3 py-3 sm:px-4 sm:py-4">{row.svelte}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-lg shadow-zinc-900/5 backdrop-blur sm:gap-8 sm:rounded-3xl sm:p-8 md:p-10">
          <div className="flex flex-col gap-2 sm:gap-3">
            <h2 className="text-xl font-semibold text-zinc-900 sm:text-2xl">Framework performance deep dive</h2>
            <p className="text-xs text-zinc-600 sm:text-sm">
              Comprehensive performance metrics across four key dimensions: Lighthouse score (0-100), Time to First Byte (TTFB in ms, lower is better), initial bundle size (KB, lower is better), and production build time (seconds, lower is better). Data based on typical production deployments as of 2025.
          </p>
        </div>

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            {frameworkPerformance.map((fw) => {
              const metrics = [
                {
                  name: "Lighthouse Score",
                  value: fw.lighthouse,
                  max: 100,
                  unit: "/100",
                  better: "higher",
                  description: "Overall performance, accessibility, and best practices",
                },
                {
                  name: "Time to First Byte",
                  value: fw.ttfb,
                  max: 300,
                  unit: "ms",
                  better: "lower",
                  description: "Server response time for initial request",
                },
                {
                  name: "Bundle Size",
                  value: fw.bundleSize,
                  max: 150,
                  unit: "KB",
                  better: "lower",
                  description: "Initial JavaScript payload sent to client",
                },
                {
                  name: "Build Time",
                  value: fw.buildTime,
                  max: 20,
                  unit: "s",
                  better: "lower",
                  description: "Production build compilation time",
                },
              ];

              const colorClasses = {
                blue: {
                  badge: "bg-blue-500/10 text-blue-600",
                  bar: "bg-gradient-to-r from-blue-500 to-blue-600",
                },
                emerald: {
                  badge: "bg-emerald-500/10 text-emerald-600",
                  bar: "bg-gradient-to-r from-emerald-500 to-emerald-600",
                },
                orange: {
                  badge: "bg-orange-500/10 text-orange-600",
                  bar: "bg-gradient-to-r from-orange-500 to-orange-600",
                },
                purple: {
                  badge: "bg-purple-500/10 text-purple-600",
                  bar: "bg-gradient-to-r from-purple-500 to-purple-600",
                },
              };

              const colors = colorClasses[fw.color as keyof typeof colorClasses];

              return (
                <article
                  key={fw.framework}
                  className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white/70 p-4 shadow-sm sm:gap-5 sm:rounded-2xl sm:p-6"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl">{fw.icon}</span>
                      <div>
                        <h3 className="text-base font-semibold text-zinc-900 sm:text-lg">{fw.framework}</h3>
                        <p className="text-[10px] text-zinc-500 sm:text-xs">{fw.deployment}</p>
                      </div>
                    </div>
                    <span className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold sm:px-3 sm:text-xs ${colors.badge}`}>
                      Overall: {Math.round((fw.lighthouse + (300 - fw.ttfb) / 3 + (150 - fw.bundleSize) + (20 - fw.buildTime) * 2) / 4)}
                    </span>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {metrics.map((metric) => {
                      const normalizedValue = metric.better === "higher" 
                        ? (metric.value / metric.max) * 100 
                        : ((metric.max - metric.value) / metric.max) * 100;
                      const barWidth = Math.max(5, Math.min(100, normalizedValue));
                      
                      const isTopPerformer = 
                        (metric.better === "higher" && metric.value >= 98) ||
                        (metric.better === "lower" && metric.name === "Time to First Byte" && metric.value <= 100) ||
                        (metric.better === "lower" && metric.name === "Bundle Size" && metric.value <= 50) ||
                        (metric.better === "lower" && metric.name === "Build Time" && metric.value <= 7);

                      return (
                        <div key={metric.name} className="space-y-1.5 sm:space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-1.5 sm:gap-2">
                                <div className="flex items-center gap-1">
                                  <span className="text-[10px] font-semibold text-zinc-700 sm:text-xs">
                                    {metric.name}
                                  </span>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="text-zinc-400 hover:text-zinc-600 cursor-help text-[10px] sm:text-xs">ⓘ</span>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-[200px] sm:max-w-xs">
                                      {metric.name === "Lighthouse Score" && "Google's performance audit: measures loading, interactivity, and visual stability"}
                                      {metric.name === "Time to First Byte" && "Time from request to first byte of response - measures server responsiveness"}
                                      {metric.name === "Bundle Size" && "Size of JavaScript code sent to browser - affects loading speed"}
                                      {metric.name === "Build Time" && "Time to compile and optimize code for production deployment"}
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                                {isTopPerformer && (
                                  <span className="rounded-full bg-green-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-green-600 sm:px-2 sm:text-[10px]">
                                    ⭐ Best
                                  </span>
                                )}
                              </div>
                              <p className="mt-0.5 text-[9px] leading-tight text-zinc-500 sm:text-[10px]">
                                {metric.description}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-zinc-800 sm:text-sm">
                              {metric.value}
                              <span className="text-[10px] font-normal text-zinc-500 sm:text-xs">{metric.unit}</span>
                            </span>
                          </div>
                          <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-200 sm:h-2.5">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${colors.bar}`}
                              style={{ width: `${barWidth}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 p-4 sm:rounded-2xl sm:p-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl">💡</span>
              <div className="flex-1 space-y-1.5 text-xs text-zinc-600 sm:space-y-2 sm:text-sm">
                <p className="font-semibold text-zinc-800">Performance insights:</p>
                <ul className="space-y-1 pl-4 text-[10px] leading-relaxed sm:pl-5 sm:text-xs">
                  <li><strong>SvelteKit</strong> delivers the smallest bundles (38KB) and fastest builds (7s) with its compile-time optimization and zero client-side runtime.</li>
                  <li><strong>Remix</strong> achieves the best TTFB (85ms) through edge-first architecture and progressive enhancement patterns.</li>
                  <li><strong>Next.js</strong> provides the best Lighthouse score (97/100) with comprehensive performance optimizations and caching strategies.</li>
                  <li><strong>Plain React SPA</strong> has the slowest TTFB (320ms) and largest bundle (142KB) due to client-side only rendering and hydration overhead.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-lg shadow-zinc-900/5 backdrop-blur sm:gap-8 sm:rounded-3xl sm:p-8 md:p-10">
          <div className="flex flex-col gap-2 sm:gap-3">
            <h2 className="text-xl font-semibold text-zinc-900 sm:text-2xl">Serverless vs Traditional Server Hosting</h2>
            <p className="text-xs text-zinc-600 sm:text-sm">
              Understanding the deployment trade-offs between serverless platforms and traditional servers when choosing your JavaScript runtime and framework stack.
            </p>
            <div className="rounded-lg bg-zinc-100/80 p-3 sm:rounded-xl sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-base sm:text-lg">❓</span>
                <div className="text-[10px] text-zinc-700 sm:text-xs">
                  <strong>What is Serverless?</strong> Serverless computing means you don't manage physical servers. Instead of renting entire servers, you write code that runs in small, temporary containers only when needed. The cloud provider handles all infrastructure - scaling, security, and maintenance - while you pay only for actual usage.
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            <article className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white/70 p-4 shadow-sm sm:gap-4 sm:rounded-2xl sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">☁️</span>
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 sm:text-lg">Serverless Hosting</h3>
                  <p className="text-[10px] text-zinc-500 sm:text-xs">Vercel, Netlify, Cloudflare Workers, AWS Lambda</p>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:space-y-3 sm:text-sm">
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <p><strong>Zero maintenance:</strong> No server provisioning, scaling, or OS updates</p>
                </div>
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <p><strong>Auto-scaling:</strong> Handles traffic spikes automatically</p>
                </div>
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <p><strong>Edge deployment:</strong> Global CDN with low latency</p>
                </div>
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-amber-600 mt-0.5">⚠</span>
                  <p><strong>Cold starts:</strong> Initial requests can be 100-500ms slower</p>
                </div>
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-amber-600 mt-0.5">⚠</span>
                  <p><strong>Runtime limits:</strong> Execution time (10-30s) and memory caps</p>
                </div>
              </div>

              <div className="rounded-lg bg-green-50/80 p-2.5 sm:p-3">
                <p className="text-[10px] text-green-800 sm:text-xs">
                  <strong>Perfect for:</strong> Next.js, Remix, SvelteKit apps. Ideal for variable traffic, rapid prototyping, and when you want to focus on code rather than infrastructure.
                </p>
              </div>
            </article>

            <article className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white/70 p-4 shadow-sm sm:gap-4 sm:rounded-2xl sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">🖥️</span>
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 sm:text-lg">Traditional Server Hosting</h3>
                  <p className="text-[10px] text-zinc-500 sm:text-xs">VPS, Dedicated servers, Kubernetes, Railway</p>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:space-y-3 sm:text-sm">
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <p><strong>Predictable performance:</strong> No cold starts, consistent response times</p>
                </div>
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <p><strong>Full control:</strong> Choose runtime, dependencies, and system configuration</p>
                </div>
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <p><strong>Long-running tasks:</strong> No execution time limits</p>
                </div>
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-amber-600 mt-0.5">⚠</span>
                  <p><strong>Manual scaling:</strong> Requires load balancing and auto-scaling setup</p>
                </div>
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-amber-600 mt-0.5">⚠</span>
                  <p><strong>Maintenance overhead:</strong> OS updates, security patches, monitoring</p>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50/80 p-2.5 sm:p-3">
                <p className="text-[10px] text-blue-800 sm:text-xs">
                  <strong>Perfect for:</strong> Bun or Node.js apps with consistent traffic, custom requirements, long-running processes, or when performance predictability is critical.
                </p>
              </div>
            </article>
          </div>

          <div className="grid gap-4 sm:gap-6">
            <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 p-4 sm:rounded-2xl sm:p-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">🎯</span>
                <div className="flex-1 space-y-1.5 text-xs text-zinc-600 sm:space-y-2 sm:text-sm">
                  <p className="font-semibold text-zinc-800">Choosing the right hosting model:</p>
                  <ul className="space-y-1 pl-4 text-[10px] leading-relaxed sm:pl-5 sm:text-xs">
                    <li><strong>Serverless-first frameworks</strong> (Next.js, Remix, SvelteKit) work best on serverless platforms where their edge capabilities shine.</li>
                    <li><strong>Custom applications</strong> with specific runtime needs (Bun features, native dependencies) benefit from traditional servers.</li>
                    <li><strong>Hybrid approaches</strong> exist - deploy Next.js API routes serverlessly while using traditional hosting for complex backend services.</li>
                    <li><strong>Cost consideration:</strong> Serverless is cheaper for variable/spiky traffic; traditional servers for consistent high load.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:gap-4">
              <h3 className="text-base font-semibold text-zinc-900 sm:text-lg">Popular Serverless Platforms Comparison</h3>
              <div className="overflow-x-auto rounded-lg border border-zinc-200 sm:rounded-xl">
                <table className="min-w-full divide-y divide-zinc-200 text-left text-xs sm:text-sm">
                  <thead className="bg-zinc-100/80">
                    <tr className="text-[10px] uppercase tracking-wide text-zinc-500 sm:text-xs">
                      <th className="px-3 py-2 font-medium sm:px-4 sm:py-3">Platform</th>
                      <th className="px-3 py-2 font-medium sm:px-4 sm:py-3">Free Tier</th>
                      <th className="px-3 py-2 font-medium sm:px-4 sm:py-3">
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          <span className="hidden sm:inline">Cold Start</span>
                          <span className="sm:hidden">Cold</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-zinc-400 hover:text-zinc-600 cursor-help text-[10px] sm:text-xs">ⓘ</span>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[150px] sm:max-w-none">
                              Time to initialize a function after inactivity
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </th>
                      <th className="px-3 py-2 font-medium sm:px-4 sm:py-3">
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          <span className="hidden sm:inline">Execution Limit</span>
                          <span className="sm:hidden">Limit</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-zinc-400 hover:text-zinc-600 cursor-help text-[10px] sm:text-xs">ⓘ</span>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[150px] sm:max-w-none">
                              Maximum time a function can run
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </th>
                      <th className="px-3 py-2 font-medium sm:px-4 sm:py-3">
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          <span className="hidden sm:inline">Global Edge</span>
                          <span className="sm:hidden">Edge</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-zinc-400 hover:text-zinc-600 cursor-help text-[10px] sm:text-xs">ⓘ</span>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[150px] sm:max-w-none">
                              Worldwide data centers for low latency
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </th>
                      <th className="px-3 py-2 font-medium sm:px-4 sm:py-3">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 bg-white/80">
                    <tr className="align-top text-zinc-700">
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-semibold text-zinc-900">Vercel</div>
                          <div className="text-xs text-zinc-500">Next.js optimized</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600">
                          ✓ 100GB bandwidth
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs">50-200ms</td>
                      <td className="px-4 py-4 text-xs">15s</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600">
                          ✓ 29 regions
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs">Next.js, React apps</td>
                    </tr>
                    <tr className="align-top text-zinc-700">
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-semibold text-zinc-900">Cloudflare Workers</div>
                          <div className="text-xs text-zinc-500">Edge runtime</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600">
                          ✓ 100k requests/day
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs">
                        <span className="font-semibold text-green-600">1-50ms</span>
                      </td>
                      <td className="px-4 py-4 text-xs">30s</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600">
                          ✓ 300+ locations
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs">Global APIs, Remix</td>
                    </tr>
                    <tr className="align-top text-zinc-700">
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-semibold text-zinc-900">AWS Lambda</div>
                          <div className="text-xs text-zinc-500">Enterprise ecosystem</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600">
                          ✓ 1M requests/month
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs">200-1000ms</td>
                      <td className="px-4 py-4 text-xs">15min</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-600">
                          ⚠ Regional
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs">Enterprise, complex workflows</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                <div className="rounded-lg bg-blue-50/80 p-3 sm:p-4">
                  <h4 className="text-xs font-semibold text-blue-800 mb-1.5 sm:text-sm sm:mb-2">🏆 Top Picks by Use Case</h4>
                  <ul className="space-y-0.5 text-[10px] text-blue-700 sm:space-y-1 sm:text-xs">
                    <li><strong>Next.js apps:</strong> Vercel (optimized deployment)</li>
                    <li><strong>Global APIs:</strong> Cloudflare Workers (fastest cold starts)</li>
                    <li><strong>Enterprise:</strong> AWS Lambda (mature ecosystem)</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-amber-50/80 p-3 sm:p-4">
                  <h4 className="text-xs font-semibold text-amber-800 mb-1.5 sm:text-sm sm:mb-2">💰 Cost Considerations</h4>
                  <ul className="space-y-0.5 text-[10px] text-amber-700 sm:space-y-1 sm:text-xs">
                    <li><strong>Free tier:</strong> All platforms offer generous free tiers</li>
                    <li><strong>Pay per use:</strong> Request count × execution time</li>
                    <li><strong>Edge networks:</strong> Higher cost for global distribution</li>
                    <li><strong>Monitoring:</strong> Additional costs for advanced logging</li>
                  </ul>
                </div>
              </div>
            </div>
        </div>
        </section>

        <section className="grid gap-6 rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-lg shadow-zinc-900/5 backdrop-blur sm:gap-8 sm:rounded-3xl sm:p-8 md:gap-10 md:p-10">
          <div className="flex flex-col gap-2 sm:gap-3">
            <h2 className="text-xl font-semibold text-zinc-900 sm:text-2xl">Sources & references</h2>
            <p className="text-xs text-zinc-600 sm:text-sm">
              Metrics and qualitative comparisons in this guide pull from documentation, vendor benchmarks, and community
              measurements. Explore the original sources below for deeper context, methodology, and updates.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {referenceGroups.map((group) => (
              <article
                key={group.title}
                className="flex h-full flex-col gap-3 rounded-xl border border-zinc-200 bg-white/70 p-4 shadow-sm sm:gap-4 sm:rounded-2xl sm:p-6"
              >
                <h3 className="text-base font-semibold text-zinc-900 sm:text-lg">{group.title}</h3>
                <ul className="flex flex-1 list-disc flex-col gap-2 pl-4 text-xs leading-5 text-zinc-700 sm:gap-2.5 sm:pl-5 sm:text-sm sm:leading-6">
                  {group.references.map((ref) => (
                    <li key={ref.url} className="space-y-1">
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-blue-600 underline-offset-4 hover:text-blue-700 hover:underline"
                      >
                        {ref.label}
                      </a>
                      <p className="text-[11px] leading-snug text-zinc-500 sm:text-xs">{ref.summary}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-12 border-t border-zinc-200 bg-zinc-50/50 py-6 sm:py-8">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-12">
            <p className="text-xs text-zinc-500 sm:text-sm">
              Project by: Prithviraj Supekar
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
