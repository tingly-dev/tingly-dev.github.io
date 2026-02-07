import { useState } from "react";
import LightPatternBackground from "@/components/LightPatternBackground";
import Header from "@/components/Header";
import { faqs, features, screenshots, heroImage } from "@/data/text";
import { Card, CardContent, Dialog, DialogContent, Button as MuiButton } from "@mui/material";
import {
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    X,
    ChevronDown
} from "lucide-react";
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import {STEPS} from "@/data/code.tsx";

// Layout Constants
const SECTION_WIDTH = 1060;
const WIDTH_SCALE = 1;
const SCALED_WIDTH = `${SECTION_WIDTH * WIDTH_SCALE}px`; // 1060px (Hero image - full width)
const FULL_WIDTH = `${SECTION_WIDTH}px`; // 1060px (Content sections)


const Hero = () => {
    return (
        <section className="pt-20 pb-8 sm:pt-24 sm:pb-10 md:pt-28 md:pb-12 px-3 sm:px-4">
            {/* Static Hero Image */}
            <div className="w-full mx-auto px-2 sm:px-3 md:px-4" style={{ maxWidth: SCALED_WIDTH }}>
                <img
                    src={heroImage.src}
                    alt={heroImage.alt}
                    className="w-full h-auto rounded-2xl shadow-lg"
                />
            </div>
        </section>
    );
};

const Gallery = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const handleImageClick = (index: number) => {
        setPreviewImage(index);
        setPreviewOpen(true);
    };

    // Auto-play carousel
    useEffect(() => {
        if (isPaused || previewOpen) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % screenshots.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, previewOpen]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % screenshots.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length);

    return (
        <>
            <section className="py-6 sm:py-10 md:py-14 px-3 sm:px-4">
                {/* Container with card style */}
                <div className="mx-auto rounded-2xl bg-white/80 backdrop-blur-sm shadow-soft border border-slate-200"
                    style={{ maxWidth: FULL_WIDTH, width: '100%' }}>
                    <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 md:py-10">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-3 sm:mb-4">Product Gallery</h2>
                        <p className="text-center text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
                            Take a closer look at Tingly Box in action
                        </p>

                        <div
                            className="relative overflow-hidden rounded-2xl shadow-lg mx-auto"
                            style={{ maxWidth: SCALED_WIDTH }}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            <img
                                src={screenshots[currentSlide].src}
                                alt={screenshots[currentSlide].alt}
                                className="w-full h-auto transition-opacity duration-300 cursor-pointer hover:opacity-95 rounded-2xl"
                                onClick={() => handleImageClick(currentSlide)}
                            />
                            <button
                                onClick={() => { prevSlide(); setIsPaused(true); }}
                                className="absolute left-3 sm:left-3 top-1/2 -translate-y-1/2 p-3 sm:p-3 rounded-xl bg-white/95 border border-gray-200/50 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-5 h-5 sm:w-5 sm:h-5 text-gray-700" />
                            </button>
                            <button
                                onClick={() => { nextSlide(); setIsPaused(true); }}
                                className="absolute right-3 sm:right-3 top-1/2 -translate-y-1/2 p-3 sm:p-3 rounded-xl bg-white/95 border border-gray-200/50 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-5 h-5 sm:w-5 sm:h-5 text-gray-700" />
                            </button>
                        </div>
                        <div className="flex justify-center gap-2 sm:gap-2 mt-4">
                            {screenshots.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setCurrentSlide(i); setIsPaused(true); }}
                                    className={`h-2.5 sm:h-2 rounded-full transition-all ${i === currentSlide ? "bg-primary w-8 sm:w-8" : "bg-slate-300 w-2.5 sm:w-2 hover:bg-slate-400"}`}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
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

