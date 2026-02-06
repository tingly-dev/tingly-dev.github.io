import LightPatternBackground from "@/components/LightPatternBackground";
import Header from "@/components/Header";
import { faqs, features, screenshots } from "@/data/text";
import { Card, CardContent, Dialog, DialogContent, Button as MuiButton } from "@mui/material";
import {
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    X
} from "lucide-react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import {STEPS} from "@/data/code.tsx";

// Layout Constants
const SECTION_WIDTH = 1060;
const WIDTH_SCALE = 1;
const SCALED_WIDTH = `${SECTION_WIDTH * WIDTH_SCALE}px`; // 1060px (Hero image - full width)
const FULL_WIDTH = `${SECTION_WIDTH}px`; // 1060px (Content sections)


const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(0);

    const handleImageClick = (index: number) => {
        setPreviewImage(index);
        setPreviewOpen(true);
    };

    return (
        <>
            <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 gradient-bg-subtle">
                {/* Action Buttons - Top Right */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex flex-wrap justify-end gap-2 sm:gap-3 z-10">
                    <MuiButton
                        variant="contained"
                        href="https://github.com/tingly-dev/tingly-box"
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{ gap: '6px', fontSize: { xs: '0.8125rem', sm: '0.875rem' }, fontWeight: 500, py: 0.75, px: 1.25 }}
                    >
                        <FaGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        GitHub
                    </MuiButton>
                    <MuiButton
                        variant="outlined"
                        href="https://github.com/tingly-dev/tingly-box/releases"
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{ gap: '6px', fontSize: { xs: '0.8125rem', sm: '0.875rem' }, fontWeight: 500, py: 0.75, px: 1.25 }}
                    >
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Releases
                    </MuiButton>
                </div>

                {/* Hero Carousel - Full Focus */}
                <div className="relative w-full mx-auto px-2 sm:px-4" style={{ maxWidth: SCALED_WIDTH }}>
                    <div className="relative overflow-hidden rounded-2xl shadow-lg">
                        <img
                            src={screenshots[currentSlide].src}
                            alt={screenshots[currentSlide].alt}
                            className="w-full h-auto transition-opacity duration-300 cursor-pointer hover:opacity-95 rounded-2xl"
                            onClick={() => handleImageClick(currentSlide)}
                        />
                        <button
                            onClick={() => setCurrentSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length)}
                            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-xl bg-white/95 border border-gray-200/50 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all"
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                        </button>
                        <button
                            onClick={() => setCurrentSlide((prev) => (prev + 1) % screenshots.length)}
                            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-xl bg-white/95 border border-gray-200/50 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all"
                        >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                        </button>
                    </div>
                    <div className="flex justify-center gap-2 mt-4">
                        {screenshots.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`h-2 rounded-full transition-all ${i === currentSlide ? "bg-primary w-8" : "bg-slate-300 w-2 hover:bg-slate-400"}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Preview Dialog */}
            <Dialog
                open={previewOpen}
                onClose={() => setPreviewOpen(false)}
                maxWidth={false}
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        overflow: 'hidden',
                        margin: 0,
                        maxWidth: '100vw',
                        width: '100vw'
                    }
                }}
            >
                <DialogContent sx={{ p: 0, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button
                        onClick={() => setPreviewOpen(false)}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-900/80 text-white hover:bg-gray-900 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <img
                        src={screenshots[previewImage].src}
                        alt={screenshots[previewImage].alt}
                        className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain rounded-lg"
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {screenshots.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPreviewImage(i)}
                                className={`h-2 rounded-full transition-all ${i === previewImage ? "bg-white w-8" : "bg-white/50 w-2"}`}
                            />
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

const Features = () => (
    <section id="features" className="py-16 sm:py-20 px-4 bg-slate-50">
        {/* Light background container with rounded corners */}
        <div className="mx-auto rounded-2xl bg-white shadow-soft border border-slate-200"
            style={{ maxWidth: FULL_WIDTH, width: '100%' }}>
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {features.map((f) => (
                        <Card key={f.title} sx={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            opacity: 1,
                            transition: 'all 0.2s ease-in-out',
                            borderRadius: '8px',
                            '&:hover': {
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                borderColor: 'rgba(37, 99, 235, 0.4)',
                                opacity: 1,
                                transform: 'translateY(-2px)',
                            }
                        }}>
                            <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                                <f.icon className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-3 text-foreground">{f.title}</h3>
                                <p className="text-muted-foreground text-base leading-relaxed">{f.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    </section>
);


const QuickStart = () => {
    return (
        <section id="quick-start" className="py-16 sm:py-20 px-4 bg-white">
            {/* Light gradient background container with limited width */}
            <div className="mx-auto rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-soft border border-slate-200"
                style={{ maxWidth: FULL_WIDTH, width: '100%' }}>
                <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 tracking-tight text-foreground">Quick Start</h2>

                    <div className="relative">
                        {/* Vertical Center Line - Only show on md+ screens */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent hidden md:block" />

                        <div className="space-y-12 sm:space-y-16 md:space-y-20">
                            {STEPS.map((step, idx) => {
                                const isTextOnRight = idx % 2 === 0; // Step 1 (0), Step 3 (2)
                                const stepNum = idx + 1;

                                return (
                                    <div key={idx} className="relative flex flex-col md:flex-row items-center gap-4 md:gap-0">
                                        {/* Left Column */}
                                        <div className="w-full md:w-1/2 px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col">
                                            {!isTextOnRight ? (
                                                /* Even Steps (2, 4): Text on Left, Number on Right near line on desktop */
                                                <>
                                                    {/* Mobile: Number above content */}
                                                    <div className="md:hidden w-full text-center mb-3">
                                                        <span className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold shadow-md mx-auto">
                                                            {stepNum}
                                                        </span>
                                                    </div>
                                                    <div className="text-center md:text-right group w-full md:hidden mb-4">
                                                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors text-foreground mb-2">
                                                            {step.title}
                                                        </h3>
                                                        <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                                                    </div>
                                                    {/* Desktop: Text and Number aligned */}
                                                    <div className="hidden md:flex items-center justify-end gap-4 mb-3">
                                                        <div className="text-right group">
                                                            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors text-foreground">
                                                                {step.title}
                                                            </h3>
                                                            <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                                                        </div>
                                                        <span className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold shadow-md">
                                                            {stepNum}
                                                        </span>
                                                    </div>
                                                </>
                                            ) : (
                                                /* Odd Steps (1, 3): Code on Left */
                                                <>
                                                    {/* Mobile: Number above code */}
                                                    <div className="md:hidden w-full text-center mb-3">
                                                        <span className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold shadow-md mx-auto">
                                                            {stepNum}
                                                        </span>
                                                    </div>
                                                    <div className="w-full">
                                                        {step.content}
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Desktop Number for odd steps - positioned absolutely at center line */}
                                        {isTextOnRight && (
                                            <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
                                                <span className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold shadow-md">
                                                    {stepNum}
                                                </span>
                                            </div>
                                        )}

                                        {/* Right Column */}
                                        <div className="w-full md:w-1/2 px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col mt-4 md:mt-0">
                                            {isTextOnRight ? (
                                                /* Odd Steps (1, 3): Text on Right */
                                                <>
                                                    {/* Mobile text content */}
                                                    <div className="text-center md:text-left group w-full md:hidden">
                                                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors text-foreground mb-2">
                                                            {step.title}
                                                        </h3>
                                                        <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                                                    </div>
                                                    {/* Desktop layout with number already handled above */}
                                                    <div className="hidden md:block text-left group w-full">
                                                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors text-foreground mb-2">
                                                            {step.title}
                                                        </h3>
                                                        <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                                                    </div>
                                                </>
                                            ) : (
                                                /* Even Steps (2, 4): Visual/Link on Right */
                                                <div className="w-full">
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
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="py-8 sm:py-12 px-4 border-t border-gray-200 bg-white">
        <div className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ maxWidth: FULL_WIDTH, width: '100%' }}>
            <div className="text-muted-foreground text-sm text-center sm:text-left">MPL-2.0 License © {new Date().getFullYear()} Tingly Box</div>
            <MuiButton
                href="https://github.com/tingly-dev/tingly-box"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />}
                sx={{
                    color: 'var(--muted-foreground)',
                    '&:hover': {
                        color: 'var(--foreground)',
                    }
                }}
            >
                GitHub
            </MuiButton>
        </div>
    </footer>
);

const FAQ = () => {
    return (
        <section id="faq" className="py-12 sm:py-16 px-4 bg-slate-50">
            <div className="mx-auto rounded-2xl bg-white shadow-soft border border-slate-200"
                style={{ maxWidth: FULL_WIDTH, width: '100%' }}>
                <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4">Frequently Asked Questions</h2>
                    <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
                        Common questions about Tingly Box
                    </p>

                    {/* Accordion-style FAQ */}
                    <div className="max-w-4xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all duration-200">
                                <h3 className="text-lg font-semibold mb-2 flex items-start gap-3">
                                    <span
                                        className="flex-shrink-0 w-8 h-8 bg-blue-100 text-primary rounded-lg flex items-center justify-center text-sm font-semibold mt-0.5">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span className="text-foreground leading-tight">{faq.question}</span>
                                </h3>
                                <p className="ml-11 text-muted-foreground leading-relaxed text-base">
                                    {faq.answer.split('\n').map((paragraph, i) => (
                                        <span key={i}>
                                            {paragraph.startsWith('http') || paragraph.includes('://') ? (
                                                <span className="break-all">{paragraph}</span>
                                            ) : (
                                                paragraph
                                            )}
                                            {i < faq.answer.split('\n').length - 1 && <br />}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Additional help */}
                    <div className="mt-12 sm:mt-16 text-center">
                        <p className="text-base sm:text-lg mb-4 text-foreground">Still have questions?</p>
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                            <MuiButton
                                variant="outlined"
                                href="https://github.com/tingly-dev/tingly-box/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                                startIcon={<ExternalLink className="w-4 h-4" />}
                                size="small"
                                sx={{ fontSize: { xs: '0.9375rem', sm: '1rem' }, fontWeight: 500 }}
                            >
                                Ask on GitHub
                            </MuiButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Index = () => (
    <main className="min-h-screen relative bg-background">
        <LightPatternBackground />
        <Header />
        <Hero />
        <Features />
        <QuickStart />
        <FAQ />
        <Footer />
    </main>
);

export default Index;