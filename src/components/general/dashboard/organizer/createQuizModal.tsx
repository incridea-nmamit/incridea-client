import { useMutation } from "@apollo/client";
import { PencilIcon } from "lucide-react";
import { type FC, useState } from "react";
import toast from "react-hot-toast";

import Button from "~/components/button";
import { DateTimePicker } from "~/components/datetime-picker";
import { NumberInput, TextInput } from "~/components/input";
import Modal from "~/components/modal";
import Spinner from "~/components/spinner";
import createToast from "~/components/toast";
import { CreateQuizDocument } from "~/generated/generated";

const CreateQuizModal: FC<{
  eventId: string;
  roundNo: number;
  roundDate?: string;
  quizDetails?: {
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    password: string;
    overridePassword: string;
    points: number;
    qualifyNext: number;
  } | null;
}> = ({ eventId, roundNo, roundDate, quizDetails }) => {
  const formatDate = (date: Date | string): string => {
    const inputDate = new Date(date).toISOString();
    // console.log("inputDate", inputDate);
    return inputDate;
  };

  const [showModal, setShowModal] = useState(false);
  const [quizInfo, setQuizInfo] = useState({
    name: quizDetails?.name ?? "",
    description: quizDetails?.description ?? "",
    startTime: quizDetails?.startTime ?? roundDate ?? new Date(),
    endTime: quizDetails?.endTime ?? roundDate ?? new Date(),
    password: quizDetails?.password ?? "",
    points: quizDetails?.points ?? 1,
    qualifyNext: quizDetails?.qualifyNext ?? 5,
    overridePassword: quizDetails?.overridePassword ?? "",
  });
  const [createQuiz, { loading }] = useMutation(CreateQuizDocument, {
    refetchQueries: ["EventByOrganizer"],
    awaitRefetchQueries: true,
  });

  const isFormChanged = quizDetails
    ? JSON.stringify(quizInfo) !==
      JSON.stringify({
        name: quizDetails.name,
        description: quizDetails.description,
        startTime: formatDate(quizDetails.startTime),
        endTime: formatDate(quizDetails.endTime),
        password: quizDetails.password,
        points: !quizInfo.points ? quizInfo.points : quizDetails.points,
        qualifyNext: !quizInfo.qualifyNext
          ? quizInfo.qualifyNext
          : quizDetails.qualifyNext,
      })
    : !!quizInfo.name &&
      (formatDate(quizInfo.startTime) !== roundDate ||
        formatDate(quizInfo.endTime) !== roundDate) &&
      !!quizInfo.password;

  const disabled = loading || !isFormChanged;

  const handleCreateQuiz = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (new Date(quizInfo.startTime) >= new Date(quizInfo.endTime)) {
      toast.error("End time has to be greater than start time", {
        duration: 3000,
      });
      return;
    }

    if (quizInfo.points < 1) {
      toast.error("Points should be greater than 0", { duration: 3000 });
      return;
    }

    if (quizInfo.qualifyNext < 5) {
      toast.error(
        "No. of teams to be qualified for the next round should be greater than 5",
        { duration: 3000 },
      );
      return;
    }

    const promise = createQuiz({
      variables: {
        quizDescription: quizInfo.description,
        endTime: formatDate(quizInfo.endTime),
        eventId,
        quizTitle: quizInfo.name,
        startTime: formatDate(quizInfo.startTime),
        roundId: String(roundNo),
        password: quizInfo.password,
        overridePassword: quizInfo.overridePassword,
        points: quizInfo.points,
        qualifyNext: quizInfo.qualifyNext,
      },
      refetchQueries: ["EventByOrganizer"],
      awaitRefetchQueries: true,
    })
      .then((res) => {
        if (res.data?.createQuiz.__typename === "MutationCreateQuizSuccess") {
          setShowModal(false);
        } else {
          throw new Error(
            res.data?.createQuiz.message ?? "Error creating quiz",
          );
        }
      })
      .catch(async (err) => {
        const error = err instanceof Error ? err : new Error(String(err));
        await createToast(Promise.reject(error), "Failed to create quiz");
      });

    await createToast(
      promise,
      quizDetails ? "Editing Quiz..." : "Adding Quiz...",
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuizInfo({
      ...quizInfo,
      [name]:
        ["points", "qualifyNext"].includes(name) && value !== ""
          ? Number(value)
          : value,
    });
  };

  return (
    <div>
      {quizDetails ? (
        <PencilIcon
          onClick={() => setShowModal(true)}
          className="absolute right-0 top-0 m-4 cursor-pointer"
        />
      ) : (
        <Button onClick={() => setShowModal(true)} className="mt-5">
          Create Quiz
        </Button>
      )}
      <Modal
        title={`${quizDetails ? "Edit" : "Create"} Quiz`}
        showModal={showModal}
        onClose={() => setShowModal(false)}
        size="medium"
      >
        <div
          className={`p-5 ${
            loading && "pointer-events-none z-30 cursor-not-allowed opacity-50"
          }`}
        >
          <form className="flex flex-col gap-5" onSubmit={handleCreateQuiz}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Quiz Name</label>
              <TextInput
                name="name"
                placeholder="Enter quiz name"
                value={quizInfo.name}
                disabled={loading}
                onChange={handleChange}
              />
              <label htmlFor="description">Quiz Description (Optional)</label>
              <TextInput
                name="description"
                placeholder="Enter quiz description"
                value={quizInfo.description}
                disabled={loading}
                onChange={handleChange}
              />
              <label htmlFor="password">Quiz Password</label>
              <TextInput
                name="password"
                placeholder="Enter quiz password"
                value={quizInfo.password}
                disabled={loading}
                onChange={handleChange}
              />
              <label htmlFor="password">
                Quiz Malpractice Override Password (Not to be disclosed)
              </label>
              <TextInput
                name="overridePassword"
                placeholder="Enter override password"
                value={quizInfo.overridePassword}
                disabled={loading}
                onChange={handleChange}
              />
              {quizDetails && (
                <div className="flex flex-col space-y-2">
                  <label htmlFor="points">
                    Points to be awarded for right answers
                  </label>
                  <NumberInput
                    name="points"
                    placeholder="Enter points"
                    value={quizInfo.points}
                    disabled={loading}
                    onChange={handleChange}
                  />
                  <label htmlFor="qualifyNext">
                    No. of teams to be qualified for the next round
                  </label>
                  <NumberInput
                    name="qualifyNext"
                    placeholder="Enter no. of teams"
                    value={quizInfo.qualifyNext}
                    disabled={loading}
                    onChange={handleChange}
                  />
                </div>
              )}
              {
                <div className="grid-cols-2 gap-2 sm:grid">
                  <div className="flex flex-col gap-2 sm:w-3/5">
                    <label htmlFor="startTime">Start Time</label>
                    <DateTimePicker
                      type="time"
                      value={new Date(quizInfo.startTime)}
                      onChange={(date) =>
                        setQuizInfo({ ...quizInfo, startTime: date })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2 sm:w-3/5">
                    <label htmlFor="endTime">End Time</label>
                    <DateTimePicker
                      type="time"
                      value={new Date(quizInfo.endTime)}
                      onChange={(date) =>
                        setQuizInfo({ ...quizInfo, endTime: date })
                      }
                    />
                  </div>
                </div>
              }
            </div>
            <div className="flex justify-end">
              <Button className="rounded-lg" type="submit" disabled={disabled}>
                {loading ? (
                  <>
                    <Spinner intent={"white"} size={"small"} />
                    {quizDetails ? "Editing..." : "Creating..."}
                  </>
                ) : quizDetails ? (
                  "Edit"
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateQuizModal;
