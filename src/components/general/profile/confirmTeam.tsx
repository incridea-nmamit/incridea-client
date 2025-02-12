import { useMutation } from "@apollo/client";
import React, { type FC, useState } from "react";
import { toast } from "react-hot-toast";

import { Button } from "~/components/button/button";
import { ConfirmTeamDocument } from "~/generated/generated";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "~/components/modal/modal";
import { MdVerified } from "react-icons/md";

const ConfirmTeamModal: FC<{
  teamId: string;
  canConfirm?: boolean;
  needMore?: number;
}> = ({ teamId, canConfirm, needMore }) => {
  const [showModal, setShowModal] = useState(false);

  const [confirmTeam] = useMutation(ConfirmTeamDocument, {
    refetchQueries: ["RegisterdEvents"],
    awaitRefetchQueries: true,
  });

  const handleConfirm = async (teamId: string) => {
    toast.loading("Confirming Team", {
      id: "confirm",
    });

    await confirmTeam({
      variables: {
        teamId,
      },
    }).then((res) => {
      toast.dismiss("confirm");
      if (res?.data?.confirmTeam.__typename === "MutationConfirmTeamSuccess") {
        toast.success("Team entry cofirmed");
      } else {
        toast.error(res.data?.confirmTeam.message ?? "Failed to confirm team");
      }
    });
  };

  return (
    <>
      <br />
      <Button
        className="mt-1 rounded-full hover:rounded-full transition-all duration-300"
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          e.stopPropagation();
          setShowModal(true);
        }}
      >
        <MdVerified />
        Confirm
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              You Team will be registered. This cannot be undone
            </DialogDescription>
          </DialogHeader>
          <div className="w-full flex flex-row flex-nowrap justify-center gap-4">
            <DialogClose asChild>
              <Button variant={"destructive"}>Cancel</Button>
            </DialogClose>
            <Button
              variant={"default"}
              onClick={async () => {
                setShowModal(false);
                if (canConfirm) await handleConfirm(teamId);
                else
                  toast.error(
                    `You need ${needMore} more members to confirm your team.`,
                    {
                      position: "bottom-center",
                    },
                  );
              }}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfirmTeamModal;
