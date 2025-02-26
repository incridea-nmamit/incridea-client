import { type NextPage } from "next";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import Spinner from "~/components/spinner";
import { AuthStatus, useAuth } from "~/hooks/useAuth";
import clues from "./clues.json";
import { UploadButton } from "~/components/uploadthing/button";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { CreateSubmissionDocument, DayType, GetCardsDocument } from "~/generated/generated";
import { useState } from "react";

const EasterEgg: NextPage = () => {
  const { status, loading: authLoading } = useAuth();
  const [submissionMutation] = useMutation(CreateSubmissionDocument);
  const [images, setImages] = useState<string[]>([]);
  const getDay = () => {
    const date = new Date();
    const day = date.getDate();
    if (day === 26) return "Day0";
    if (day === 27) return "Day1";
    if (day === 28) return "Day2";
    if (day === 1) return "Day3";
    if (day === 2) return "Day4";
  };

  const { data: cardsFromDb, loading: cardsLoading } = useQuery(GetCardsDocument, {
    variables: {
      day: getDay() as DayType,
    },
  });

  const day = getDay() as DayType; // Day1 for test 

  if (getDay() == "Day0") {
    return (
      <div className="relative min-h-screen pt-18 flex items-center justify-center">
        <div className="mt text-center text-3xl text-white/90 px-4">
          🐣 Come back on 27th to start the Easter Egg Hunt!
        </div>
      </div>
    );
  }
  const cards = (cardsFromDb?.getCards ?? clues[day]) as Array<{ clue: string, day: DayType, id: number }>;

  const handleImageUpload = (index: number, url: string) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = url;
      return newImages;
    });
  };


  if (authLoading)
    return (
      <div className="relative min-h-screen pt-28">
        <div className="mt-10 text-center text-xl text-white/90">
          <Spinner intent={"white"} size={"large"} />
        </div>
      </div>
    );
  if (status !== AuthStatus.AUTHENTICATED)
    return (
      <div className="relative min-h-screen pt-28">
        <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center text-xl text-white/90">
          <span className="text-3xl font-semibold">Uh-oh! </span>
          <span>
            You need to{" "}
            <Link className="underline" href={"/login"}>
              login
            </Link>{" "}
            to view easter eggs
          </span>
        </div>
      </div>
    );

  return (
    <div className="relative min-h-screen">
      <Toaster />
      <div className="flex flex-col items-center justify-center px-4 pb-12 pt-28 md:px-8">
        <h2 className="mb-8 text-center text-3xl md:text-4xl text-white">
          Upload your images!
        </h2>
        <h2 className="mb-3 text-center text-lg md:text-xl text-white">
          Find clues across the campus and upload them here
        </h2>
        <h2 className="mb-8 text-center text-lg md:text-xl font-semibold text-white">
          Note: Click on submit to confirm your submission
        </h2>
        {Array.isArray(cards) && cards.length === 0 ? (
          <Spinner />
        ) : (
          <div className="flex max-w-6xl flex-wrap justify-center gap-4 md:gap-8 text-white/90">
            {cards.map((card, index) => (
              <div
                key={index}
                className="flex min-w-[250px] md:min-w-[300px] basis-full flex-col rounded-md bg-black/20 shadow-sm md:basis-[45%]"
              >
                <h2 className="mb-2 px-4 pt-4 text-lg md:text-xl md:px-6 md:pt-6">
                  Clue {index + 1}
                </h2>
                <h2 className="mb-3 px-4 md:px-6">{card.clue}</h2>
                <div className="flex grow flex-col md:px-6 md:pb-4">
                  <UploadButton
                    endpoint="easterEgg"
                    className="mt-6"
                    onBeforeUploadBegin={(files) => {
                      return files.map((f) => new File([f], f.name, { type: f.type }));
                    }}
                    onUploadBegin={() => {
                      toast.loading("Uploading...");
                    }}
                    onClientUploadComplete={(res) => {
                      handleImageUpload(index, res[0]?.url ?? '');
                      toast.dismiss();
                      toast.success("Image uploaded", { position: "bottom-right" });
                    }}
                    onUploadError={(error: Error) => {
                      toast.dismiss();
                      toast.error(`ERROR! ${error.message}`);
                    }}
                  />
                  <button
                    className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                    onClick={async () => {
                      await submissionMutation({
                        variables: {
                          cardId: card.id,
                          image: images[index]!,
                        },
                      })
                        .then((res) => {
                          if (
                            res.data?.createSubmission.__typename !==
                            "MutationCreateSubmissionSuccess"
                          ) {
                            throw new Error("Error uploading submission");
                          }
                          toast.success(`Answer ${index + 1} submitted!`);
                        })
                        .catch((err) => {
                          alert(err);
                        });
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EasterEgg;
