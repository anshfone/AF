import React from "react"

export interface Post {
    creator: string,
    title: string,
    content: string
}

interface PostProps {
    post: Post
}

export const PostComponent: React.FC<PostProps> = ({ post }) => {
    return (
        <div className="bg-white border rounded-lg shadow-md p-4 my-4">
            <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
                <span className="text-gray-600">Posted by: {post.creator}</span>
            </div>
            <p className="mt-2 text-gray-800 text-left">{post.content}</p>
        </div>
    )
}
