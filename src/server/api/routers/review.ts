import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

export const reviewRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        authorName: z.string().min(1, "Author name is required").max(100),
        rating: z.number().int().min(1).max(5),
        text: z.string().min(1, "Review text is required").max(1000),
        avatarUrl: z.string().url().optional(),
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

      return await ctx.db.review.create({
        data: {
          projectId: input.projectId,
          authorName: input.authorName,
          rating: input.rating,
          text: input.text,
          avatarUrl: input.avatarUrl ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(input.authorName)}&background=random`,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        reviewId: z.string(),
        authorName: z.string().min(1, "Author name is required").max(100).optional(),
        rating: z.number().int().min(1).max(5).optional(),
        text: z.string().min(1, "Review text is required").max(1000).optional(),
        avatarUrl: z.string().url().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify ownership through project
      const review = await ctx.db.review.findUnique({
        where: { id: input.reviewId },
        include: {
          project: {
            select: { userId: true },
          },
        },
      });

      if (!review || review.project.userId !== ctx.session.user.id) {
        throw new Error("Review not found or access denied");
      }

      return await ctx.db.review.update({
        where: { id: input.reviewId },
        data: {
          authorName: input.authorName,
          rating: input.rating,
          text: input.text,
          avatarUrl: input.avatarUrl ?? undefined,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        reviewId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify ownership through project
      const review = await ctx.db.review.findUnique({
        where: { id: input.reviewId },
        include: {
          project: {
            select: { userId: true },
          },
        },
      });

      if (!review || review.project.userId !== ctx.session.user.id) {
        throw new Error("Review not found or access denied");
      }

      return await ctx.db.review.update({
        where: { id: input.reviewId },
        data: {
          isDeleted: true,
        },
      });
    }),

  getById: protectedProcedure
    .input(
      z.object({
        reviewId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const review = await ctx.db.review.findUnique({
        where: { id: input.reviewId },
        include: {
          project: {
            select: { userId: true },
          },
        },
      });

      if (!review || review.project.userId !== ctx.session.user.id) {
        throw new Error("Review not found or access denied");
      }

      return review;
    }),

  getByProject: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // Verify project ownership
      const project = await ctx.db.project.findUnique({
        where: { id: input.projectId },
        select: { userId: true },
      });

      if (!project || project.userId !== ctx.session.user.id) {
        throw new Error("Project not found or access denied");
      }

      return await ctx.db.review.findMany({
        where: {
          projectId: input.projectId,
          isDeleted: false,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  togglePublished: protectedProcedure
    .input(
      z.object({
        reviewId: z.string(),
        isPublished: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify ownership through project
      const review = await ctx.db.review.findUnique({
        where: { id: input.reviewId },
        include: {
          project: {
            select: { userId: true },
          },
        },
      });

      if (!review || review.project.userId !== ctx.session.user.id) {
        throw new Error("Review not found or access denied");
      }

      return await ctx.db.review.update({
        where: { id: input.reviewId },
        data: {
          isPublished: input.isPublished,
        },
      });
    }),

  // Public endpoint for submitting reviews through app form
  submitPublic: publicProcedure
    .input(
      z.object({
        appId: z.string(),
        authorName: z.string().min(1, "Name is required").max(100),
        rating: z.number().int().min(1).max(5),
        text: z.string().min(1, "Review is required").max(1000),
        customData: z.any().optional(), // For custom field responses
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Get app and verify it's public
      const app = await ctx.db.app.findUnique({
        where: { id: input.appId },
        select: { 
          id: true, 
          projectId: true, 
          isFormPublic: true,
        },
      });

      if (!app || !app.isFormPublic) {
        throw new Error("Review form is not available");
      }

      // Create review
      const review = await ctx.db.review.create({
        data: {
          projectId: app.projectId,
          authorName: input.authorName,
          rating: input.rating,
          text: input.text,
          customData: input.customData,
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(input.authorName)}&background=random`,
          isPublished: false, // Require moderation
        },
      });

      // Link review to app
      await ctx.db.reviewApp.create({
        data: {
          reviewId: review.id,
          appId: input.appId,
        },
      });

      return review;
    }),

  // Link existing review to apps
  linkToApps: protectedProcedure
    .input(
      z.object({
        reviewId: z.string(),
        appIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const review = await ctx.db.review.findUnique({
        where: { id: input.reviewId },
        include: {
          project: {
            select: { userId: true },
          },
        },
      });

      if (!review || review.project.userId !== ctx.session.user.id) {
        throw new Error("Review not found or access denied");
      }

      // Delete existing links
      await ctx.db.reviewApp.deleteMany({
        where: { reviewId: input.reviewId },
      });

      // Create new links
      if (input.appIds.length > 0) {
        await ctx.db.reviewApp.createMany({
          data: input.appIds.map(appId => ({
            reviewId: input.reviewId,
            appId,
          })),
        });
      }

      return { success: true };
    }),

  // Get reviews for an app (with app linkage)
  getByApp: protectedProcedure
    .input(
      z.object({
        appId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // Verify app ownership
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

      // Get reviews linked to this app
      const reviewApps = await ctx.db.reviewApp.findMany({
        where: { appId: input.appId },
        include: {
          review: {
            where: { isDeleted: false },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return reviewApps.map(ra => ra.review);
    }),

  // Get apps linked to a review
  getLinkedApps: protectedProcedure
    .input(
      z.object({
        reviewId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // Verify ownership
      const review = await ctx.db.review.findUnique({
        where: { id: input.reviewId },
        include: {
          project: {
            select: { userId: true },
          },
        },
      });

      if (!review || review.project.userId !== ctx.session.user.id) {
        throw new Error("Review not found or access denied");
      }

      const reviewApps = await ctx.db.reviewApp.findMany({
        where: { reviewId: input.reviewId },
        include: {
          app: true,
        },
      });

      return reviewApps.map(ra => ra.app);
    }),
});

