import { objectType, extendType, nonNull, intArg } from "nexus";
import { User } from "@prisma/client";

export const Like = objectType({
    name: "Like",
    definition(t) {
        t.nonNull.field("book", { type: "Book" });
        t.nonNull.field("user", { type: "User" });
    },
});

export const LikeMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("like", {
            type: "Like",
            args: {
                bookId: nonNull(intArg()),
            },
            async resolve(parent, args, context) {
                const { userId } = context;

                if (!userId) { 
                    throw new Error("Cannot like book without logging in.");
                }

                const book = await context.prisma.book.update({
                    where: {
                        id: args.bookId
                    },
                    data: {
                        likers: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                })

                const user = await context.prisma.user.findUnique({ where: { id: userId } });

                return { 
                    book,
                    user: user as User
                };
            },
        })
    }
})