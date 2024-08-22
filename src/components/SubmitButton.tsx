import { Loader2 } from "lucide-react";
import { ButtonProps } from "../../types";
import { Button } from "./ui/button";

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div>
          <Loader2 className="animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
