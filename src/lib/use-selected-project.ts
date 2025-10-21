"use client";

import { useEffect, useState } from "react";

export function useSelectedProject(
  projects: Array<{ id: string; projectName: string }>,
  initialSelectedId?: string
) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    initialSelectedId ?? projects[0]?.id ?? null
  );

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined" && !initialSelectedId) {
      const stored = localStorage.getItem("selectedProjectId");
      if (stored && projects.some((p) => p.id === stored)) {
        setSelectedProjectId(stored);
      }
    }
  }, [initialSelectedId, projects]);

  const selectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedProjectId", projectId);
    }
  };

  return {
    selectedProjectId,
    selectProject,
    selectedProject: projects.find((p) => p.id === selectedProjectId) ?? projects[0],
  };
}

