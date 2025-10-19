import { cookies } from "next/headers";

const SELECTED_PROJECT_COOKIE = "selectedProjectId";

export async function getSelectedProjectId(projects: Array<{ id: string }>) {
  const cookieStore = await cookies();
  const selectedId = cookieStore.get(SELECTED_PROJECT_COOKIE)?.value;
  
  // If we have a stored selection and it's valid, use it
  if (selectedId && projects.some(p => p.id === selectedId)) {
    return selectedId;
  }
  
  // Otherwise return the first project
  return projects[0]?.id;
}

export async function setSelectedProjectId(projectId: string) {
  const cookieStore = await cookies();
  cookieStore.set(SELECTED_PROJECT_COOKIE, projectId, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });
}

