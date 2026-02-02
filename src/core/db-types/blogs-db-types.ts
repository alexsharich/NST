export type BlogDbType = {
    id: string
    blogName: string
    description: string
    websiteUrl: string
    createdAt: string
    deletedAt: string | null
    isMembership: boolean
    userId?: string
}
/*
CREATE TABLE blogs(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    "blogName" varchar COLLATE "C",
    "description" varchar,
    "websiteUrl" varchar,
    "isMembership" boolean DEFAULT false,
    "deletedAt" varchar,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)*/
