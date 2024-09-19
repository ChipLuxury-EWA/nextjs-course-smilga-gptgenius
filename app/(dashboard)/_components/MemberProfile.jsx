import { UserButton } from "@clerk/nextjs";
import { currentUser, auth } from "@clerk/nextjs/server";

const MemberProfile = async () => {
  const user = await currentUser();

  return (
    <div className="px-4 flex items-center gap-4">
      <UserButton />
      <div className="join join-vertical">
        <p className="text-2xl join-item">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-sm join-item">{user.emailAddresses[0].emailAddress}</p>
      </div>
    </div>
  );
};
export default MemberProfile;
