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
        <div className="flex items-center">
          <Loader2 className="animate-spin h-4 w-4 mr-2" />
          <p>Loading...</p>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
