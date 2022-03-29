import React from 'react';
import { gql } from "@apollo/client";

const LIKES_MUTATION = gql`
    mutation Like($bookId: Int!) {
        like(bookId: $bookId) {
            book {
                id
            }
        }
    }
`

export default LIKES_MUTATION;