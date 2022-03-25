import React from 'react';
import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password) {
            token
            user {
                id
                email
                password
            }
        }
    }
`;

export default LOGIN_MUTATION;