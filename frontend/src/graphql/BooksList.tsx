import React from 'react';
import { gql } from "@apollo/client";

const GET_BOOKS = gql`
    query BooksList($skip: Int) {
        feed(skip: $skip) {
            books {
                id
                title
                body
                author
                date
                genre
                url
                likers {
                    id
                }
            }
        }
    }
`

export default GET_BOOKS;