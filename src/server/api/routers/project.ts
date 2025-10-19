import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        projectName: z.string().min(1, "Project name is required").max(100),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.project.create({
        data: {
          userId: ctx.session.user.id,
          projectName: input.projectName,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        projectName: z.string().min(1, "Project name is required").max(100).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const project = await ctx.db.project.findUnique({
        where: { id: input.projectId },
        select: { userId: true },
      });

      if (!project || project.userId !== ctx.session.user.id) {
        throw new Error("Project not found or access denied");
      }

      return await ctx.db.project.update({
        where: { id: input.projectId },
        data: {
          projectName: input.projectName,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const project = await ctx.db.project.findUnique({
        where: { id: input.projectId },
        select: { userId: true },
      });

      if (!project || project.userId !== ctx.session.user.id) {
        throw new Error("Project not found or access denied");
      }

      return await ctx.db.project.delete({
        where: { id: input.projectId },
      });
    }),

  getById: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const project = await ctx.db.project.findUnique({
        where: { id: input.projectId },
        include: {
          App: true,
        },
      });

      if (!project || project.userId !== ctx.session.user.id) {
        throw new Error("Project not found or access denied");
      }

      return project;
    }),
});

