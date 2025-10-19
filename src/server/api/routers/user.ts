import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
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
        })
    }),

    onboardUser: protectedProcedure
    .input(z.object({
        projectName: z.string(),
        appConfig: z.object({
            platform: z.enum(["web", "mobile"]),
            domain: z.string(),
            name: z.string(),
        }),
    }))
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
            await tx.app.create({
                data: {
                    projectId: project.id,
                    platform: input.appConfig.platform,
                    domain: input.appConfig.domain,
                    name: input.appConfig.name,
                },
            });
        })
    }),
});