import CommentItem from "./CommentItem";

interface IProps{
    comments:Record<string,any>[];
}
const CommentFeed = ({comments = []}:IProps) => {
  return (
    <>
        {comments?.map((comment)=>{
            return(
                <CommentItem key={comment?.id} comment={comment}/>
            )
        })}
    </>
  )
}

export default CommentFeed