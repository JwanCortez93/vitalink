import { cn } from "@/lib/utils";
import { StatCardProps } from "../../../../types";
import clsx from "clsx";

const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div
      className={cn("stat-card", {
        "bg-gradient-to-tr to-neutral-900 from-green-950 from-0% to-100%":
          type === "appointments",
        "bg-gradient-to-tr to-neutral-900 from-yellow-950 from-0% to-100%":
          type === "pending",
        "bg-gradient-to-tr to-neutral-900 from-red-950 from-0% to-100%":
          type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4">
        {icon}
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <p className="text-14-regular">{label}</p>
    </div>
  );
};

export default StatCard;
