import { extendType, nonNull, objectType, stringArg, intArg, idArg, arg } from "nexus";
import { NexusGenObjects } from '../../nexus-typegen';

export const Book = objectType({
    name: "Book",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("title");
        t.nonNull.string("body");
        t.nonNull.string("author");
        t.nonNull.string("genre");
        t.nonNull.int("date");
    },
});

let books: NexusGenObjects["Book"][] = [
    {
        id: 1,
        title: "La Montagne Magique",
        body: "Magnifique oeuvre de Thomas Mann qui narre les aventures de son personnage, Hans Castorp",
        author: "Thomas Mann",
        genre: "classique",
        date: 1924
    },
    {
        id: 2,
        title: "Les innovateurs",
        body: "Cet ouvrage retrace l'histoire de ceux qui ont contribué à l'apogée de l'ère numérique.",
        author: "Walter Isaacson",
        genre: "classique",
        date: 2014
    }
]

export const BookQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("books", {
            type: "Book",
            resolve(parent, args, context, info) {
                return books;
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
                const { title, body, author, genre, date } = args;

                let idCount = books.length + 1;
                const book = {
                    id: idCount,
                    title: title,
                    body: body,
                    author: author,
                    genre: genre,
                    date: date,
                };
                books.push(book);
                return book;
            }
        })
    }
})