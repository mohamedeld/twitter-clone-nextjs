import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Input from "../input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [username,setUserName] = useState('');
    const [password,setPassword] = useState('')
    const [isLoading,setLoading] = useState(false);
    console.log("ema" ,email)
    const onSubmit = useCallback(async ()=>{
        try{
            setLoading(true);
           const res= await axios.post('/api/register',{
                name,
                email,
                username,
                password
            }) 
            if(res?.status === 201){
                toast.success("user created successfully");
                registerModal.onClose();
            }
        }catch(error){
            if(axios.isAxiosError(error)){
                console.log(error)
                toast.error(error?.response?.data?.message)
            }else{
                toast.error("Something went wrong")
            }
        }finally{
            setLoading(false)
        }
    },[registerModal])

    const toggleModal = useCallback(()=>{
        if(isLoading){
            return;
        }
        registerModal.onClose();
        loginModal.onOpen();
    },[loginModal,registerModal,isLoading])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Name"
                onChange={(e)=> setName(e.target.value)}
                value={name}
                disabled={isLoading}
                name="name"
                type="text"
            />
            <Input
                placeholder="User Name"
                onChange={(e)=> setUserName(e.target.value)}
                value={username}
                disabled={isLoading}
                name="username"
                type="text"
            />
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
                name='password'
                type="password"
            />
            
        </div>
    )
    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Already have an account?
                <span className="text-white cursor-pointer hover:underline" onClick={toggleModal}>Sign in</span>
            </p>
        </div>
    )
  return (
    <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        onClose={registerModal?.onClose}
        title="Create an account"
        actionLabel="Sign Up"
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal