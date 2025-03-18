import useLoginModal from "@/hooks/useLoginModal"
import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Input from "../input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";

const LoginModal = () => {
    const loginModal = useLoginModal();
   
    const registerModal = useRegisterModal();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const [isLoading,setLoading] = useState(false);
    
    const onSubmit = useCallback(async ()=>{
        if(email === "" || password === ""){
            
            return;
        }
        try{
            setLoading(true);
            // add login
           
            const response = await signIn('credentials',{
                email,password,redirect: false
            })
            if (response?.error) {
                // Handle error case
                console.error('Login failed:', response.error);
                toast.error('Login failed: ' + response.error);
            } else {
                loginModal.onClose();
                toast.success('Login successful!');
            }
            loginModal.onClose();
        }catch(error){
            if(axios.isAxiosError(error)){
                toast.error(error?.response?.data?.message)
            }else{
                toast.error("Something went wrong")
            }
        }finally{
            setLoading(false)
        }
    },[loginModal])

    const toggleModal = useCallback(async ()=>{
        if(isLoading){
            return;
        }
        registerModal.onOpen();
        loginModal.onClose();
    },[loginModal,registerModal,isLoading])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
                name="email"
                type="email"
            />
            <Input
                placeholder="Password"
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
                name="password"
                type="password"
            />
            
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>First time using Twitter?
                <span className="text-white cursor-pointer hover:underline" onClick={toggleModal}>Create an account</span>
            </p>
        </div>
    ) 
    
  return (
    <Modal
        disabled={isLoading}
        isOpen={loginModal?.isOpen}
        onClose={loginModal?.onClose}
        title="Login"
        actionLabel="Sign In"
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal