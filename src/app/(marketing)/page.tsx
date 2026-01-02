import Link from "next/link";
import { Logo } from "@/components/common/Logo";

export default function MarketingPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-[#020617]">
            {/* Background Gradient Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cyan/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Hero Content */}
            <div className="z-10 flex flex-col items-center space-y-10 text-center p-4">
                <Logo size="xl" />

                <p className="max-w-md text-slate-400 font-light text-lg">
                    The next-generation IT Service Desk Platform built for speed and intelligence.
                </p>

                <Link
                    href="/dashboard"
                    className="group relative px-8 py-3 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-full overflow-hidden transition-all hover:bg-slate-800/50 hover:border-brand-cyan/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                    <span className="relative z-10 font-medium text-brand-cyan group-hover:text-white transition-colors">
                        Launch Dashboard
                    </span>
                    {/* Button Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-brand-cyan/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700 ease-in-out" />
                </Link>
            </div>

            {/* Footer / Copyright */}
            <div className="absolute bottom-8 text-slate-600 text-xs text-center font-mono">
                POWERED BY DARK VIBE
                <br />
                V 0.1.0-ALPHA
            </div>
        </main>
    );
}