const Features = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <section id="features" className="py-6 sm:py-10 md:py-14 lg:py-16 px-3 sm:px-4">
            {/* Light background container with rounded corners */}
            <div className="mx-auto rounded-2xl bg-white/80 backdrop-blur-sm shadow-soft border border-slate-200"
                style={{ maxWidth: FULL_WIDTH, width: '100%' }}>
                <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">Features</h2>

                    {/* Mobile: Accordion style */}
                    <div className="sm:hidden space-y-2">
                        {features.map((f, index) => (
                            <div
                                key={f.title}
                                className="bg-white/60 rounded-xl border border-slate-200 overflow-hidden transition-all duration-200"
                            >
                                <button
                                    onClick={() => toggleExpand(index)}
                                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-white/80 transition-colors"
                                >
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center transition-colors ${expandedIndex === index ? 'bg-blue-100' : ''}`}>
                                        <f.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <span className="flex-1 font-semibold text-base text-foreground">{f.title}</span>
                                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${expandedIndex === index ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-200 ${expandedIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="px-3 pb-3 text-sm text-muted-foreground leading-relaxed pl-14">
                                        {f.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop+: Grid layout */}
                    <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                        {features.map((f) => (
                            <Card key={f.title} sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
                                <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5, lg: 3 } }}>
                                    <f.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary mb-2 sm:mb-3 md:mb-4" />
                                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1.5 sm:mb-2 md:mb-3 text-foreground">{f.title}</h3>
                                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{f.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};


const QuickStart = () => {
    return (
        <section id="quick-start" className="py-6 sm:py-10 md:py-14 px-3 sm:px-4">
            {/* Light gradient background container with limited width */}
            <div className="mx-auto rounded-2xl bg-white/80 backdrop-blur-sm shadow-soft border border-slate-200"
                style={{ maxWidth: FULL_WIDTH, width: '100%' }}>
                <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-8 sm:py-10 md:py-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 tracking-tight text-foreground">Quick Start</h2>

                    <div className="relative">
                        {/* Vertical Center Line - Only show on md+ screens */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent hidden md:block" />

                        <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20">
                            {STEPS.map((step, idx) => {
                                const isTextOnRight = idx % 2 === 0; // Step 1 (0), Step 3 (2)
                                const stepNum = idx + 1;

                                return (
                                    <div key={idx} className="relative flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-0">
                                        {/* Left Column */}
                                        <div className="w-full md:w-1/2 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 flex flex-col">
                                            {!isTextOnRight ? (
                                                /* Even Steps (2, 4): Text on Left, Number on Right near line on desktop */
                                                <>
                                                    {/* Mobile: Number above content */}
                                                    <div className="md:hidden w-full text-center mb-2">
                                                        <span className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold shadow-md mx-auto">
                                                            {stepNum}
                                                        </span>
                                                    </div>
                                                    <div className="text-center md:text-right group w-full md:hidden mb-3 sm:mb-4">
                                                        <h3 className="text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors text-foreground mb-2">
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
                                                    <div className="md:hidden w-full text-center mb-2">
                                                        <span className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold shadow-md mx-auto">
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
                                        <div className="w-full md:w-1/2 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 flex flex-col mt-3 sm:mt-4 md:mt-0">
                                            {isTextOnRight ? (
                                                /* Odd Steps (1, 3): Text on Right */
                                                <>
                                                    {/* Mobile text content */}
                                                    <div className="text-center md:text-left group w-full md:hidden">
                                                        <h3 className="text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors text-foreground mb-2">
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
    <footer className="py-6 sm:py-8 px-3 sm:px-4 border-t border-slate-200">
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
        <section id="faq" className="py-6 sm:py-10 md:py-14 px-3 sm:px-4">
            <div className="mx-auto rounded-2xl bg-white/80 backdrop-blur-sm shadow-soft border border-slate-200"
                style={{ maxWidth: FULL_WIDTH, width: '100%' }}>
                <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-8 sm:py-10 md:py-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">Frequently Asked Questions</h2>
                    <p className="text-center text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-4">
                        Common questions about Tingly Box
                    </p>

                    {/* Accordion-style FAQ */}
                    <div className="max-w-4xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white/80 rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all duration-200">
                                <h3 className="text-base sm:text-lg font-semibold mb-2 flex items-start gap-2 sm:gap-3">
                                    <span
                                        className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-primary rounded-lg flex items-center justify-center text-xs sm:text-sm font-semibold mt-0.5">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span className="text-foreground leading-tight">{faq.question}</span>
                                </h3>
                                <p className="ml-9 sm:ml-11 text-muted-foreground leading-relaxed text-sm sm:text-base">
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
                    <div className="mt-10 sm:mt-12 md:mt-16 text-center">
                        <p className="text-base sm:text-lg mb-4 text-foreground">Still have questions?</p>
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                            <MuiButton
                                variant="outlined"
                                href="https://github.com/tingly-dev/tingly-box/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                                startIcon={<ExternalLink className="w-4 h-4" />}
                                size="small"
                                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, fontWeight: 500 }}
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
    <main className="min-h-screen relative">
        <LightPatternBackground />
        <Header />
        <Hero />
        <Gallery />
        <Features />
        <QuickStart />
        <FAQ />
        <Footer />
    </main>
);

export default Index;