import clsx from "clsx";
import { Status } from "../../../../../types";
import { Calendar, Check, Clock, X } from "lucide-react";

const StatusIcon = {
  scheduled: <Check />,
  pending: <Clock />,
  cancelled: <X />,
};

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "scheduled",
        "bg-yellow-600": status === "pending",
        "bg-red-600": status === "cancelled",
      })}
    >
      {StatusIcon[status]}
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-200": status === "scheduled",
          "text-yellow-200": status === "pending",
          "text-red-200": status === "cancelled",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
