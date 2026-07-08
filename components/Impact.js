"use client";

import { motion } from "framer-motion";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";

const projects = [
  {
    title: "Agent Motif",
    role: "AI Video Generation Platform",
    description:
      "A local-first AI platform converting plain-English prompts into fully rendered MP4 videos without timeline editors or manual asset work. A multi-agent pipeline handles story planning, asset generation, motion synthesis, and final rendering end-to-end.",
    bullets: [
      "Agent platform with guardrails: runs as a structured multi-agent chain (Planning -> Asset gathering -> Motion direction -> TSX codegen -> Render), with authorization boundaries, per-job audit trails, and cost-gated degradation.",
      "Durable orchestration: Redis + BullMQ functions as a lightweight durable workflow engine — each job carries full state, survives process restarts, and retries idempotently with per-step status tracking.",
      "Strict inter-agent contract: Storyboard JSON (Zod-validated) is the rigid schema binding all agents, enforcing system-wide consistency and making schema drift structurally impossible.",
      "MCP & multi-provider LLM strategy: Claude Opus drives story planning; Claude Sonnet handles critique and codegen; DALL-E 3 and ElevenLabs are called via MCP-style tool interfaces.",
    ],
    architectureConcept: {
      title: "Case Study: Durable Queue State Engines",
      content:
        "Integrating dynamic image, audio, and code-generation models into an end-to-end rendering pipeline is prone to transient service failures and high LLM token costs. By leveraging Redis and BullMQ, we created a lightweight stateful workflow engine. If a rendering step fails, the queue maintains the job state and retries the specific step idempotently, saving compute and API costs.",
    },
    tech: [
      "Remotion",
      "Redis",
      "BullMQ",
      "SQLite/Prisma",
      "Claude API",
      "OpenAI API",
      "ElevenLabs",
      "FFmpeg",
      "MCP",
    ],
    links: {
      github: "https://github.com/Vamsi-027/agent-motif",
    },
  },
  {
    title: "Agent Echo",
    role: "Local-first Content Agent",
    description:
      "An autonomous, local-first agent that turns a developer's actual daily work into ready-to-review LinkedIn content.",
    bullets: [
      "Multi-source activity aggregation: pulls GitHub commits, Notion notes, browser history, and local file-system changes into a unified daily activity log.",
      "LLM-driven synthesis: Claude condenses a day's raw, heterogeneous activity into structured highlights, filtering post-worthy work from routine noise.",
      "Agentic drafting pipeline: LangGraph orchestrates a stateful multi-step graph (synthesis -> drafting -> self-critique/revision) to produce polished post drafts.",
      "Human-in-the-loop publishing: A Telegram bot delivers drafts for review, edit, and approval, with a scheduler handling timed publishing once approved.",
    ],
    architectureConcept: {
      title: "Case Study: LangGraph Stateful Orchestration",
      content:
        "Transforming raw daily activity logs into engaging narratives requires multiple loops of refinement (synthesis, drafting, reflection, and critique). Instead of using a single-shot LLM prompt, we model the workflow as a stateful graph in LangGraph. This allows nodes to reflect on their own outputs and iterate until they meet quality criteria.",
    },
    tech: [
      "Python",
      "TypeScript",
      "React",
      "Remotion",
      "Node.js",
      "SQLite",
      "Claude API",
      "ElevenLabs",
      "Manim",
      "FFmpeg",
    ],
    links: {
      github: "https://github.com/Vamsi-027/Agent-Echo",
    },
  },
  {
    title: "SaamCars – Vehicle Dealership Platform",
    role: "Full-Stack Development",
    description:
      "A vehicle dealership backend where dealers manage inventory and buyers book vehicles — requiring strict concurrency control and real-money payment handling via Stripe.",
    bullets: [
      "Authorization primitives: middleware-level RBAC separates dealer and buyer capabilities at the API layer — making unauthorized access structurally hard.",
      "Concurrency-safe reservations: reservation logic enforces stock validation and timeout handling to prevent double-bookings when two buyers attempt to reserve the same vehicle.",
      "Payment integrity: Stripe webhooks use signature verification and idempotent event handling to atomically synchronize payment events with booking state.",
      "Containerized environment: Docker Compose packages the API and PostgreSQL together for consistent local development and deployment parity.",
    ],
    tech: ["Node.js", "TypeScript", "PostgreSQL", "Stripe", "Docker"],
    links: {
      github: "https://github.com/vamsi-rebounz/SamCars-BE",
      live: "https://www.saamcars.com/",
    },
  },
];

const Impact = () => {
  return (
    <section
      id="projects"
      className="py-24 border-t border-border bg-background"
    >
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:flex justify-between items-end"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Projects</h2>
            <p className="text-muted-foreground text-sm">
              Case studies from production-grade systems.
            </p>
          </div>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
              className="group"
            >
              <div className="minimal-card overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  {/* Left Column: Context */}
                  <div className="p-8 lg:p-10 lg:col-span-2 border-b lg:border-b-0 lg:border-r border-border bg-[#050505]">
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                      {project.role}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-border rounded text-xs font-mono text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Details */}
                  <div className="p-8 lg:p-10 lg:col-span-3 bg-black flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-semibold mb-6 flex items-center text-foreground uppercase tracking-wider">
                        Key Deliverables
                      </h4>
                      <ul className="space-y-4 mb-8">
                        {project.bullets.map((bullet, i) => (
                          <li
                            key={i}
                            className="flex items-start text-muted-foreground text-sm"
                          >
                            <span className="text-border mr-3">—</span>
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {project.architectureConcept && (
                        <div className="pt-6 border-t border-border mt-4">
                          <h4 className="text-sm font-bold text-foreground mb-3 flex items-center tracking-wide">
                            <svg
                              className="w-4 h-4 mr-2 text-foreground"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                              />
                            </svg>
                            {project.architectureConcept.title}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.architectureConcept.content}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-12 pt-6 border-t border-border flex gap-4 flex-wrap">
                      {project.links && project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
                        >
                          <FiGithub /> View Source{" "}
                          <FiArrowUpRight className="opacity-50" />
                        </a>
                      )}
                      {project.links && project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live Demo <FiArrowUpRight className="opacity-50" />
                        </a>
                      )}
                      {(!project.links ||
                        (!project.links.github && !project.links.live)) && (
                        <span className="text-xs font-mono text-zinc-550">
                          // Proprietary / Local execution only
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
