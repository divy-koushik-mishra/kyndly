import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

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
});

