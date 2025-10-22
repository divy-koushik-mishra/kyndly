import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export const userRouter = createTRPCRouter({
  getUserStatus: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        status: true,
      },
    });
  }),

  onboardUser: protectedProcedure
    .input(
      z.object({
        projectName: z.string(),
        appConfig: z.object({
          platform: z.enum(["web", "mobile"]),
          domain: z.string(),
          name: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await db.$transaction(async (tx) => {
        await tx.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            status: "ACTIVE",
          },
        });
        const project = await tx.project.create({
          data: {
            userId: ctx.session.user.id,
            projectName: input.projectName,
          },
        });
        
        // Generate slug from app name
        const generateSlug = (name: string) => {
          return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        };
        
        let slug = generateSlug(input.appConfig.name);
        let slugSuffix = 0;
        
        // Check if slug exists and make it unique
        while (await tx.app.findUnique({ where: { slug } })) {
          slugSuffix++;
          slug = `${generateSlug(input.appConfig.name)}-${slugSuffix}`;
        }
        
        await tx.app.create({
          data: {
            projectId: project.id,
            platform: input.appConfig.platform,
            domain: input.appConfig.domain,
            name: input.appConfig.name,
            slug,
          },
        });
      });
    }),

  getUserProject: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.project.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        id: true,
        projectName: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  getProjectApps: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.app.findMany({
        where: {
          projectId: input.projectId,
        },
        select: {
          id: true,
          name: true,
          platform: true,
          domain: true,
          createdAt: true,
          updatedAt: true,
          logoUrl: true,
          description: true,
          slug: true,
          isFormPublic: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
});
