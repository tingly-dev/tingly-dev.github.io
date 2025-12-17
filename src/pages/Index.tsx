import { useState } from "react";
import {
    Copy,
    Check,
    Github,
    ExternalLink,
    Layers,
    Zap,
    Settings,
    Layout,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Button } from "@mui/material";

// Syntax Highlighter Imports
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
    { src: screenshotHome, alt: "Tingly Box Home - Model Proxy Config" },
    { src: screenshotCredentials, alt: "Tingly Box Credentials Management" },
    { src: screenshotRules, alt: "Tingly Box Proxy Rules Configuration" },
    { src: screenshotSystem, alt: "Tingly Box Server Status & Control" },
    { src: screenshotHistory, alt: "Tingly Box Activity Log & History" },
];

const features = [
    {
        icon: Layers,
        title: "Multi-Provider Support",
        description: "Connect to OpenAI, Anthropic, Google, and more through a single interface."
    },
    {
        icon: Zap,
        title: "Unified API",
        description: "OpenAI-compatible API that works with all your existing tools and libraries."
    },
    {
        icon: Settings,
        title: "Config-Based Routing",
        description: "Route requests to different providers based on model names and custom rules."
    },
    {
        icon: Layout,
        title: "Web Management UI",
        description: "Monitor usage, manage API keys, and configure providers through a clean interface."
    },
];

const pythonExample = `import openai

client = openai.OpenAI(
  base_url = "http://localhost:12580/openai",
  api_key = "YOUR_TINGLY_BOX_KEY"
)

# Use as before
response = client.chat.completions.create(
  model = "tingly",
  messages = [{"role": "user","content": "Hello!"}]
)`;

const jsonExample = `
# Update your ~/.claude/settings.json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "{tingly-box-token}",
    "ANTHROPIC_BASE_URL": "http://localhost:8080/anthropic",
    "ANTHROPIC_MODEL": "tingly"
  }
}`;

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
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
            }} />

            <div className="absolute top-0 left-2 px-2 py-0.5 text-xs font-bold rounded-b bg-gray-700 text-white z-10">
                {language}
            </div>

            <button
                onClick={copy}
                className="absolute top-2 right-2 p-1.5 rounded hover:bg-white/10 z-20 transition-colors"
            >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/70" />}
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
                <Button
                    variant="contained"
                    size="large"
                    component="a"
                    href="https://github.com/tingly-dev/tingly-box"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Github className="w-5 h-5" /> GitHub
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    component="a"
                    href="https://github.com/tingly-dev/tingly-box/blob/main/README.md"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ExternalLink className="w-5 h-5" /> Documentation
                </Button>
            </div>

            {/* Application of SCALED_WIDTH (0.9x) only to the carousel */}
            <div className="relative w-full mx-auto" style={{ maxWidth: SCALED_WIDTH }}>
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
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % screenshots.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 border hover:bg-background transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
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
        <div className="mx-auto" style={{ maxWidth: FULL_WIDTH }}>
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((f) => (
                    <div key={f.title} className="p-6 rounded-lg bg-card border">
                        <f.icon className="w-10 h-10 text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                        <p className="text-muted-foreground">{f.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const QuickStart = () => (
    <section className="py-12 px-4 bg-card/50">
        <div className="mx-auto" style={{ maxWidth: FULL_WIDTH }}>
            <h2 className="text-3xl font-bold text-center mb-6">Quick Start</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="min-w-0 w-full">
                    <CodeBlock code={pythonExample} language="python" />
                </div>
                <div className="min-w-0 w-full">
                    <CodeBlock code={jsonExample} language="json" />
                </div>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="py-12 px-4 border-t">
        <div className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
             style={{ maxWidth: FULL_WIDTH }}>
            <div className="text-muted-foreground text-sm">MIT License © {new Date().getFullYear()} Tingly Box</div>
            <a href="https://github.com/tingly-dev/tingly-box" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Github className="w-5 h-5" /> GitHub
            </a>
        </div>
    </footer>
);

const Index = () => (
    <main className="min-h-screen">
        <Hero />
        <Features />
        <QuickStart />
        <Footer />
    </main>
);

export default Index;