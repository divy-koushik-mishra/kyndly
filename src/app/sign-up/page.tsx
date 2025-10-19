import { auth, signIn } from "@/server/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function SignUpPage() {
  const session = await auth();

  // Redirect authenticated users to dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-md flex-col items-center gap-2 rounded-xl border border-zinc-800 bg-black p-8 shadow-lg shadow-neutral-700">
        <h2 className="text-center text-2xl font-medium">Welcome to Kyndly</h2>
        <p className="text-muted-foreground text-center text-sm font-light tracking-wider">
          Sign in using your Google account
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/onboarding" });
          }}
        >
          <Button
            type="submit"
            variant="outline"
            className="mt-6 w-full gap-2 bg-white text-black hover:bg-white/90"
          >
            <Image
              src={"/images/google-icon.png"}
              alt="google sign-in icon"
              height={20}
              width={20}
            />
            Continue with Google
          </Button>
        </form>
      </div>
    </main>
  );
}
