import { gql } from "@apollo/client"

export const ADD_POST = gql`
    mutation MyMutation(
        $body: String!
        $image: String!
        $subreddit_id: ID!
        $title: String!
        $username: String!
    ) {
        insertPosts(
            body: $body
            tittle: $title
            subreddit_id: $subreddit_id
            username: $username
            image: $image
        ) {
            body
            created_at
            id
            image
            subreddit_id
            tittle
            username
        }
    }
`

export const ADD_SUBREDDIT = gql`
    mutation MyMutation($topic:String!){
        insertSubreddit(topic:$topic) {
            id 
            topic
            created_at
        }
    }
`

export const ADD_COMMENT = gql`
    mutation MyMutation($post_id:ID!, $username: String!, $text:String!) {
        insertComment(post_id: $post_id, text: $text, username: $username) {
            created_at
            id
            post_id
            text
            username
        }
    }
`

export const ADD_VOTE = gql`
    mutation MyMutation($post_id:ID!, $username: String!, $upvote:Boolean!) {
        insertVote(post_id:$post_id, username: $username, upvote: $upvote) {
            id
            created_at
            post_id
            upvote
            username
        }
    }
`