export type PostDbType = {
    id: number
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    likesCount: number
    dislikesCount: number
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
}

/*
CREATE TABLE posts (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    short_description VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    blog_id VARCHAR(255) NOT NULL,
    blog_name VARCHAR(255) NOT NULL,
    likes_count INT DEFAULT 0,
    dislikes_count INT DEFAULT 0,
    deleted_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
*/
