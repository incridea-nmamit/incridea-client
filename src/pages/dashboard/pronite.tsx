import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import Button from "~/components/button";

import { QRCodeScanner } from "~/components/general/dashboard/organizer/qRCodeScanner";
import Dashboard from "~/components/layout/dashboard";
import { CONSTANT } from "~/constants";
import { useAuth } from "~/hooks/useAuth";

function Pronite() {
  const router = useRouter()
  const { loading, user } = useAuth()

  if (loading) {
    return <Dashboard>
      Loading...
    </Dashboard >
  }

  if (!user || user.id !== `${CONSTANT.PID.PRONITE_USER}`) {
    void router.push("/profile")
    return <Dashboard>
      Redirecting...
    </Dashboard >
  }

  return (
    <Dashboard className="flex justify-center items-center flex-col gap-4">
      <div className="w-full flex justify-center items-center gap-1">
        <h2 className="text-xl text-white md:text-2xl">Pronite Scanner</h2>
        <Button
          intent={"danger"}
          className="flex gap-2"
          onClick={async () => {
            toast.loading("Logging out...");
            await signOut();
            toast.success("Logged out successfully");
          }}
        >
          Log Out
          <LogOut />
        </Button>
      </div>
      <div className="max-w-sm">
        <QRCodeScanner intent="pronite" />
      </div>
    </Dashboard>
  );
}

export default Pronite;
