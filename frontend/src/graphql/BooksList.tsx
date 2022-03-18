import React from 'react';
import { gql } from "@apollo/client";

const GET_BOOKS = gql`
    query BooksList {
        feed {
            books {
                id
                title
                body
                author
                date
                genre
                url
            }
        }
    }
`

export default GET_BOOKS;