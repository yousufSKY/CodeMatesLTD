"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Theme = "light" | "dark" | "system";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // When mounted on client, now we can show the UI
  React.useEffect(() => setMounted(true), []);

  const cycleTheme = () => {
    const themeOrder: Theme[] = ["light", "dark", "system"];
    const currentIndex = themeOrder.indexOf(theme as Theme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    setTheme(nextTheme);
  };

  const ThemeIcon = React.useMemo(() => {
    if (!mounted) return Sun;
    switch (theme) {
      case "light":
        return Sun;
      case "dark":
        return Moon;
      default:
        return Monitor;
    }
  }, [theme, mounted]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition"
            aria-label="Toggle theme"
          >
            <ThemeIcon className="h-[1.2rem] w-[1.2rem] transition-all animate-in zoom-in duration-200" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Switch Theme ({theme})</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}