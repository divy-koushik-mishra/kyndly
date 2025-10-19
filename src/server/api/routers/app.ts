import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        name: z.string().min(1, "App name is required").max(100),
        platform: z.enum(["web", "mobile"]),
        domain: z.string().min(1, "Domain is required"),
        description: z.string().optional(),
        logoUrl: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify project ownership
      const project = await ctx.db.project.findUnique({
        where: { id: input.projectId },
        select: { userId: true },
      });

      if (!project || project.userId !== ctx.session.user.id) {
        throw new Error("Project not found or access denied");
      }

      return await ctx.db.app.create({
        data: {
          projectId: input.projectId,
          name: input.name,
          platform: input.platform,
          domain: input.domain,
          description: input.description,
          logoUrl: input.logoUrl,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        appId: z.string(),
        name: z.string().min(1, "App name is required").max(100).optional(),
        platform: z.enum(["web", "mobile"]).optional(),
        domain: z.string().min(1, "Domain is required").optional(),
        description: z.string().optional(),
        logoUrl: z.string().url().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify ownership through project
      const app = await ctx.db.app.findUnique({
        where: { id: input.appId },
        include: {
          project: {
            select: { userId: true },
          },
        },
      });

      if (!app || app.project.userId !== ctx.session.user.id) {
        throw new Error("App not found or access denied");
      }

      return await ctx.db.app.update({
        where: { id: input.appId },
        data: {
          name: input.name,
          platform: input.platform,
          domain: input.domain,
          description: input.description,
          logoUrl: input.logoUrl,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        appId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify ownership through project
      const app = await ctx.db.app.findUnique({
        where: { id: input.appId },
        include: {
          project: {
            select: { userId: true },
          },
        },
      });

      if (!app || app.project.userId !== ctx.session.user.id) {
        throw new Error("App not found or access denied");
      }

      return await ctx.db.app.delete({
        where: { id: input.appId },
      });
    }),

  getById: protectedProcedure
    .input(
      z.object({
        appId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const app = await ctx.db.app.findUnique({
        where: { id: input.appId },
        include: {
          project: {
            select: { userId: true },
          },
        },
      });

      if (!app || app.project.userId !== ctx.session.user.id) {
        throw new Error("App not found or access denied");
      }

      return app;
    }),
});

