import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const useFollows = (userId:string)=>{
    const {data:user, mutate: mutateCurrentUser} = useCurrentUser();
    const {data:session,update} = useSession();
    const loginModal = useLoginModal();
    const list = session?.user?.followingIds || [];
    const isFollowing = list?.includes(userId)
    
    const toggleFollow = async ()=>{
        if(!user){
            return loginModal?.onOpen();
        }
        try{
            const response = isFollowing ? await axios.delete('/api/follow', { data: { userId } }) : await axios.post('/api/follow', { userId })
            if(response?.status === 200){
                toast.success("Success");
                mutateCurrentUser(); // Refresh user data to reflect the change
                
                update({
                    ...session,
                    user:{
                        ...session?.user,
                        followingIds:response?.data?.followingIds
                    }
                })

            }
        }catch(error){
            if(axios.isAxiosError(error)){
                toast.error(error?.response?.data || error?.message);
            }else{
                toast.error('Something went wrong')
            }

        }   
    }



    return {
        isFollowing,
        toggleFollow
    }
}

export default useFollows;