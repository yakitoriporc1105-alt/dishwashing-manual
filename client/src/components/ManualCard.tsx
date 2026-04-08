import { ManualSection } from "@/lib/manual-data";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Streamdown } from "streamdown";

interface ManualCardProps {
  section: ManualSection;
  defaultOpen?: boolean;
  onOpen?: () => void;
}

export function ManualCard({ section, defaultOpen = false, onOpen }: ManualCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState && onOpen) {
      onOpen();
    }
  };

  const getTagColor = (type: ManualSection['tagType']) => {
    switch (type) {
      case 'good': return 'tag-good';
      case 'warn': return 'tag-warn';
      case 'bad': return 'tag-bad';
      default: return 'bg-muted text-muted-foreground border-muted-foreground/20 border px-2 py-0.5 rounded-full text-xs font-bold';
    }
  };

  return (
    <div className="industrial-card overflow-hidden group bg-background/80 backdrop-blur-sm">
      <button 
        onClick={handleToggle}
        className="w-full flex items-start justify-between p-5 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex flex-col gap-2 flex-1 min-w-0 pr-2">
          <h3 className="font-bold text-lg md:text-xl font-condensed leading-snug break-words whitespace-pre-wrap">
            {section.title}
          </h3>
          {section.tag && (
            <div className="flex">
              <span className={cn("whitespace-nowrap text-sm px-3 py-1 inline-block", getTagColor(section.tagType))}>
                {section.tag}
              </span>
            </div>
          )}
        </div>
        <ChevronDown 
          className={cn(
            "w-6 h-6 text-muted-foreground transition-transform duration-200 flex-shrink-0 mt-1",
            isOpen && "transform rotate-180"
          )} 
        />
      </button>
      
      <div 
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-5 pt-0 border-t border-border/50 bg-muted/5">
            <div className="pt-5 space-y-3 text-base md:text-lg leading-relaxed text-muted-foreground">
              {section.content.map((line, i) => (
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
      </div>
    </div>
  );
}
