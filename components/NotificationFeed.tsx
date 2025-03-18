import useNotifications from "@/hooks/useNotifications";
import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";

const NotificationFeed = () => {
    const {data:session,update} = useSession();
    const {data:notifications = []} = useNotifications(session?.user?.id);
    
    useEffect(()=>{
      update({
        ...session,
        user:{
          ...session?.user,
          notifications:notifications
        }
      })
    },[update,notifications,session])

    if(notifications?.length ===0){
      return (
        <div className="text-neutral-600 text-center p-6 text-xl ">
          No Notifications
        </div>
      )
    }

  return (
    <div className="flex flex-col">
      {notifications?.map((notification:Record<string,any>)=>{
        return (
          <div key={notification?.id} className="flex items-center p- 6 gap-4 border-b-[1px] border-neutral-800">
            <BsTwitter color="white" size={32}/>
            <p className="text-white">{notification?.body}</p>
          </div>
        )
      })}
    </div>
  )
}

export default NotificationFeed