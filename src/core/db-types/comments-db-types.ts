export type CommentDbType = {
    id: number
    content: string
    postId: string
    userId: string
    userLogin: string
    likesCount: number
    dislikesCount: number
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
}

/*
CREATE TABLE comments (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    content TEXT NOT NULL,
post_id VARCHAR(255) NOT NULL,
user_id VARCHAR(255) NOT NULL,
user_login VARCHAR(255) NOT NULL,
likes_count INT DEFAULT 0,
dislikes_count INT DEFAULT 0,
deleted_at TIMESTAMP WITH TIME ZONE NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);*/
