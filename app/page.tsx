import Image from "next/image";

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
      accent: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      name: "Remix",
      tagline: "Progressive enhancement meets nested routing",
      highlights: ["Data loaders/actions run on the server", "Fine-grained error boundaries", "Streams responses for instant UX"],
      bestFor: "Teams who value web fundamentals, forms, and granular route control.",
      accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      name: "SvelteKit",
      tagline: "Compiler-driven UI with minimal runtime",
      highlights: ["Reactive syntax without virtual DOM", "File-based routing with server hooks", "Ships lean bundles by default"],
      bestFor: "Performance-sensitive apps and teams embracing the Svelte paradigm.",
      accent: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 font-sans dark:from-zinc-950 dark:via-black dark:to-zinc-950">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-16 sm:px-12">
        <section className="rounded-3xl border border-zinc-200 bg-white/80 p-10 shadow-xl shadow-zinc-900/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60 dark:shadow-black/20">
          <div className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
              <span className="text-xl">⚙️</span>
              Modern JavaScript runtime and framework comparison
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
              Node.js vs Bun, React fundamentals, and the frameworks that power the modern web
            </h1>
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              Understand how the platform, library, and framework layers fit together when you build with Next.js, Remix, or SvelteKit. This guide blends explanations with visual cues so you can decide what best suits your next project.
            </p>
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl border border-zinc-200 bg-white/80 p-10 shadow-lg shadow-zinc-900/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
          <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white flex items-center gap-3">
                <span className="flex items-center gap-2">
                  <Image
                    src="/node.png"
                    alt="Node.js logo"
                    width={32}
                    height={32}
                    className="rounded"
                  />
                  Node.js
                </span>
                <span className="text-zinc-400">vs</span>
                <span className="flex items-center gap-2">
                  <Image
                    src="/bun.png"
                    alt="Bun logo"
                    width={32}
                    height={32}
                    className="rounded"
                  />
                  Bun
                </span>
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300">
                Two JavaScript runtimes with different DNA. Node.js prioritizes stability and a vast ecosystem, while Bun focuses on speed and an all-in-one developer experience.
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                💡 <em>Hover over underlined terms</em> in the descriptions below for explanations of technical concepts.
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 font-medium text-blue-600 dark:text-blue-400">
                <span className="text-lg">🟦</span>
                Node.js
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 font-medium text-amber-600 dark:text-amber-400">
                <span className="text-lg">🟧</span>
                Bun
              </span>
            </div>
          </header>
          <div className="grid gap-5 sm:grid-cols-2">
            {runtimeComparison.map((item) => (
              <article
                key={item.metric}
                className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{item.metric}</h3>
                  <div className="group relative">
                    <span className="text-zinc-400 hover:text-zinc-600 cursor-help">ⓘ</span>
                    <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-zinc-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 max-w-sm">
                      {item.metric === "Startup speed" && "How quickly the runtime initializes and becomes ready to execute code"}
                      {item.metric === "Package ecosystem" && "Available libraries, tools, and community support through package registries"}
                      {item.metric === "Language features" && "Modern JavaScript/TypeScript features and standards compliance"}
                      {item.metric === "Runtime extras" && "Built-in tools like bundlers, test runners, and package managers"}
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 text-sm">
                  <div className="rounded-xl bg-white/70 p-3 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950/60 dark:ring-zinc-800">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-blue-500 dark:text-blue-400">
                      Node.js
                    </span>
                    <div className="mt-1 text-zinc-700 dark:text-zinc-300 leading-relaxed">
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
                              <span className="group relative cursor-help">
                                <span className="border-b border-dotted border-zinc-400 hover:border-zinc-600">{word}</span>
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                                  {explanation}
                                </div>
                              </span>
                              {index < item.node.split(' ').length - 1 ? ' ' : ''}
                            </span>
                          );
                        }
                        return word + (index < item.node.split(' ').length - 1 ? ' ' : '');
                      })}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/70 p-3 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950/60 dark:ring-zinc-800">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-amber-500 dark:text-amber-400">
                      Bun
                    </span>
                    <div className="mt-1 text-zinc-700 dark:text-zinc-300 leading-relaxed">
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
                              <span className="group relative cursor-help">
                                <span className="border-b border-dotted border-zinc-400 hover:border-zinc-600">{word}</span>
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                                  {explanation}
                                </div>
                              </span>
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

        <section className="grid gap-8 rounded-3xl border border-zinc-200 bg-white/80 p-10 shadow-lg shadow-zinc-900/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Bun vs Node.js performance signals</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Real-world benchmarks from 2024-2025 community tests: Bun demonstrates 3-4× faster cold starts, ~4× higher HTTP throughput, 10-15× faster package installs, and 15× lower response latency compared to Node.js. Results vary by workload.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
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
                  className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-zinc-900 dark:text-white">{item.metric}</h3>
                        <div className="group relative">
                          <span className="text-zinc-400 hover:text-zinc-600 cursor-help text-sm">ⓘ</span>
                          <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-zinc-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 max-w-sm">
                            {item.metric === "Cold start latency" && "Time to start a runtime and execute code when it's not already running"}
                            {item.metric === "HTTP server throughput" && "Number of HTTP requests a server can handle per second"}
                            {item.metric === "Package install time" && "Time to download and install npm packages from registry"}
                            {item.metric === "Average response latency" && "Average time from request to response across all requests"}
                          </div>
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        {better === "lower" ? "Lower is better" : "Higher is better"} {directionIcon}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="inline-flex items-center gap-1.5 font-medium text-blue-600 dark:text-blue-400">
                          <span className="text-base">🟦</span>
                          Node.js
                          {nodeIsBetter && <span className="text-[10px] rounded-full bg-blue-500/20 px-1.5 py-0.5">Winner</span>}
                        </span>
                        <span className="font-semibold text-zinc-700 dark:text-zinc-200">
                          {formatRuntimeValue(item.node, item.unit)}
                        </span>
                      </div>
                      <div className="h-4 w-full overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-800">
                        <div
                          className="h-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 dark:from-blue-400 dark:to-blue-500"
                          style={{ width: `${nodeWidth}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="inline-flex items-center gap-1.5 font-medium text-amber-600 dark:text-amber-400">
                          <span className="text-base">🟧</span>
                          Bun
                          {bunIsBetter && <span className="text-[10px] rounded-full bg-amber-500/20 px-1.5 py-0.5">Winner</span>}
                        </span>
                        <span className="font-semibold text-zinc-700 dark:text-zinc-200">
                          {formatRuntimeValue(item.bun, item.unit)}
                        </span>
                      </div>
                      <div className="h-4 w-full overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-800">
                        <div
                          className="h-full rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500 dark:from-amber-400 dark:to-amber-500"
                          style={{ width: `${bunWidth}%` }}
                        />
                      </div>
                    </div>

                    {better === "lower" && item.node > 0 && item.bun > 0 && (
                      <div className="pt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
                        Bun is <span className="font-semibold text-amber-600 dark:text-amber-400">{(item.node / item.bun).toFixed(1)}×</span> faster
                      </div>
                    )}
                    {better === "higher" && item.bun > 0 && item.node > 0 && (
                      <div className="pt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
                        Bun handles <span className="font-semibold text-amber-600 dark:text-amber-400">{(item.bun / item.node).toFixed(1)}×</span> more
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-10 rounded-3xl border border-zinc-200 bg-white/80 p-10 shadow-lg shadow-zinc-900/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="flex flex-col gap-4 text-left">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">React in context</h2>
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              React is a JavaScript library for building user interfaces through declarative, component-driven patterns. It sits between the runtime (Node.js or Bun) and the framework (Next.js, Remix, SvelteKit) that shapes routing, data fetching, and deployment strategy.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
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
                className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50"
              >
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{feature.title}</h3>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-10 rounded-3xl border border-zinc-200 bg-white/80 p-10 shadow-lg shadow-zinc-900/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Framework landscape: Next.js vs Remix vs SvelteKit</h2>
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              Each framework builds on React (or in SvelteKit’s case, the Svelte compiler) to deliver routing, data orchestration, and deployment ergonomics. Use the overview cards and feature matrix to spot the strengths at a glance.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {frameworkHighlights.map((framework) => (
              <article
                key={framework.name}
                className="flex h-full flex-col gap-4 rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950/60"
              >
                <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${framework.accent}`}>
                  {framework.name}
                </span>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{framework.tagline}</p>
                <ul className="flex flex-1 list-disc flex-col gap-2 pl-5 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                  {framework.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="rounded-xl bg-zinc-100/80 p-4 text-sm text-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Best suited for
                  </span>
                  <p className="mt-1">{framework.bestFor}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <table className="min-w-full divide-y divide-zinc-200 text-left text-sm dark:divide-zinc-800">
              <thead className="bg-zinc-100/80 dark:bg-zinc-900/70">
                <tr className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  <th className="px-4 py-3 font-medium">Capability</th>
                  <th className="px-4 py-3 font-medium">Next.js</th>
                  <th className="px-4 py-3 font-medium">Remix</th>
                  <th className="px-4 py-3 font-medium">SvelteKit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white/80 dark:divide-zinc-800 dark:bg-zinc-950/40">
                {frameworkMatrix.map((row) => (
                  <tr key={row.capability} className="align-top text-zinc-700 dark:text-zinc-200">
                    <td className="px-4 py-4 font-semibold text-zinc-900 dark:text-white">{row.capability}</td>
                    <td className="px-4 py-4">{row.next}</td>
                    <td className="px-4 py-4">{row.remix}</td>
                    <td className="px-4 py-4">{row.svelte}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-8 rounded-3xl border border-zinc-200 bg-white/80 p-10 shadow-lg shadow-zinc-900/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Framework performance deep dive</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Comprehensive performance metrics across four key dimensions: Lighthouse score (0-100), Time to First Byte (TTFB in ms, lower is better), initial bundle size (KB, lower is better), and production build time (seconds, lower is better). Data based on typical production deployments as of 2025.
          </p>
        </div>

          <div className="grid gap-6 lg:grid-cols-2">
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
                  badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                  bar: "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500",
                },
                emerald: {
                  badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                  bar: "bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500",
                },
                orange: {
                  badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
                  bar: "bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500",
                },
                purple: {
                  badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
                  bar: "bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500",
                },
              };

              const colors = colorClasses[fw.color as keyof typeof colorClasses];

              return (
                <article
                  key={fw.framework}
                  className="flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{fw.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{fw.framework}</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{fw.deployment}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${colors.badge}`}>
                      Overall: {Math.round((fw.lighthouse + (300 - fw.ttfb) / 3 + (150 - fw.bundleSize) + (20 - fw.buildTime) * 2) / 4)}
                    </span>
                  </div>

                  <div className="space-y-4">
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
                        <div key={metric.name} className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                                    {metric.name}
                                  </span>
                                  <div className="group relative">
                                    <span className="text-zinc-400 hover:text-zinc-600 cursor-help text-xs">ⓘ</span>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 max-w-xs">
                                      {metric.name === "Lighthouse Score" && "Google's performance audit: measures loading, interactivity, and visual stability"}
                                      {metric.name === "Time to First Byte" && "Time from request to first byte of response - measures server responsiveness"}
                                      {metric.name === "Bundle Size" && "Size of JavaScript code sent to browser - affects loading speed"}
                                      {metric.name === "Build Time" && "Time to compile and optimize code for production deployment"}
                                    </div>
                                  </div>
                                </div>
                                {isTopPerformer && (
                                  <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-semibold text-green-600 dark:text-green-400">
                                    ⭐ Best
                                  </span>
                                )}
                              </div>
                              <p className="mt-0.5 text-[10px] leading-tight text-zinc-500 dark:text-zinc-400">
                                {metric.description}
                              </p>
                            </div>
                            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100">
                              {metric.value}
                              <span className="text-xs font-normal text-zinc-500">{metric.unit}</span>
                            </span>
                          </div>
                          <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
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

          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 p-6 dark:border-zinc-700 dark:bg-zinc-900/30">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div className="flex-1 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                <p className="font-semibold text-zinc-800 dark:text-zinc-100">Performance insights:</p>
                <ul className="space-y-1 pl-5 text-xs leading-relaxed">
                  <li><strong>SvelteKit</strong> delivers the smallest bundles (38KB) and fastest builds (7s) with its compile-time optimization and zero client-side runtime.</li>
                  <li><strong>Remix</strong> achieves the best TTFB (85ms) through edge-first architecture and progressive enhancement patterns.</li>
                  <li><strong>Next.js</strong> provides the best Lighthouse score (97/100) with comprehensive performance optimizations and caching strategies.</li>
                  <li><strong>Plain React SPA</strong> has the slowest TTFB (320ms) and largest bundle (142KB) due to client-side only rendering and hydration overhead.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 rounded-3xl border border-zinc-200 bg-white/80 p-10 shadow-lg shadow-zinc-900/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Serverless vs Traditional Server Hosting</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Understanding the deployment trade-offs between serverless platforms and traditional servers when choosing your JavaScript runtime and framework stack.
            </p>
            <div className="rounded-xl bg-zinc-100/80 p-4 dark:bg-zinc-900/70">
              <div className="flex items-start gap-3">
                <span className="text-lg">❓</span>
                <div className="text-xs text-zinc-700 dark:text-zinc-200">
                  <strong>What is Serverless?</strong> Serverless computing means you don't manage physical servers. Instead of renting entire servers, you write code that runs in small, temporary containers only when needed. The cloud provider handles all infrastructure - scaling, security, and maintenance - while you pay only for actual usage.
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50">
              <div className="flex items-center gap-3">
                <span className="text-2xl">☁️</span>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Serverless Hosting</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Vercel, Netlify, Cloudflare Workers, AWS Lambda</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                  <p><strong>Zero maintenance:</strong> No server provisioning, scaling, or OS updates</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                  <p><strong>Auto-scaling:</strong> Handles traffic spikes automatically</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                  <p><strong>Edge deployment:</strong> Global CDN with low latency</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 mt-0.5">⚠</span>
                  <p><strong>Cold starts:</strong> Initial requests can be 100-500ms slower</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 mt-0.5">⚠</span>
                  <p><strong>Runtime limits:</strong> Execution time (10-30s) and memory caps</p>
                </div>
              </div>

              <div className="rounded-lg bg-green-50/80 p-3 dark:bg-green-950/30">
                <p className="text-xs text-green-800 dark:text-green-200">
                  <strong>Perfect for:</strong> Next.js, Remix, SvelteKit apps. Ideal for variable traffic, rapid prototyping, and when you want to focus on code rather than infrastructure.
                </p>
              </div>
            </article>

            <article className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🖥️</span>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Traditional Server Hosting</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">VPS, Dedicated servers, Kubernetes, Railway</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                  <p><strong>Predictable performance:</strong> No cold starts, consistent response times</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                  <p><strong>Full control:</strong> Choose runtime, dependencies, and system configuration</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                  <p><strong>Long-running tasks:</strong> No execution time limits</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 mt-0.5">⚠</span>
                  <p><strong>Manual scaling:</strong> Requires load balancing and auto-scaling setup</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 mt-0.5">⚠</span>
                  <p><strong>Maintenance overhead:</strong> OS updates, security patches, monitoring</p>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50/80 p-3 dark:bg-blue-950/30">
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  <strong>Perfect for:</strong> Bun or Node.js apps with consistent traffic, custom requirements, long-running processes, or when performance predictability is critical.
                </p>
              </div>
            </article>
          </div>

          <div className="grid gap-6">
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 p-6 dark:border-zinc-700 dark:bg-zinc-900/30">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div className="flex-1 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <p className="font-semibold text-zinc-800 dark:text-zinc-100">Choosing the right hosting model:</p>
                  <ul className="space-y-1 pl-5 text-xs leading-relaxed">
                    <li><strong>Serverless-first frameworks</strong> (Next.js, Remix, SvelteKit) work best on serverless platforms where their edge capabilities shine.</li>
                    <li><strong>Custom applications</strong> with specific runtime needs (Bun features, native dependencies) benefit from traditional servers.</li>
                    <li><strong>Hybrid approaches</strong> exist - deploy Next.js API routes serverlessly while using traditional hosting for complex backend services.</li>
                    <li><strong>Cost consideration:</strong> Serverless is cheaper for variable/spiky traffic; traditional servers for consistent high load.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Popular Serverless Platforms Comparison</h3>
              <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                <table className="min-w-full divide-y divide-zinc-200 text-left text-sm dark:divide-zinc-800">
                  <thead className="bg-zinc-100/80 dark:bg-zinc-900/70">
                    <tr className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      <th className="px-4 py-3 font-medium">Platform</th>
                      <th className="px-4 py-3 font-medium">Free Tier</th>
                      <th className="px-4 py-3 font-medium">
                        <div className="flex items-center gap-1">
                          Cold Start
                          <div className="group relative">
                            <span className="text-zinc-400 hover:text-zinc-600 cursor-help">ⓘ</span>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                              Time to initialize a function after inactivity
                            </div>
                          </div>
                        </div>
                      </th>
                      <th className="px-4 py-3 font-medium">
                        <div className="flex items-center gap-1">
                          Execution Limit
                          <div className="group relative">
                            <span className="text-zinc-400 hover:text-zinc-600 cursor-help">ⓘ</span>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                              Maximum time a function can run
                            </div>
                          </div>
                        </div>
                      </th>
                      <th className="px-4 py-3 font-medium">
                        <div className="flex items-center gap-1">
                          Global Edge
                          <div className="group relative">
                            <span className="text-zinc-400 hover:text-zinc-600 cursor-help">ⓘ</span>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                              Worldwide data centers for low latency
                            </div>
                          </div>
                        </div>
                      </th>
                      <th className="px-4 py-3 font-medium">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 bg-white/80 dark:divide-zinc-800 dark:bg-zinc-950/40">
                    <tr className="align-top text-zinc-700 dark:text-zinc-200">
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-semibold text-zinc-900 dark:text-white">Vercel</div>
                          <div className="text-xs text-zinc-500">Next.js optimized</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                          ✓ 100GB bandwidth
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs">50-200ms</td>
                      <td className="px-4 py-4 text-xs">15s</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                          ✓ 29 regions
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs">Next.js, React apps</td>
                    </tr>
                    <tr className="align-top text-zinc-700 dark:text-zinc-200">
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-semibold text-zinc-900 dark:text-white">Cloudflare Workers</div>
                          <div className="text-xs text-zinc-500">Edge runtime</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                          ✓ 100k requests/day
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs">
                        <span className="font-semibold text-green-600 dark:text-green-400">1-50ms</span>
                      </td>
                      <td className="px-4 py-4 text-xs">30s</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                          ✓ 300+ locations
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs">Global APIs, Remix</td>
                    </tr>
                    <tr className="align-top text-zinc-700 dark:text-zinc-200">
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-semibold text-zinc-900 dark:text-white">AWS Lambda</div>
                          <div className="text-xs text-zinc-500">Enterprise ecosystem</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                          ✓ 1M requests/month
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs">200-1000ms</td>
                      <td className="px-4 py-4 text-xs">15min</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                          ⚠ Regional
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs">Enterprise, complex workflows</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-blue-50/80 p-4 dark:bg-blue-950/30">
                  <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">🏆 Top Picks by Use Case</h4>
                  <ul className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                    <li><strong>Next.js apps:</strong> Vercel (optimized deployment)</li>
                    <li><strong>Global APIs:</strong> Cloudflare Workers (fastest cold starts)</li>
                    <li><strong>Enterprise:</strong> AWS Lambda (mature ecosystem)</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-amber-50/80 p-4 dark:bg-amber-950/30">
                  <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2">💰 Cost Considerations</h4>
                  <ul className="space-y-1 text-xs text-amber-700 dark:text-amber-300">
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

        
      </main>
    </div>
  );
}
