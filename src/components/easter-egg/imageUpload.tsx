import { useMutation } from "@apollo/client";
import Image from "next/image";
import React, { useRef, useState } from "react";

import Spinner from "~/components/spinner";
import { env } from "~/env";
import { CreateSubmissionDocument } from "~/generated/generated";

type Props = {
  existingImage?: string | null;
  setImage: (arg1: File | null) => void;
  loading: boolean;
  cardId: string;
};

const ImageUpload = ({ existingImage, setImage, loading, cardId }: Props) => {
  const [highlighted, setHighlighted] = useState(false);

  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [manualLoading, setManualLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [submissionMutation, { loading: submissionLoading }] = useMutation(
    CreateSubmissionDocument,
  );

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files?.[0]) {
      setMediaPreview(null);
      setImage(null);
      return;
    }

    setImage(files[0]);
    setMediaPreview(URL.createObjectURL(files[0]));

    const formData = new FormData();
    const url = `${env.NEXT_PUBLIC_SERVER_URL}/easter-egg/upload`;

    setManualLoading(true);

    formData.append("image", files[0]);
    await fetch(url, {
      method: "POST",
      body: formData,
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then(async (data: { message: string; url: string }) => {
        await submissionMutation({
          variables: {
            cardId: Number(cardId),
            image: data.url,
          },
        }).then((res) => {
          if (
            res.data?.createSubmission.__typename !==
            "MutationCreateSubmissionSuccess"
          ) {
            throw new Error("Error uploading submission");
          }
        });
      })
      .catch((err) => {
        alert(err);
      });
    setManualLoading(false);
  };

  return (
    <>
      <input
        type="file"
        id="image"
        className="hidden"
        placeholder="Banner..."
        ref={inputRef}
        onChange={handleChange}
      />
      <div
        className={`bodyFont flex min-h-[150px] grow cursor-pointer items-center justify-center rounded-b-md md:rounded-md ${
          highlighted ? "bg-blue/20 ring-2 ring-blue-500" : "bg-black/20"
        }`}
        onClick={() => {
          inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setHighlighted(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setHighlighted(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setHighlighted(false);

          const droppedFile = Array.from(e.dataTransfer.files);

          if (droppedFile[0]) {
            setImage(droppedFile[0]);
            setMediaPreview(URL.createObjectURL(droppedFile[0]));
          }
        }}
      >
        {loading || submissionLoading || manualLoading ? (
          <>
            <Spinner />
          </>
        ) : existingImage && !mediaPreview ? (
          <div className="rounded-sm">
            <Image
              width={1500}
              height={1500}
              className="h-64 object-contain"
              src={existingImage}
              alt="Clue Image"
            />
          </div>
        ) : mediaPreview === null ? (
          <>
            <span className="p-5">Upload image</span>
          </>
        ) : (
          <div className="rounded-sm">
            <Image
              width={1500}
              height={1500}
              className="h-64 object-contain"
              src={mediaPreview}
              alt="Clue Image"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUpload;
