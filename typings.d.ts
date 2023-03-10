type Comments = {
    created_at: string
    id: number
    post_id: number
    text: string
    username: string
}

type Vote = {
    created_at: string
    id: number
    post_id: number
    upvote: Boolean
    username: string
}

type Subreddit = {
    created_at: string
    id: number
    topic: string
}

type Post = {
    body: string
    created_at: string
    id: number
    image: string
    subreddit_id: number
    tittle: string
    username: string
    voted: Vote[]
    comments: Comments[]
    subreddit: Subreddit[]
}
