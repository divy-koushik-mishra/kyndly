import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/server/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-up");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Welcome, {session.user.name}!
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{session.user.email}</p>
      </div>
      
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8">
        <p className="text-center text-muted-foreground">
          Your dashboard content goes here...
        </p>
      </div>

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button type="submit" variant="outline">
          Sign Out
        </Button>
      </form>
    </div>
  );
}

