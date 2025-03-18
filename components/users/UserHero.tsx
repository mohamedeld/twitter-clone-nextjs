import Image from "next/image";
import Avatar from "../Avatar";

interface IProps {
  userId: string;
  coverImage?: string;
}

const UserHero = ({ userId, coverImage }: IProps) => {
  return (
    <div className="bg-neutral-700 h-44 relative">
      {coverImage && (
        <Image
          src={coverImage}
          alt="Cover Image of user"
          fill
          className="object-cover"
        />
      )}
      <div className="absolute -bottom-16 left-4">
        <Avatar userId={userId} isLarge hasBorder/>
      </div>
    </div>
  );
};

export default UserHero;
