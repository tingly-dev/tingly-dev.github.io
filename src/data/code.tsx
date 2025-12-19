import { useState } from "react";
import { Button as MuiButton } from "@mui/material";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
// Syntax Highlighter Imports
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('json', json);

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
    const [copied, setCopied] = useState(false);

    return (
        <div className="relative rounded-lg border w-full overflow-hidden bg-[#282c34]">
            <style dangerouslySetInnerHTML={{
                __html: `
                .force-wrap pre {
                    white-space: pre-wrap !important;
                    word-break: break-all !important;
                    overflow-wrap: anywhere !important;
                }
                @media (max-width: 768px) {
                    .force-wrap pre {
                        font-size: 0.65rem !important;
                        padding: 2rem 0.5rem 0.75rem 0.5rem !important;
                    }
                }
            `
            }} />

            <div
                className="absolute top-0 left-2 px-2 py-0.5 text-[10px] font-bold rounded-b bg-gray-700 text-white z-10 uppercase">
                {language}
            </div>
            {/* Copy button */}
            <button
                onClick={() => {
                    navigator.clipboard.writeText(code);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                }}
                className="absolute top-2 right-2 p-1.5 rounded bg-gray-700 hover:bg-gray-600 text-white text-xs transition-colors z-10"
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>

            <SyntaxHighlighter
                language={language}
                style={oneDark}
                wrapLines={true}
                wrapLongLines={true}
                className="force-wrap"
                customStyle={{
                    margin: 0,
                    padding: '2.5rem 0.75rem 1rem 0.75rem',
                    width: '100%',
                    boxSizing: 'border-box',
                    minHeight: 'auto',
                    fontSize: '0.75rem',
                    lineHeight: '1.5',
                    background: 'transparent',
                    overflowX: 'auto',
                    maxWidth: '100%',
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export const STEPS = [
    {
        title: "Start the Service",
        desc: "Choose between a quick local start or a persistent Docker deployment.",
        content: (
            <div className="space-y-4">
                <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold">
                        Option 1: Node.js (Recommended)
                    </p>
                    <CodeBlock language="bash" code="npx @tinglydev/tingly-box && tingly-box start" />
                </div>

                <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">
                        Option 2: Docker (Persistent)
                    </p>
                    <CodeBlock
                        language="bash"
                        code={`mkdir -p data/.tingly-box data/logs\ndocker run -d --name tingly-box \\\n  -p 12580:12580 \\\n  -v $(pwd)/data/.tingly-box:/app/.tingly-box \\\n  -v $(pwd)/data/logs:/app/logs \\\n  tingly-box:latest`}
                    />
                </div>
            </div>
        ),
    },
    {
        title: "Add Providers",
        desc: "Configure API keys for your preferred model providers.",
        content: (
            <div className="space-y-3 p-3 sm:p-4 bg-secondary/20 rounded-lg border border-white/5">
                <p className="text-sm font-medium">Access UI:</p>
                <div className="text-xs sm:text-sm text-cyan-400 font-mono break-all block bg-black/20 p-2 rounded">
                    http://localhost:12580/home?user_auth_token=tingly-box-user-token
                </div>
                <p className="text-xs text-muted-foreground italic">
                    Navigate to the <b>Provider</b> tab to add your API keys.
                </p>
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
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Claude Settings
                        (~/.claude/settings.json)</p>
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
            <div className="space-y-3 p-3 sm:p-4 bg-secondary/20 rounded-lg border border-white/5">
                <p className="text-sm font-medium">Go to UI:</p>
                <div className="text-xs sm:text-sm text-cyan-400 font-mono break-all block bg-black/20 p-2 rounded">
                    http://localhost:12580/home?user_auth_token=tingly-box-user-token
                </div>
                <p className="text-xs text-muted-foreground italic">
                    Simply click your favorite provider and model to start routing requests.
                </p>
            </div>
        ),
    }
];