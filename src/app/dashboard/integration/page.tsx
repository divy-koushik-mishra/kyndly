import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { DashboardLayout } from "@/components/dashboard-layout";
import { IntegrationContent } from "./_components/integration-content";
import { api } from "@/trpc/server";

export default async function IntegrationPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-up");
  }

  // Fetch projects server-side
  const projects = await api.user.getUserProject();
  const { getSelectedProjectId } = await import("@/lib/selected-project");
  const selectedProjectId = await getSelectedProjectId(projects);

  return (
    <>
      <Navbar projects={projects} selectedProjectId={selectedProjectId} />
      <DashboardLayout>
        <IntegrationContent />
      </DashboardLayout>
    </>
  );
}


