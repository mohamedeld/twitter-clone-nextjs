import Header from "@/components/Header"
import PostFeed from "@/components/PostFeed";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import { GetServerSideProps } from 'next';
import { ClipLoader } from "react-spinners";

const UserDetails = ({userId}:{userId:string}) => {
  const {data:user,isLoading} = useUser(userId);

  if(isLoading && !user){
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80}/>
      </div>
    )
  }

  return (
    <>
      <Header showBackArrow label={user?.name}/>
      <UserHero coverImage={user?.coverImage} userId={userId}/>
      <UserBio userId={userId} createdAt={user?.createdAt} name={user?.name} username={user?.username} bio={user?.bio} followingIds={user?.followingIds} followersCount={user?.followersCount || 0}/>
      <PostFeed userId={userId}/>
    </>
  )
}

export default UserDetails;




export const getServerSideProps: GetServerSideProps<{ userId: string }> = async (context) => {
  const { userId } = context.params as { userId: string }; // Type assertion here

  return {
    props: {
      userId,
    },
  };
};