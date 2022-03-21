import React from 'react';
import { gql } from "@apollo/client";

const GET_ONE_BOOK = gql`
    query book($bookId: Int!) {
        book(id: $bookId) {
            id
            title
            body
            author
            date
            genre
            url
        }
    }
`

export default GET_ONE_BOOK;