import { Prisma } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg, intArg, inputObjectType, enumType, arg, list } from "nexus";


export const Book = objectType({
    name: "Book",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("title");
        t.nonNull.string("body");
        t.nonNull.string("author");
        t.nonNull.string("genre");
        t.nonNull.int("date");
        t.nonNull.string("url");
        t.field("postedBy", {
            type: "User",
            resolve(parent, args, context) {
                return context.prisma.book.findUnique({
                    where: { id: parent.id }
                })
                .postedBy();
            }
        });
        t.nonNull.list.nonNull.field("likers", {
            type: "User",
            resolve(parent, args, context) {
                return context.prisma.book.findUnique({ where: { id: parent.id }})
                .likers();
            }
        })
    },
});

export const BookQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field("feed", {
            type: "Feed",
            args: {
                filter: stringArg(),
                skip: intArg(),
                take: intArg(),
                orderBy: arg({ type: list(nonNull(BookOrderByInput)) })
            },
            async resolve(parent, args, context) {
                const where = args.filter ? {
                    OR: [
                        { title: { contains: args.filter }},
                        { author: { contains: args.filter }},
                        { genre: { contains: args.filter}},
                    ],
                } : {}

                const books = await context.prisma.book.findMany({
                    where,
                    skip: args?.skip as number | undefined,
                    take: args?.take as number | undefined,
                    orderBy: args?.orderBy as Prisma.Enumerable<Prisma.BookOrderByWithRelationInput> | undefined,
                });

                const count = await context.prisma.book.count({ where });

                return {
                    books,
                    count,
                }
            }
        });
        t.field("book", {
            type: "Book",
            args: {
                id: nonNull(intArg())
            },
            resolve(parent, args, context, info) {
                return context.prisma.book.findUnique({
                    where: {
                        id: args.id
                    }
                })
            }
        });
    }
})


export const BookMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createBook", {
            type: "Book",
            args: {
                title: nonNull(stringArg()),
                body: nonNull(stringArg()),
                author: nonNull(stringArg()),
                genre: nonNull(stringArg()),
                date: nonNull(intArg()),
                url: nonNull(stringArg()),
            },
            resolve(parent, args, context) {
                const { userId } = context;

                if(!userId) {
                    throw new Error("Cannot post book without login")
                }

                const newBook = context.prisma.book.create({
                    data: {
                        title: args.title,
                        body: args.body,
                        author: args.author,
                        genre: args.genre,
                        date: args.date,
                        url: args.url,
                        postedBy: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                })
                return newBook;
            }
        });

        t.nonNull.field("updateBook", {
            type: "Book",
            args: {
                title: stringArg(),
                body: stringArg(),
                author: stringArg(),
                genre: stringArg(),
                date: intArg(),
                url: stringArg(),
                id: nonNull(intArg()),
            },
            async resolve(parent, args, context) {
                const { userId } = context;

                if(!userId) {
                    throw new Error("Cannot update book")
                }

                const updateBook = await context.prisma.book.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        title: args.title || undefined,
                        body: args.body || undefined,
                        author: args.author || undefined,
                        genre: args.genre || undefined,
                        date: args.date || undefined,
                        url: args.url || undefined,
                    }
                })

                return updateBook
            }
        })

        t.nonNull.field("deleteBook", {
            type: "Book",
            args: {
                id: nonNull(intArg())
            },
            resolve(parent, args, context) {
                const { userId } = context;

                if(!userId) {
                    throw new Error("Cannot delete book")
                }

                const deleteBook = context.prisma.book.delete({
                    where: {
                        id: args.id
                    }
                })
                return deleteBook
            }
        })
    }
})

export const BookOrderByInput = inputObjectType({
    name: "BookOrderByInput",
    definition(t) {
        t.field("title", { type: Sort });
        t.field("author", { type: Sort });
        t.field("createdAt", { type: Sort });
    },
});

export const Sort = enumType({
    name: "Sort",
    members: ["asc", "desc"]
});

export const Feed = objectType({
    name: "Feed",
    definition(t) {
        t.nonNull.list.nonNull.field("books", { type: Book });
        t.nonNull.int("count");
    },
});