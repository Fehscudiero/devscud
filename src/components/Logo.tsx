import React from "react";

interface LogoProps {
    isDarkTheme: boolean;
    className?: string;
}

export default function Logo({ isDarkTheme, className = "" }: LogoProps) {
    // Cores Dinâmicas
    const textColor = isDarkTheme ? "#ffffff" : "#0f172a"; // Branco vs Slate-900

    // Gradientes definidos via ID para usar no SVG
    const gradientId = "logoGradient";
    const colorStart = isDarkTheme ? "#9333ea" : "#059669"; // Roxo vs Verde
    const colorEnd = isDarkTheme ? "#2563eb" : "#0d9488";   // Azul vs Teal

    return (
        <div className={`flex items-center gap-2 font-sans select-none ${className}`}>
            {/* Ícone Geométrico */}
            <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 hover:rotate-180"
            >
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor={colorStart} />
                        <stop offset="100%" stopColor={colorEnd} />
                    </linearGradient>
                </defs>

                {/* Forma Abstrata "FS" / Code Brackets */}
                <path
                    d="M12 20L4 12L12 4"
                    stroke={`url(#${gradientId})`}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M28 20L36 28L28 36"
                    stroke={`url(#${gradientId})`}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M22 4L18 36"
                    stroke={textColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeOpacity="0.5"
                />
            </svg>

            {/* Texto da Logo */}
            <div className="flex flex-col justify-center">
                <span
                    className="text-xl font-bold tracking-tighter leading-none transition-colors duration-300"
                    style={{ color: textColor }}
                >
                    Dev
                    <span style={{ background: `linear-gradient(to right, ${colorStart}, ${colorEnd})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        Scud
                    </span>
                </span>
                <span
                    className="text-[9px] uppercase tracking-[0.2em] font-medium opacity-60 transition-colors duration-300"
                    style={{ color: textColor }}
                >
                    Felipe Scudiero
                </span>
            </div>
        </div>
    );
}