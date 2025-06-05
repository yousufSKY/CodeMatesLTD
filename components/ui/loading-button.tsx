import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
}

export function LoadingButton({
  children,
  isLoading,
  loadingText,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={disabled || isLoading}
      className={cn("relative", className)}
      {...props}
    >
      {isLoading && (
        <Loader2 className="absolute left-4 h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      <span className={cn(isLoading && "pl-6")}>
        {isLoading ? loadingText || children : children}
      </span>
    </Button>
  );
}
