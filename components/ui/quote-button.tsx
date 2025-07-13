import { useRouter } from "next/navigation";
import { Button } from "./button";

export function QuoteButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/contact?type=quote");
  };

  return (
    <Button
      onClick={handleClick}
      className="relative bg-background/50 backdrop-blur-sm border border-white/10 hover:bg-background/70 transition-all duration-300"
      size="lg"
    >
      Get a Free Quote
    </Button>
  );
}