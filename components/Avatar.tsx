import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";


interface IProps{
    userId:string;
    isLarge?:boolean;
    hasBorder?:boolean;
}
interface IEvent {
    stopPropagation: () => void;
}

const Avatar = ({userId,isLarge,hasBorder}:IProps) => {
    const router = useRouter();
    const {data:user} = useUser(userId);
   

    const onClick = useCallback((event: IEvent) => {
        event.stopPropagation();
        const url = `/users/${userId}`;
        router.push(url);
    }, [router,userId]);
  return (
    <div className={` ${hasBorder ? 'border-4 border-black' : ''} 
        ${isLarge ? 'w-32 h-32':'w-12 h-12'} rounded-full hover:opacity-90 transition cursor-pointer relative
    `}>
        <Image
            src={user?.profileImage || "/avatar.jpg"}
            alt={user?.name || "user name"}
            fill
            className="object-cover rounded-full"
            onClick={onClick}
        />
    </div>
  )
}

export default Avatar