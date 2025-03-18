import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface IProps{
    userId?:string;
}

const PostFeed = ({userId}:IProps) => {
    const {data:posts} = usePosts(userId)
  return (
    <>
        {posts?.map((post:Record<string,any>)=>{
            return (
                <PostItem
                key={post?.id}
                post={post}
                userId={userId}
            />
            )
        })}
    </>
  )
}

export default PostFeed