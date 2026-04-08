import { checkListItems } from "@/lib/manual-data";
import { cn } from "@/lib/utils";
import { CheckSquare, Square } from "lucide-react";
import { useState } from "react";
import { Streamdown } from "streamdown";
import { Button } from "./ui/button";

interface CheckListProps {
  items: { id: string; text: string; }[];
}

export function CheckList({ items }: CheckListProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const checkAll = () => {
    const allChecked = items.reduce((acc, item) => ({ ...acc, [item.id]: true }), {});
    setCheckedItems(allChecked);
  };

  const uncheckAll = () => {
    setCheckedItems({});
  };

  const allCount = items.length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = Math.round((checkedCount / allCount) * 100);

  return (
    <div className="industrial-card p-6 space-y-6" id="check">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-bold font-condensed flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-primary" />
            チェック（洗い場 合格ライン）
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            自分でチェックして「全部OK」なら合格。できない項目は先輩に相談。
          </p>
        </div>
        <div className="flex items-center gap-4 bg-muted/30 px-4 py-2 rounded-sm border border-border">
          <div className="text-right">
            <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Progress</div>
            <div className="text-2xl font-bold font-mono text-primary leading-none">
              {progress}%
            </div>
          </div>
          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div 
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={cn(
              "flex items-start gap-3 p-3 rounded-sm border cursor-pointer transition-all duration-200 select-none group",
              checkedItems[item.id] 
                ? "bg-primary/5 border-primary/30" 
                : "bg-background border-border hover:border-primary/30 hover:bg-muted/20"
            )}
          >
            <div className={cn(
              "mt-0.5 transition-colors duration-200",
              checkedItems[item.id] ? "text-primary" : "text-muted-foreground group-hover:text-primary/70"
            )}>
              {checkedItems[item.id] ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
            </div>
            <div className={cn(
              "text-sm md:text-base transition-opacity duration-200",
              checkedItems[item.id] ? "opacity-100" : "opacity-80"
            )}>
              <Streamdown>{item.text}</Streamdown>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}
