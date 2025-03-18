import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation"
import { useCallback } from "react";
import Avatar from "./Avatar";

interface IProps{
    comment:Record<string,any>
}

const CommentItem = ({comment}:IProps) => {
    const router = useRouter();
    const goToUser = useCallback(
        (event: any) => {
          event.stopPropagation();
          router.push(`/users/${comment?.user?.id}`);
        },
        [router, comment?.user?.id]
      );
      const createdAt = useCallback(() => {
          if (!comment?.createdAt) {
            return null;
          }
          return formatDistanceToNowStrict(new Date(comment?.createdAt));
        }, [comment]);
  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition ">
        <div className="flex items-start gap-3">
            <Avatar userId={comment?.user?.id}/>
            <div>
            <div className="flex items-center gap-2">
                <p onClick={goToUser} className="text-white font-semibold cursor-pointer hover:underline">{comment?.user?.name}</p>
                <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">@{comment?.user?.username}</span>
                <span className="text-neutral-500 text-sm">{createdAt()}</span>
            </div>
            <div className="text-white mt-1">{comment?.body}</div>
            </div>
        </div>
    </div>
  )
}

export default CommentItem