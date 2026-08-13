import { LucideIcon } from "lucide-react";

interface AmenityProps {
  icon: LucideIcon;
  label: string;
  strikethrough?: boolean;
}

export default function AmenityRow({ icon: Icon, label, strikethrough = false }: AmenityProps) {
  return (
    <div className="flex items-center gap-4 py-[24px] border-b border-hairline last:border-b-0">
      <Icon className={`w-6 h-6 shrink-0 ${strikethrough ? "text-muted" : "text-ink"}`} strokeWidth={1.5} />
      <span className={`text-[16px] text-ink ${strikethrough ? "line-through text-muted" : "font-normal"}`}>
        {label}
      </span>
    </div>
  );
}
