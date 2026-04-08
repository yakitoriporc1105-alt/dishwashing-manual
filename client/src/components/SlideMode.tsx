import { ManualSection } from "@/lib/manual-data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Streamdown } from "streamdown";
import { Button } from "./ui/button";

interface SlideModeProps {
  sections: ManualSection[];
  onClose: () => void;
  initialIndex?: number;
}

export function SlideMode({ sections, onClose, initialIndex = 0 }: SlideModeProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const nextSlide = () => {
    if (currentIndex < sections.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const currentSection = sections[currentIndex];
  const progress = ((currentIndex + 1) / sections.length) * 100;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-8">
      {/* Header Controls */}
      <div className="absolute top-4 right-4 z-50">
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted">
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Slide Content */}
      <div className="w-full max-w-2xl aspect-[4/5] md:aspect-video relative flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full h-full"
          >
            <div className="w-full h-full bg-card border border-border rounded-xl shadow-2xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

              {/* Content */}
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  {currentSection.tag ? (
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold border",
                      currentSection.tagType === 'good' && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                      currentSection.tagType === 'warn' && "bg-amber-500/10 text-amber-500 border-amber-500/20",
                      currentSection.tagType === 'bad' && "bg-rose-500/10 text-rose-500 border-rose-500/20",
                    )}>
                      {currentSection.tag}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold border bg-muted text-muted-foreground border-border">
                      Lv.{currentSection.level}
                    </span>
                  )}
                  <span className="text-muted-foreground text-sm font-mono">
                    {currentIndex + 1} / {sections.length}
                  </span>
                </div>

                <h2 className="text-2xl md:text-4xl font-bold font-condensed leading-tight">
                  {currentSection.title}
                </h2>

                <div className="space-y-4 text-lg md:text-xl leading-relaxed text-muted-foreground">
                  {currentSection.content.map((line, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="text-primary mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <div className="flex-1">
                        <Streamdown>{line}</Streamdown>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-8 mt-8 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={prevSlide} 
          disabled={currentIndex === 0}
          className="w-12 h-12 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        
        <div className="text-sm font-medium text-muted-foreground">
          Swipe or use arrows
        </div>

        <Button 
          variant="outline" 
          size="icon" 
          onClick={nextSlide} 
          disabled={currentIndex === sections.length - 1}
          className="w-12 h-12 rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
