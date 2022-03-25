import React from "react";
import { gql } from "@apollo/client";

const SIGNUP_MUTATION = gql`
mutation signup($email: String!, $password: String!, $username: String!){
    signup(email: $email, password: $password, username: $username) {
        user {
            id
            email
            username
            password
            }
        }
    }
`;

export default SIGNUP_MUTATION;