import { objectType } from "nexus";

export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("username");
        t.nonNull.string("email");
        t.nonNull.string("password")
        t.nonNull.list.nonNull.field("books", {
            type: "Book",
            resolve(parent, args, context) {
                return context.prisma.user.findUnique({
                    where: {
                        id: parent.id
                    }
                })
                .books();
            }
        })
        t.nonNull.list.nonNull.field("likes", {
            type: "Book",
            resolve(parent, args, context) {
                return context.prisma.user.findUnique({ where: { id: parent.id }})
                .likes();
            }
        })
    }
})