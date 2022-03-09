import { prisma } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg, intArg } from "nexus";
import { typeScriptFileExtension } from "nexus/dist/utils";
import { NexusGenObjects } from '../../nexus-typegen';
import { User } from "./User";

export const Book = objectType({
    name: "Book",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("title");
        t.nonNull.string("body");
        t.nonNull.string("author");
        t.nonNull.string("genre");
        t.nonNull.int("date");
        t.nonNull.dateTime("createdAt")
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
        t.nonNull.list.nonNull.field("books", {
            type: "Book",
            resolve(parent, args, context, info) {
                return context.prisma.book.findMany();
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
                id: nonNull(intArg())
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