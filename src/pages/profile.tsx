import "locomotive-scroll/dist/locomotive-scroll.css";
import { Role } from "~/generated/generated";
import Loader from "~/components/loader";
import { useAuth } from "~/hooks/useAuth";
import ProfileCard from "~/components/profile/ProfileCard";
import UserEvents from "~/components/profile/UserEvents";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import LeaderBoard from "~/components/profile/LeaderBoard";
import { Button } from "~/components/button/button";
import { UserPen } from "lucide-react";
import AvatarModal from "~/components/profile/avatarModal";
import { CONSTANT } from "~/constants";

const Page = () => {
  const { error, user: user, loading } = useAuth();
  const containerRef = useRef(null);
  const router = useRouter();
  const [showQr, setShowQr] = useState<boolean>(false);
  const [showAvatarModal, setShowAvatarModal] = useState<boolean>(false);

  if (loading) return <Loader />;

  if (!user) {
    void router.push("/login");
    return null;
  }

  if (error)
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-primary-300 to-primary-500">
        <h1 className="text-2xl font-bold text-white">
          Something went wrong. Please try again later.
        </h1>
      </div>
    );

  if (user.role === Role.User) {
    void router.push("/register");
    return null;
  }

  if (user.role === Role.Judge) {
    void router.push("/dashboard");
    return null;
  }

  if (user.id === `${CONSTANT.PID.PRONITE_USER}`) {
    void router.push("/dashboard/pronite");
    return null;
  }

  return (
    <main
      ref={containerRef}
      className=" h-fit flex w-screen md:p-8 p-4 md:mb-8"
    >
      <div className="flex md:flex-row flex-col w-full mt-16 p-2 gap-8 h-full pb-8 relative">
        <div className="md:w-[30rem] w-full h-[85vh] rounded-lg overflow-hidden col-span-1 border-secondary-500/50 border-2 flex flex-col gap-0 md:sticky md:top-[10%]">
          <div className="w-full h-full relative">
            <AvatarModal
              showModal={showAvatarModal}
              setShowModal={setShowAvatarModal}
            />
            <Button
              onClick={() => setShowAvatarModal(!showAvatarModal)}
              className="border-none size-10 rounded-md border-secondary-500 stroke-secondary-500 absolute top-5 left-5 z-50"
            >
              <UserPen className="scale-[200%]" />
            </Button>
            <ProfileCard user={user} showQR={showQr} />
          </div>
          <LeaderBoard
            isShowQr={showQr}
            setQr={() => setShowQr(!showQr)}
          />
        </div>

        {/* md:h-full h-[85vh] */}
        <div className="w-full col-span-3">
          <UserEvents userId={user.id} />
        </div>
      </div>
    </main>
  );
};

export default Page;
