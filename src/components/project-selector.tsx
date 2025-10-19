"use client";

import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useSelectedProject } from "@/lib/use-selected-project";

interface ProjectSelectorProps {
  initialProjects?: Array<{ id: string; projectName: string }>;
  initialSelectedId?: string;
}

export function ProjectSelector({ initialProjects = [], initialSelectedId }: ProjectSelectorProps) {
  const router = useRouter();

  const { data: projects = initialProjects } = api.user.getUserProject.useQuery(undefined, {
    initialData: initialProjects,
    refetchOnMount: false,
  });

  const { selectedProject, selectProject } = useSelectedProject(projects, initialSelectedId);

  const handleSelectProject = (projectId: string) => {
    selectProject(projectId);
    router.refresh();
  };

  if (!selectedProject) {
    return (
      <Button
        variant="outline"
        className="w-[160px] sm:w-[200px]"
        disabled
      >
        No Projects
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[160px] sm:w-[200px] justify-between"
        >
          <div className="flex items-center gap-2 truncate">
            <span className="text-lg">📦</span>
            <span className="truncate text-sm sm:text-base">{selectedProject.projectName}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]" align="start">
        <DropdownMenuLabel>Select Project</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {projects.map((project) => (
          <DropdownMenuItem
            key={project.id}
            onClick={() => handleSelectProject(project.id)}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-2 w-full">
              <span className="text-lg">📦</span>
              <span className="flex-1 truncate">{project.projectName}</span>
              {selectedProject?.id === project.id && (
                <Check className="h-4 w-4 text-purple-500" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-purple-400">
          <Plus className="mr-2 h-4 w-4" />
          <span>New Project</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

