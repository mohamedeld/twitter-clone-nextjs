import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import usePost from "@/hooks/usePost";

interface IProps{
    placeholder:string;
    isComment?:boolean;
    postId?:string;
}

const Form = ({placeholder,isComment,postId}:IProps) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const {data:user} = useCurrentUser();
    const {mutate:mutatePost} = usePosts();
    const [body,setBody] = useState('');
    const [loading,setLoading] = useState(false);
    const {mutate:mutateSinglePost} = usePost(postId);

    const onSubmit = useCallback(async ()=>{
        try{
            setLoading(true);
            const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts'
            const res = await axios.post(url,{body});
            if(res?.status === 201){
                toast.success("Post added successfully");
                setBody('');
                mutatePost();
                mutateSinglePost();
            }
        }catch(error){
            if(axios.isAxiosError(error)){
                toast.error(error?.response?.data || error?.message);
            }else{
                toast.error('Something went wrong')
            }
        }finally{
            setLoading(false)
        }
    },[body,mutatePost,isComment,postId,mutateSinglePost])
  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
        {user ? (<div className="flex gap-4">
            <div>
            <Avatar userId={user?.id}/>
            </div>
            <div className="w-full">
                <textarea 
                    disabled={loading}
                    onChange={(e)=> setBody(e.target.value)}
                    value={body}
                    className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder:text-neutral-500 text-white"
                    placeholder={placeholder}

                ></textarea>
                    <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition "/>
                    <div className="mt-4 flex justify-end ">
                        <Button disabled={loading || !body} label="Tweet" onClick={onSubmit}/>
                    </div>
            </div>
        </div>):(
            <div className="py-8">
            <h1 className="text-white text-2xl text-center mb-4 font-bold">Welcome to twitter</h1>
            <div className="flex items-center justify-center gap-4">
                <Button label="Login" onClick={loginModal.onOpen}/>
                <Button label="Register" onClick={registerModal.onOpen} secondary/>
            </div>

        </div>
        )}
    </div>
  )
}

export default Form