import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Avatar from "./Avatar";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import useLike from "@/hooks/useLike";
import useCurrentUser from "@/hooks/useCurrentUser";

interface IProps {
  userId?: string;
  post: Record<string, any>;
}

const PostItem = ({ userId, post }: IProps) => {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  const loginModal = useLoginModal();
  const { hasLiked, toggleLiked } = useLike({postId:post?.id});
  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${post?.user?.id}`);
    },
    [router, post?.user?.id]
  );

  const goToPost = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/posts/${post?.id}`);
    },
    [router, post]
  );

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (!user) {
        return loginModal?.onOpen();
      }
      toggleLiked();
    },
    [loginModal, toggleLiked, user]
  );

  const createdAt = useCallback(() => {
    if (!post?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(post?.createdAt));
  }, [post]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
    >
      <div className="flex items-start gap-3">
        <Avatar userId={post?.user?.id} />
        <div>
          <div className="flex items-center gap-2">
            
            <p
              className="text-white font-semibold cursor-pointer hover:underline"
              onClick={goToUser}
            >
              {post?.user?.name}
            </p>
            <span
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
              onClick={goToUser}
            >
              @{post?.user?.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt()}</span>
          </div>
          <div className="text-white mt-1">{post?.body}</div>
          <div className="flex items-center mt-3 gap-10">
            <div className="flex items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{post?.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            >
              <LikeIcon size={20} color={hasLiked ? 'red' : ''} />
              <p>{post?.linkedIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
