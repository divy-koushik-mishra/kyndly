import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

// Helper function to generate URL-friendly slug
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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

      // Generate unique slug
      let slug = generateSlug(input.name);
      let slugSuffix = 0;
      
      // Check if slug exists and make it unique
      while (await ctx.db.app.findUnique({ where: { slug } })) {
        slugSuffix++;
        slug = `${generateSlug(input.name)}-${slugSuffix}`;
      }

      return await ctx.db.app.create({
        data: {
          projectId: input.projectId,
          name: input.name,
          platform: input.platform,
          domain: input.domain,
          description: input.description,
          logoUrl: input.logoUrl,
          slug,
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

  getBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const app = await ctx.db.app.findUnique({
        where: { slug: input.slug },
        include: {
          project: {
            select: { projectName: true },
          },
        },
      });

      if (!app) {
        throw new Error("App not found");
      }

      // Only return public info for review form
      return {
        id: app.id,
        name: app.name,
        logoUrl: app.logoUrl,
        description: app.description,
        projectId: app.projectId,
        projectName: app.project.projectName,
        isFormPublic: app.isFormPublic,
        formConfig: app.formConfig,
      };
    }),

  updateFormConfig: protectedProcedure
    .input(
      z.object({
        appId: z.string(),
        isFormPublic: z.boolean().optional(),
        formConfig: z.any().optional(), // JSON config
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
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
          isFormPublic: input.isFormPublic,
          formConfig: input.formConfig,
        },
      });
    }),

  updateSlug: protectedProcedure
    .input(
      z.object({
        appId: z.string(),
        slug: z.string().min(1).max(100),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
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

      // Validate slug format
      const cleanSlug = generateSlug(input.slug);
      
      // Check if slug is already taken
      const existing = await ctx.db.app.findUnique({
        where: { slug: cleanSlug },
      });

      if (existing && existing.id !== input.appId) {
        throw new Error("This slug is already taken");
      }

      return await ctx.db.app.update({
        where: { id: input.appId },
        data: { slug: cleanSlug },
      });
    }),
});

