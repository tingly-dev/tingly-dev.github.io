import {useState} from "react";
import {
    Copy,
    Check,
    ExternalLink,
    Layers,
    ChevronLeft,
    ChevronRight,
    Globe,
    ArrowLeftRight,
    Gauge,
} from "lucide-react";
import {FaGithub} from "react-icons/fa";
import {Button} from "@/components/ui/button";

// Syntax Highlighter Imports
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import {oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';

SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('json', json);

// Layout Constants
const SECTION_WIDTH = 1060;
const WIDTH_SCALE = 0.9;
const SCALED_WIDTH = `${SECTION_WIDTH * WIDTH_SCALE}px`; // ~954px (Hero image only)
const FULL_WIDTH = `${SECTION_WIDTH}px`; // 1060px (Content sections)

import screenshotHome from "@/assets/screenshot-home.png";
import screenshotCredentials from "@/assets/screenshot-credentials.png";
import screenshotRules from "@/assets/screenshot-rules.png";
import screenshotSystem from "@/assets/screenshot-system.png";
import screenshotHistory from "@/assets/screenshot-history.png";

const screenshots = [
    {src: screenshotHome, alt: "Tingly Box Home - Model Proxy Config"},
    {src: screenshotCredentials, alt: "Tingly Box Credentials Management"},
    {src: screenshotRules, alt: "Tingly Box Proxy Rules Configuration"},
    {src: screenshotSystem, alt: "Tingly Box Server Status & Control"},
    {src: screenshotHistory, alt: "Tingly Box Activity Log & History"},
];

const features = [
    {icon: Globe, title: "Unified API", description: "Single configuration to connect hundreds of model providers."},
    {icon: Layers, title: "Load Balancing", description: "Distribute requests across multiple tokens by tactics."},
    {
        icon: ArrowLeftRight,
        title: "Auto API Translation",
        description: "Automatically translate API parameters among different providers."
    },
    {icon: Gauge, title: "High Performance", description: "Additional latency less than 1ms for seamless integration."},
];


const CodeBlock = ({code, language}: { code: string; language: string }) => {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative rounded-lg border w-full h-full overflow-hidden bg-[#282c34]">
            {/* The "Nuclear" wrap fix ensures long strings break regardless of library defaults */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .force-wrap pre {
                    white-space: pre-wrap !important;
                    word-break: break-all !important;
                    overflow-wrap: anywhere !important;
                    overflow-x: hidden !important;
                }
                .force-wrap code {
                    white-space: pre-wrap !important;
                }
                .force-wrap span {
                    white-space: pre-wrap !important;
                    word-break: break-all !important;
                }
            `
            }}/>

            <div className="absolute top-0 left-2 px-2 py-0.5 text-xs font-bold rounded-b bg-gray-700 text-white z-10">
                {language}
            </div>

            <button
                onClick={copy}
                className="absolute top-2 right-2 p-1.5 rounded hover:bg-white/10 z-20 transition-colors"
            >
                {copied ? <Check className="w-4 h-4 text-green-400"/> : <Copy className="w-4 h-4 text-white/70"/>}
            </button>

            <SyntaxHighlighter
                language={language}
                style={oneDark}
                wrapLines={true}
                wrapLongLines={true}
                className="force-wrap"
                customStyle={{
                    margin: 0,
                    padding: '2.5rem 1rem 1.5rem 1rem',
                    width: '100%',
                    boxSizing: 'border-box',
                    minHeight: '280px',
                    height: '100%',
                    fontSize: '0.825rem',
                    lineHeight: '1.6',
                    background: 'transparent',
                    overflowX: 'hidden',
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    return (
        <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-primary">Tingly</span> Box
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10">
                Provider-agnostic AI model proxy with unified API
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
                <Button asChild size="lg" className="gap-2">
                    <a href="https://github.com/tingly-dev/tingly-box" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="w-5 h-5"/> GitHub
                    </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                    <a href="https://github.com/tingly-dev/tingly-box/releases" target="_blank"
                       rel="noopener noreferrer">
                        <ExternalLink className="w-5 h-5"/> Releases
                    </a>
                </Button>
            </div>

            {/* Application of SCALED_WIDTH (0.9x) only to the carousel */}
            <div className="relative w-full mx-auto" style={{maxWidth: SCALED_WIDTH}}>
                <div className="relative overflow-hidden rounded-lg border bg-card shadow-lg">
                    <img
                        src={screenshots[currentSlide].src}
                        alt={screenshots[currentSlide].alt}
                        className="w-full h-auto transition-opacity duration-300"
                    />
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 border hover:bg-background transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5"/>
                    </button>
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % screenshots.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 border hover:bg-background transition-colors"
                    >
                        <ChevronRight className="w-5 h-5"/>
                    </button>
                </div>
                <div className="flex justify-center gap-2 mt-4">
                    {screenshots.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? "bg-primary w-4" : "bg-muted"}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Features = () => (
    <section className="py-12 px-4">
        <div className="mx-auto" style={{maxWidth: FULL_WIDTH}}>
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((f) => (
                    <div key={f.title} className="p-6 rounded-lg bg-card border">
                        <f.icon className="w-10 h-10 text-primary mb-4"/>
                        <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                        <p className="text-muted-foreground">{f.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const STEPS = [
    {
        title: "Start the Service",
        desc: "Choose between a quick local start or a persistent Docker deployment.",
        content: (
            <div className="space-y-4">
                {/* Option A: NPX */}
                <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-lg">
                    <p className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold mb-2">Option 1: Node.js
                        (Recommended)</p>
                    <code className="text-[11px] block text-slate-300">npx @tinglydev/tingly-box && tingly-box
                        start</code>
                </div>

                {/* Option B: Docker */}
                <div className="p-3 bg-blue-950/20 border border-blue-500/30 rounded-lg">
                    <p className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-2">Option 2: Docker
                        (Persistent)</p>
                    <pre className="text-[10px] leading-relaxed text-slate-300 overflow-x-auto">
                    {`mkdir -p data/.tingly-box data/logs \\
docker run -d --name tingly-box \\
  -p 12580:12580 \\
  -v $(pwd)/data/.tingly-box:/app/.tingly-box \\
  -v $(pwd)/data/logs:/app/logs \\
  tingly-box:latest`}
                    </pre>
                </div>
            </div>
        ),
    },
    {
        title: "Add Providers",
        desc: "Configure API keys for your preferred model providers.",
        content: (
            <div className="space-y-2">
                <p className="text-sm">Access UI: <span
                    className="text-cyan-400 font-mono font-bold">http://localhost:12580/home?user_auth_token=tingly-box-user-token</span>
                </p>
                <p className="text-xs text-slate-400">Navigate to the <b>Credentials</b> tab to add your API keys.</p>
            </div>
        ),
    },
    {
        title: "Use It",
        desc: "Seamlessly integrate with your Python applications or Claude Desktop settings.",
        content: (
            <div className="space-y-4">
                <div className="space-y-2">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Python SDK</p>
                    <CodeBlock
                        language="python"
                        code={`import openai\n\nclient = openai.OpenAI(\n    base_url = "http://localhost:12580/openai",\n    api_key = "YOUR_TINGLY_BOX_KEY"\n)\n\n# Use as before\nresponse = client.chat.completions.create(\n    model = "tingly",\n    messages = [{"role": "user", "content": "Hello!"}]\n)`}
                    />
                </div>
                <div className="space-y-2">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Claude Settings (~/.claude/settings.json)</p>
                    <CodeBlock
                        language="json"
                        code={`{\n  "env": {\n    "ANTHROPIC_AUTH_TOKEN": "{tingly-box-token}",\n    "ANTHROPIC_BASE_URL": "http://localhost:12580/anthropic",\n    "ANTHROPIC_MODEL": "tingly"\n  }\n}`}
                    />
                </div>
            </div>
        ),
    },
    {
        title: "Choose Provider & Model",
        desc: "Access your ui homepage to select and activate your favorite models.",
        content: (
            <div className="space-y-3 p-4 bg-secondary/20 rounded-lg border border-white/5">
                <p className="text-sm font-medium">Go to UI:</p>
                <a
                    href="http://localhost:12580/home?user_auth_token=tingly-box-user-token"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 font-mono break-all hover:underline block bg-black/20 p-2 rounded"
                >
                    http://localhost:12580/home?user_auth_token=tingly-box-user-token
                </a>
                <p className="text-xs text-muted-foreground italic">
                    Simply click your favorite provider and model to start routing requests.
                </p>
            </div>
        ),
    }
];

const QuickStart = () => {
    return (
        <section className="py-20 px-4 bg-[#0B0E14] text-slate-200">
            <div className="mx-auto max-w-5xl">
                <h2 className="text-3xl font-bold text-center mb-16 tracking-tight">Quick Start</h2>

                <div className="relative">
                    {/* Vertical Center Line */}
                    <div
                        className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent hidden md:block"/>

                    <div className="space-y-20">
                        {STEPS.map((step, idx) => {
                            const isTextOnRight = idx % 2 === 0; // Even index (Step 1, 3)
                            const stepNum = idx + 1;

                            return (
                                <div key={idx} className="relative flex flex-col md:flex-row items-center">

                                    {/* Left Column */}
                                    <div
                                        className={`w-full md:w-1/2 px-10 flex flex-col ${isTextOnRight ? 'md:items-end' : 'md:items-end'}`}>
                                        {!isTextOnRight ? (
                                            /* Step 2, 4 (Text on Left) - Number is on the RIGHT near line */
                                            <div className="text-right group">
                                                <div className="flex items-center justify-end gap-4 mb-3">
                                                    <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">{step.title}</h3>
                                                    <span
                                                        className="w-8 h-8 flex-shrink-0 bg-cyan-400 text-black rounded-full flex items-center justify-center font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                                                    {stepNum}
                                                    </span>
                                                </div>
                                                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                                            </div>
                                        ) : (
                                            /* Step 1, 3 (Code/Visual on Left) */
                                            <div
                                                className="w-full bg-[#11161D] border border-slate-800 rounded-2xl p-6 shadow-2xl">
                                                {step.content}
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Column */}
                                    <div
                                        className={`w-full md:w-1/2 px-10 mt-8 md:mt-0 flex flex-col ${isTextOnRight ? 'md:items-start' : 'md:items-start'}`}>
                                        {isTextOnRight ? (
                                            /* Step 1, 3 (Text on Right) - Number is on the LEFT near line */
                                            <div className="text-left group">
                                                <div className="flex items-center justify-start gap-4 mb-3">
                                                  <span
                                                      className="w-8 h-8 flex-shrink-0 bg-cyan-400 text-black rounded-full flex items-center justify-center font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                                                    {stepNum}
                                                  </span>
                                                    <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">{step.title}</h3>
                                                </div>
                                                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                                            </div>
                                        ) : (
                                            /* Step 2, 4 (Visual on Right) */
                                            <div
                                                className="w-full bg-[#11161D] border border-slate-800 rounded-2xl p-6 shadow-2xl">
                                                {step.content}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="py-12 px-4 border-t">
        <div className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
             style={{maxWidth: FULL_WIDTH}}>
            <div className="text-muted-foreground text-sm">MIT License © {new Date().getFullYear()} Tingly Box</div>
            <a href="https://github.com/tingly-dev/tingly-box" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <FaGithub className="w-5 h-5"/> GitHub
            </a>
        </div>
    </footer>
);

const FAQ = () => {
    const faqs = [
        {
            question: "Can i use tingly-box running on host  for applications in docker container?",
            answer: "Yes, change your base url to http://host.docker.internal:12580/{anthropic/openai} accordingly"
        },
        {
            question: "How does load balancing work?",
            answer: "Tingly Box automatically distributes requests across multiple API tokens using routing tactics, by default round-robin with request threshold (100 if not configured)."
        }
    ];

    return (
        <section id="faq-section" className="py-16 px-4 bg-gradient-to-t from-background via-background to-card/20">
            <div className="mx-auto" style={{maxWidth: FULL_WIDTH}}>
                <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Common questions about Tingly Box
                </p>

                {/* Accordion-style FAQ */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-border/50 pb-4 last:border-0">
                            <h3 className="text-lg font-semibold mb-2 flex items-start gap-3">
                                <span
                                    className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-mono mt-0.5">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="text-foreground">{faq.question}</span>
                            </h3>
                            <p className="ml-9 text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>

                {/* Additional help */}
                <div className="mt-16 text-center">
                    <p className="text-lg mb-4">Still have questions?</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild variant="outline">
                            <a href="https://github.com/tingly-dev/tingly-box/issues" target="_blank"
                               rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2"/>
                                Ask on GitHub
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Index = () => (
    <main className="min-h-screen">
        <Hero/>
        <Features/>
        <QuickStart/>
        <FAQ/>
        <Footer/>
    </main>
);

export default Index;