import { useMutation } from "@apollo/client";
import React, { type FC, useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";

import { Button } from "~/components/button/button";
import createToast from "~/components/toast";
import { DeleteTeamDocument } from "~/generated/generated";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "~/components/modal/modal";

const DeleteTeamModal: FC<{
  teamId: string;
  solo?: boolean;
  isLeader: boolean;
}> = ({ teamId, solo, isLeader }) => {
  const [showModal, setShowModal] = useState(false);

  const [deleteTeam] = useMutation(DeleteTeamDocument, {
    refetchQueries: ["RegisterdEvents", "MyTeam"],
    awaitRefetchQueries: true,
  });

  const handleDelete = async (teamId: string) => {
    setShowModal(false);
    const promise = deleteTeam({
      variables: {
        teamId: teamId,
      },
    }).then((res) => {
      if (res?.data?.deleteTeam.__typename !== "MutationDeleteTeamSuccess") {
        return Promise.reject(new Error("Error, something went wrong!"));
      }
    });
    await createToast(
      promise,
      solo ? "Unregistering from event" : "Deleting team",
    );
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setShowModal(true);
          }}
          variant={"destructive"}
          className="w-full"
        >
          {!solo && "Delete Team"}
          {solo ? <FaSignOutAlt /> : <BiTrashAlt />}
        </Button>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="z-50">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              {solo
                ? "You will opt out from participating in the event."
                : isLeader
                  ? "Your Team will be deleted."
                  : "You are going to leave the current team"}{" "}
              This cannot be undone
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
                await handleDelete(teamId);
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

export default DeleteTeamModal;
