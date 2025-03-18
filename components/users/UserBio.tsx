import useCurrentUser from "@/hooks/useCurrentUser";
import { format } from "date-fns";
import { useMemo } from "react";
import Button from "../Button";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "@/hooks/useEditModal";
import useFollows from "@/hooks/useFollow";

interface IProps{
    userId:string;
    createdAt:Date;
    name:string;
    bio:string;
    followingIds:string[];
    username:string;
    followersCount:number;
}

const UserBio = ({userId,createdAt,name,username,bio,followingIds,followersCount}:IProps) => {
    const {data:user} = useCurrentUser();
    const editModal = useEditModal();
    const {isFollowing,toggleFollow} = useFollows(userId);
    const created_at = useMemo(()=>{
        if(!createdAt){
            return null;
        }
        return format(new Date(createdAt),"MMMM yyyy");
    },[createdAt])

  return (
    <div className="borde-b-[1px] border-neutral-800 pb-4">
        <div className="flex justify-end p-2">
            {userId === user?.id ? (
                <Button secondary label="Edit" onClick={editModal?.onOpen}/>
            ):(
                <Button label={isFollowing? "Unfollow" :"Follow"} onClick={toggleFollow} secondary={!isFollowing} outline={isFollowing}/>
            )} 
        </div>
        <div className="mt-8 px-4">
            <div className="flex flex-col">
                <p className="text-white text-2xl font-semibold">{name}</p>
                <p className="text-md text-neutral-500">
                    @{username}
                </p>
            </div>
            <div className="flex flex-col mt-4">
                <p className="text-white">{bio}</p>
                <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
                    <BiCalendar size={24}/>
                    <p>Joined {created_at}</p>
                </div>
            </div>
            <div className="flex flex-row items-center mt-4 gap-6">
                <div className="flex flex-row items-center gap-1">
                    <p className="text-white">
                        {followingIds?.length}
                    </p>
                    <p className="text-neutral-500">Following</p>
                </div>
                <div className="flex flex-row items-center gap-1">
                    <p className="text-white">
                        {followersCount}
                    </p>
                    <p className="text-neutral-500">Followers</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserBio