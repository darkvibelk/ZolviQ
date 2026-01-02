import React from "react";
import clsx from "clsx";
import Image from "next/image";

interface LogoProps {
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
    variant?: "icon" | "full"; // 'icon' uses Image 1 + Text, 'full' uses Image 2 (standalone)
}

export const Logo: React.FC<LogoProps> = ({ className, size = "md", variant = "icon" }) => {
    const sizeClasses = {
        sm: "text-xl",
        md: "text-3xl",
        lg: "text-5xl",
        xl: "text-7xl",
    };

    const iconSizes = {
        sm: 32,
        md: 48,
        lg: 80,
        xl: 120, // Increased for hero
    };

    // If variant is 'full' and size is large, we can use the full logo image
    // However, for consistency with the design system (text colors), we'll default to Icon + HTML Text
    // unless explicitly requested or if it's the specific marketing hero case.

    return (
        <div className={clsx("flex flex-col items-center justify-center select-none", className)}>

            {/* Icon Wrapper */}
            <div className={clsx("relative", size === "sm" ? "mb-1" : "mb-2")}>
                <div className="relative overflow-hidden rounded-full">
                    {/* 
                Using mix-blend-screen to remove the black background from the JPG. 
                This works best on dark backgrounds. 
            */}
                    <Image
                        src="/assets/zolviq-icon.jpg"
                        alt="ZolviQ Logo"
                        width={iconSizes[size]}
                        height={iconSizes[size]}
                        className="mix-blend-screen object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Main Text */}
            <h1 className={clsx("font-brand font-bold tracking-tight text-white/90", sizeClasses[size])}>
                ZolviQ
            </h1>

            {/* Tagline */}
            {size !== "sm" && (
                <span className="text-[10px] md:text-sm font-sans tracking-[0.25em] text-cyan-400 mt-1 uppercase opacity-80 shadow-cyan-500/20 drop-shadow-lg">
                    Resolution Intelligence
                </span>
            )}
        </div>
    );
};
