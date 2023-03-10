import { gql, useQuery } from "@apollo/client"

export const GET_ALL_POSTS = gql `
    query MyQuery {
        getPostsList {
            body
            created_at
            id
            image
            tittle
            subreddit_id
            username
            comments {
                created_at
                id
                post_id
                text
                username
            }
            subreddit {
                created_at
                id
                topic
            }
            votes {
                created_at
                id
                post_id
                upvote
                username
            }
        }
    }
`

export const GET_SUBREDDIT_BY_TOPIC = gql `
    query MyQuery ($topic: String!) {
        getSubredditListByTopic(topic: $topic) {
            id 
            topic
            created_at
        }
    }
`

export const GET_ALL_POSTS_BY_TOPIC = gql `
    query MyQuery($topic: String!) {
        getSubredditListByTopic(topic: $topic) {
            body
            comments {
                created_at
                id
                post_id
                text
                username
            }
            created_at
            id
            image
            subreddit {
                created_at
                id 
                topic
            }
            tittle
            subreddit_id
            username
            votes {
                created_at
                id
                post_id
                upvote
                username
            }
        }
    }
`

export const GET_POSTS_BY_POST_ID = gql `
    query MyQuery($topic: String!) {
        getPostsListByPostId(post_id: $post_id) {
            body
            comments {
                created_at
                id
                post_id
                text
                username
            }
            created_at
            id
            image
            subreddit {
                created_at
                id 
                topic
            }
            tittle
            subreddit_id
            username
            votes {
                created_at
                id
                post_id
                upvote
                username
            }
        }
    }
`

export const GET_ALL_VOTES_BY_POST_ID = gql`
query MyQuery($post_id: ID!){
        getVotesByPostId(post_id: $post_id) {
            created_at
            id
            post_id
            upvote
            username
        }
    }
`

export const GET_SUBREDDITS_WITH_LIMIT = gql`
    query MyQuery {
        getSubredditListLimit(limit: 10) {
            created_at
            id
            topic
        }
    }
`