import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
        matches: query.includes("max-width: 767"),
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    }),
});
