import { fetchUserTokenById } from "@/utils/token.actions";
import { UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const ProfilePage = async () => {
  const { userId } = auth();
  const currentTokens = await fetchUserTokenById(userId);
  return (
    <>
      <div className="badge badge-primary badge-lg mb-4">Token amount: {currentTokens}</div>
      <UserProfile routing="hash" />;
    </>
  );
};

export default ProfilePage;
