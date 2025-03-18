import CommentFeed from "@/components/CommentFeed";
import Form from "@/components/Form";
import Header from "@/components/Header";
import PostItem from "@/components/PostItem";
import usePost from "@/hooks/usePost";
import { GetServerSideProps } from "next";
import { ClipLoader } from "react-spinners";

const PostDetails = ({postId}:{postId:string}) => {
    const {data:post,isLoading} = usePost(postId);

    if(isLoading && !post){
        return (
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="lightblue" size={80}/>
          </div>
        )
      }

  return (
    <>
        <Header label="Tweet" showBackArrow/>
        <PostItem post={post}/>
        <Form postId={postId} isComment placeholder="Tweet your reply"/>
        <CommentFeed comments={post?.comments}/> 
    </>
  )
}

export default PostDetails


export const getServerSideProps: GetServerSideProps<{ postId: string }> = async (context) => {
  const { postId } = context.params as { postId: string }; // Type assertion here

  return {
    props: {
        postId,
    },
  };
};