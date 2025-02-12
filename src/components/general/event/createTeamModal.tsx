import { useMutation } from "@apollo/client";
import { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";

import Button from "~/components/button";
import Modal from "~/components/modal";
import createToast from "~/components/toast";
import { CreateTeamDocument, type Event } from "~/generated/generated";

const CreateTeamModal = ({ eventId }: { eventId: Event["id"] }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [createTeam] = useMutation(CreateTeamDocument, {
    refetchQueries: ["MyTeam"],
  });

  const [name, setName] = useState("");
  const handleCreateTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promise = createTeam({
      variables: {
        eventId: eventId,
        name: name,
      },
      refetchQueries: ["MyTeam"],
    }).then((res) => {
      if (res.data?.createTeam.__typename === "Error") {
        setError(res.data.createTeam.message);
      } else setOpen(false);
    });
    await createToast(promise, "Creating Team");
  };

  return (
    <>
      <Button
        className="w-full !skew-x-0 items-center !justify-center rounded-full !tracking-normal"
        onClick={() => setOpen(true)}
        intent={"primary"}
      >
        <IoCreateOutline />
        Create Team
      </Button>
      <Modal
        onClose={() => {
          setOpen(false);
          setError("");
        }}
        showModal={open}
        size="small"
        title="Create Team"
        rounded="md"
      >
        <form
          onSubmit={handleCreateTeam}
          className="flex w-full flex-col gap-3 px-5 pb-5 md:px-6 md:pb-6"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="teamName" className="font-semibod text-white">
              Team Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="teamName"
              id="teamName"
              required
              className="w-full rounded-xl border border-[#D79128] bg-[#054432] bg-opacity-70 py-1 px-2 backdrop-blur-xl backdrop-filter"
            />
          </div>
          <Button
            className="w-full !skew-x-0 py-2 items-center !justify-center rounded-full !tracking-normal"
            type="submit"
            intent="primary"
            size="small"
          >
            Create Team
          </Button>
          {error && (
            <p className="rounded-sm bg-red-200 px-3 py-1 font-semibold text-red-800">
              {error}
            </p>
          )}
        </form>
      </Modal>
    </>
  );
};

export default CreateTeamModal;
