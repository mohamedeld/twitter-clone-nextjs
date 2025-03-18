import useNotifications from "@/hooks/useNotifications";
import { useSession } from "next-auth/react"
import { useEffect } from "react";

const NotificationFeed = () => {
    const {data:session,update} = useSession();
    const {data:notifications = []} = useNotifications(session?.user?.id);
    
    useEffect(()=>{
        
    })

  return (
    <div>NotificationFeed</div>
  )
}

export default NotificationFeed