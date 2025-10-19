"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function selectProject(projectId: string) {
  const cookieStore = await cookies();
  cookieStore.set("selectedProjectId", projectId, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });
  
  // Revalidate all dashboard pages
  revalidatePath("/dashboard", "layout");
}

