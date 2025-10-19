import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 text-white">
      <h2 className="text-7xl font-thin">Kyndly</h2>
      <p className="font-thin tracking-widest">
        Turn kind words into growth.
      </p>
      <Link href={"/sign-up"}>
        <Button
          variant={"outline"}
          aria-label="Sign in"
          className="text-black hover:bg-white/90"
        >
          Get Started <ArrowRight />
        </Button>
      </Link>
    </main>
  );
}
