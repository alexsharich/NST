export enum LikeStatus {
    Like = "Like",
    Dislike = "Dislike",
    None = "None",
}

export type LikeCommentDbType = {
    id: number;
    userId: string;
    myStatus: LikeStatus;
    commentId: string;
}

/*
CREATE TABLE like_comments (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    userId VARCHAR(255) NOT NULL, внешний
    myStatus VARCHAR(50) NOT NULL,
    commentId VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)*/

export type LikePostDbType = {
    id: number
    userId: string
    myStatus: LikeStatus
    postId: string
    login: string
    createdAt: Date;

}
/*
CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
* */
