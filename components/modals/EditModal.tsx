import useCurrentUser from "@/hooks/useCurrentUser"
import useEditModal from "@/hooks/useEditModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
    const router = useRouter();
    const {data:user} = useCurrentUser();
    const editModal = useEditModal();
    const [profileImage,setProfileImage] = useState('');
    const [coverImage,setCoverImage] = useState('');
    const [name,setName] = useState('');
    const [username,setUsername] = useState('');
    const [bio,setBio] = useState('');
    const [loading,setLoading] = useState(false);


    useEffect(()=>{
        setProfileImage(user?.profileImage);
        setCoverImage(user?.coverImage);
        setName(user?.name);
        setUsername(user?.username);
        setBio(user?.bio)
    },[user])

    const onSubmit = useCallback(async ()=>{
        try{
            setLoading(true);
            const res = await axios.patch("/api/edit",{
                name,
                username,
                bio,
                profileImage,
                coverImage
            })
            if(res?.status === 200){
                toast.success("User update successfully");
                router.refresh();
                editModal?.onClose();
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
    },[name,username,bio,profileImage,coverImage,editModal,router])
    

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload
                value={profileImage}
                disabled={loading}
                onChange={(image)=> setProfileImage(image)}
                label="Upload Profile Image"
            />
             <ImageUpload
                value={coverImage}
                disabled={loading}
                onChange={(image)=> setCoverImage(image)}
                label="Upload Cover Image"
            />
            <Input
                placeholder="Name"
                onChange={(e)=> setName(e.target.value)}
                value={name}
                disabled={loading}
                name="name"
                type="text"
            />
            <Input
                placeholder="User Name"
                onChange={(e)=> setUsername(e.target.value)}
                value={username}
                disabled={loading}
                name="username"
                type="text"
            />
            <Input
                placeholder="Bio"
                onChange={(e)=> setBio(e.target.value)}
                value={bio}
                disabled={loading}
                name="bio"
                type="text"
            />
        </div>
    )

  return (
    <>
        <Modal
            disabled={loading}
            isOpen={editModal?.isOpen}
            title="Edit your profile"
            actionLabel="Save"
            onClose={editModal?.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    </>
  )
}

export default EditModal