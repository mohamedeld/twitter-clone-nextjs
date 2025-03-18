import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import axios from "axios";
import toast from "react-hot-toast";

const useLike = ({postId}:{postId:string})=>{
    const {data:user} = useCurrentUser();
    const {data:post,mutate:mutatePost} = usePost(postId);
    const {mutate:mutatePosts} = usePosts(user?.id);
    
    const loginModal = useLoginModal();

    const hasLiked = useMemo(()=>{
        const list = post?.linkedIds || []
        return list?.includes(user?.id);
    },[post,user])

    const toggleLiked = useCallback(async ()=>{
        
        if(!user){
            return loginModal?.onOpen();
        }
        
        try{
            const response = hasLiked ? await axios.delete('/api/like',{data:{ postId }}) :  await axios.post('/api/like',{postId});
            if(response?.status === 200){
                mutatePost();
                mutatePosts();
                toast.success("Success");
            }

        }catch(error){
            if(axios.isAxiosError(error)){
                toast.error(error?.response?.data?.message || error?.message);
            }else{
                toast.error('Something went wrong')
            }
        }
    },[user,loginModal,mutatePost,mutatePosts,hasLiked,postId])


    return {
        hasLiked,
        toggleLiked
    }
}

export default useLike;