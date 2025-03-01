"use client";

import { useMutation, useQuery } from "@apollo/client";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  HourglassIcon,
  Sliders,
  Timer,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperClass } from "swiper/react";

import {
  type Options,
  type Question,
} from "~/pages/event/[slug]/quiz/[quizId]";

import { HelperTooltip } from "~/components/general/dashboard/organizer/quiz/HelperToolTip";
import createToast from "~/components/toast";
import { SubmitQuizAnswerDocument } from "~/generated/generated";
import { UpdateQuizFlagDocument } from "~/generated/generated";
import { GetQuizFlagDocument } from "~/generated/generated";

import styles from "./quiz.module.css";

const QuizPage = ({
  questions,
  name,
  description,
  startTime,
  endTime,
  quizId,
  teamId,
  overridePassword,
}: {
  questions: Question[];
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  quizId: string;
  teamId: number;
  overridePassword: string;
}) => {
  const { data: flagsData, loading: flagsloading } = useQuery(
    GetQuizFlagDocument,
    {
      variables: {
        quizId: quizId,
        teamId: teamId,
      },
    },
  );
  const [selectedAnswers, setSelectedAnswers] = useState<Options[]>([]);
  const selectedAnswersRef = useRef<Options[]>([]);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  const [alert, setAlert] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [submitQuizAnswers, { loading: submitQuizLoading }] = useMutation(
    SubmitQuizAnswerDocument,
  );
  const [updateQuizFlag, { loading: updateQuizFlagLoading }] = useMutation(
    UpdateQuizFlagDocument,
  );
  const [flags, setFlags] = useState(0);
  const [allowAnswers, setAllowAnswers] = useState(true);
  const [pass, setPass] = useState("");

  const handleVerify = () => {
    if (pass === overridePassword) {
      // console.log("Correct Password");
      setAllowAnswers(true);
    }
    setPass("");
  };

  const router = useRouter();

  useEffect(() => {
    if (flagsData?.getQuizFlag.__typename === "QueryGetQuizFlagSuccess") {
      setFlags(flagsData.getQuizFlag.data.flags);
      setAllowAnswers(flagsData.getQuizFlag.data.allowUser);
    }
  }, [flagsData]);

  useEffect(() => {
    void submitQuizAnswers({
      variables: {
        quizId: quizId,
        selectedAnswers: [],
        teamId: teamId,
        timeTaken: 0,
      },
    });
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem(
      `selectionOptions-${teamId}-${quizId}`,
    );
    if (savedData) {
      const savedAnswers: Options[] = JSON.parse(savedData) as Options[];
      setSelectedAnswers(savedAnswers);
    }
  }, []);

  useEffect(() => {
    hljs.highlightAll();
  }, [isReviewOpen]);

  useEffect(() => {
    // console.log("Selected Answers", selectedAnswers);
    selectedAnswersRef.current = selectedAnswers;
  }, [selectedAnswers]);

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const onSubmit = async () => {
    let timeTaken = 0;
    const quizStartTime = localStorage.getItem("quizStartTime");
    const quizEndTime = new Date().toISOString();
    if (quizStartTime) {
      timeTaken =
        (new Date(quizEndTime).getTime() - new Date(quizStartTime).getTime()) /
        60000;
    }

    const finalSelectedAnswers = selectedAnswersRef.current;

    const promise = submitQuizAnswers({
      variables: {
        quizId: quizId,
        selectedAnswers: finalSelectedAnswers.map(
          ({ id, questionId, value }) => ({
            id,
            questionId,
            value,
          }),
        ),
        teamId: teamId,
        timeTaken: timeTaken,
      },
    })
      .then((res) => {
        if (res.data?.submitQuiz.__typename === "MutationSubmitQuizSuccess") {
          localStorage.removeItem("quizStartTime");
          localStorage.removeItem(`selectionOptions-${teamId}-${quizId}`);
          setIsSubmitDialogOpen(false);
          setShowSuccessDialog(true);
          setTimeout(() => {
            router.push("/events").catch((error) => {
              console.error("Error navigating to event page:", error);
            });
          }, 3000);
        } else throw new Error("Error submitting quiz answers");
      })
      .catch((error) => {
        console.error("Error submitting quiz answers:", error);
      });

    await createToast(
      promise,
      "Submitting Quiz Answers",
      "Error submitting quiz answers",
    );
  };

  const handleFocus = () => {
    setAllowAnswers(false);
    setFlags((prev) => prev + 1);
    // console.log("User switched back to window");
  };

  useEffect(() => {
    if (flagsData) {
      void updateQuizFlag({
        variables: {
          quizId: quizId,
          teamId: teamId,
          flags: flags,
          allowUser: allowAnswers,
        },
      });
    }
  }, [flags, allowAnswers]);

  useEffect(() => {
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const [quizTrackerVisible, setQuizTrackerVisible] = useState(true);
  const [trackerPage, setTrackerPage] = useState(0);

  const questionsPerPage = 6;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  // Calculate which questions to show in the tracker
  const startIndex = trackerPage * questionsPerPage;
  const endIndex = Math.min(startIndex + questionsPerPage, questions.length);
  const visibleQuestions = questions.slice(startIndex, endIndex);

  // Auto-adjust tracker page when current question is out of view
  useEffect(() => {
    const newPage = Math.floor(currentSlide / questionsPerPage);
    if (newPage !== trackerPage) {
      setTrackerPage(newPage);
    }
  }, [currentSlide]);

  const handleNextTrackerPage = () => {
    if (trackerPage < totalPages - 1) {
      setTrackerPage((prev) => prev + 1);
    }
  };

  const handlePrevTrackerPage = () => {
    if (trackerPage > 0) {
      setTrackerPage((prev) => prev - 1);
    }
  };

  // useEffect(() => {
  //   console.log("Selected Answers", selectedAnswers);
  // }, [selectedAnswers]);
  const progressPercentage = ((currentSlide + 1) / questions.length) * 100;

  const handlePrevSlide = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const imageRef = React.useRef<HTMLImageElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!startTime || !endTime) return;

    const calculateTime = () =>
      (new Date(endTime).getTime() - Date.now()) / 1000;

    setTimer(calculateTime());
  }, [startTime, endTime]);

  useEffect(() => {
    // console.log("Time: ", new Date(endTime).getTime() - Date.now());
    if (new Date(endTime).getTime() - Date.now() <= 0) {
      router.push("/profile").catch((error) => {
        console.error("Error navigating to introduction page:", error);
      });
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => {
        const newTime = Math.max(prev - 1, 0);
        if (newTime <= 60) setAlert(true);
        if (newTime <= 0) {
          clearInterval(interval);
          if (!submitted) {
            setSubmitted(true);
            onSubmit()
              .then(() => {
                console.log("Quiz submitted successfully");
              })
              .catch((error) => {
                console.error("Error submitting quiz answers:", error);
              });
            return 0;
          }
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOptionSelect = (option: Options) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = prev.filter(
        (answer) => answer.questionId !== option.questionId,
      );
      updatedAnswers.push(option);
      localStorage.setItem(
        `selectionOptions-${teamId}-${quizId}`,
        JSON.stringify(updatedAnswers),
      );
      // console.log(updatedAnswers);
      return updatedAnswers;
    });
  };

  const formatTime = (seconds: number) => {
    const totalSeconds = Math.floor(seconds);

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    const formattedMinutes = String(m).padStart(2, "0");
    const formattedSeconds = String(s).padStart(2, "0");

    return h > 0
      ? `${String(h).padStart(2, "0")}:${formattedMinutes}:${formattedSeconds}`
      : `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="relative flex select-none flex-col items-center justify-between text-white">
      {isOpen &&
        imageRef.current &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/80 backdrop-blur-md" // Zoom effect
          >
            <div
              className="fixed inset-0"
              onClick={() => setIsOpen(false)}
            ></div>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-black/60 p-2 transition hover:bg-black/80"
            >
              <X className="h-5 w-5 text-white" />
            </button>{" "}
            <div
              className="rounded-xl border border-cyan-500/20 transition-transform duration-200 ease-out"
              style={{
                position: "absolute",
                width: "auto",
                maxWidth: "90vw",
                height: "auto",
                maxHeight: "90vh",
              }}
            >
              {imageRef.current && (
                <img
                  src={imageRef.current.src}
                  alt="question_image"
                  className="rounded-xl"
                />
              )}
            </div>
          </div>,
          document.body,
        )}

      <header className="mx-auto mt-16 w-3/4 border-b-[1.5px] border-white/10 border-b-white bg-black/30 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <h1 className="bg-gradient-to-r from-yellow-400 via-orange-300 to-amber-400 bg-clip-text text-2xl font-bold text-transparent">
            {name}
          </h1>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <Timer
                className={`h-5 w-5 ${alert ? "text-red-500" : "text-amber-400"}`}
              />
              <span className={`${alert ? "text-red-500" : "text-amber-400"}`}>
                {formatTime(timer)}
              </span>
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto mt-6 max-w-3xl px-4">
        <div className="h-3 w-60 overflow-hidden rounded-full bg-blue-950/50 md:w-96">
          <div
            className={`relative h-full ${styles.progressBarEffect} ${styles.shimmer}`}
            style={{ width: `${progressPercentage}%` }}
          >
            <HourglassIcon className="absolute right-0 h-3 w-[0.75rem]" />
          </div>
        </div>
        <p className="mt-2 text-center text-[1rem] text-lime-200">
          Question {currentSlide + 1} of {questions.length}
        </p>
      </div>

      <main className="mx-auto mt-8 w-[90%] px-2 md:w-3/4">
        <Swiper
          onSwiper={setSwiper}
          modules={[Navigation]}
          onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
          spaceBetween={24}
          slidesPerView={1}
          allowTouchMove={false}
          autoHeight={true}
        >
          {questions.map((question, index) => (
            <SwiperSlide key={index} className="">
              <div className="rounded-2xl border border-cyan-500/20 bg-white/10 p-4 shadow-xl backdrop-blur-md">
                <div className="flex flex-col gap-4 lg:flex-row">
                  <div className="flex flex-col justify-evenly gap-6 rounded-3xl border-[1.5px] border-amber-300 p-3 lg:w-1/2">
                    <div className="flex gap-2 -space-y-[0.5px]">
                      <span className="bg-gradient-to-tr from-amber-200 via-yellow-500 to-orange-200 bg-clip-text text-[1rem] font-bold text-transparent sm:text-lg">
                        {" "}
                        Q{index + 1 + ". "}
                      </span>
                      <p className="text-pretty text-[1rem] font-medium sm:text-lg">
                        {question.question}
                      </p>
                    </div>
                    {question.image && (
                      <Image
                        ref={imageRef}
                        width={360}
                        height={360}
                        src={question.image}
                        alt="question_image"
                        className="mx-auto w-2/3 rounded-xl border border-cyan-500/20"
                        onClick={() => setIsOpen(true)}
                        priority
                      />
                    )}

                    {question.description && question.isCode && (
                      <div className="rounded-xl border border-cyan-500/20 bg-blue-950/50 p-4 shadow-lg">
                        <h3 className="mb-2 font-semibold text-amber-300">
                          Code:
                        </h3>
                        <pre className="m-0 overflow-x-auto rounded-md bg-transparent p-0">
                          <code className="bg-transparent">
                            {question.description}
                          </code>
                        </pre>
                      </div>
                    )}

                    {question.description && !question.isCode && (
                      <div className="rounded-xl border border-cyan-500/20 bg-blue-950/50 p-4">
                        <h3 className="mb-2 text-amber-300">Description:</h3>
                        <p className="text-amber-50">{question.description}</p>
                      </div>
                    )}
                  </div>
                  <div className="mx-auto w-full flex-col items-center justify-center gap-x-6 gap-y-4 rounded-3xl border-[1.5px] border-gray-100 p-3 sm:grid sm:grid-cols-2 lg:flex lg:w-1/2">
                    {question.options.map((option, optionIndex) => (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option)}
                        className={`my-4 flex min-h-24 w-full gap-2 text-pretty rounded-xl border p-3 text-left transition-all sm:m-0 ${
                          selectedAnswers.find((a) => a.id === option.id)
                            ? "border-transparent bg-gradient-to-r from-amber-500 to-orange-400"
                            : "border-cyan-500/20 bg-green-900/40 hover:bg-emerald-900/40"
                        }`}
                      >
                        <span
                          className={`font-bold ${selectedAnswers.find((a) => a.id === option.id) ? "text-lime-300" : "text-amber-400"}`}
                        >
                          {String.fromCharCode(65 + optionIndex)}.{" "}
                        </span>
                        <span>{option.value}</span>
                      </button>
                    ))}
                  </div>
                  <div className="hidden items-center justify-center gap-2 md:flex lg:flex-col">
                    <button
                      onClick={handlePrevTrackerPage}
                      disabled={trackerPage === 0}
                      className={`rounded-full p-1 transition-all ${
                        trackerPage === 0
                          ? "cursor-not-allowed text-gray-500"
                          : "text-lime-200 hover:bg-white/10"
                      }`}
                    >
                      <ChevronLeft className="h-5 w-5 lg:rotate-90" />
                    </button>

                    <div className="flex justify-center gap-2 overflow-x-hidden rounded-3xl border-t border-cyan-500/20 bg-emerald-950/60 px-2 lg:h-[20rem] lg:flex-col">
                      {visibleQuestions.map((_, index) => {
                        const questionNumber = startIndex + index;
                        return (
                          <button
                            key={questionNumber}
                            onClick={() => swiper?.slideTo(questionNumber)}
                            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-medium transition-all ${
                              currentSlide === questionNumber
                                ? "bg-gradient-to-r from-green-800 via-emerald-700 to-lime-800"
                                : selectedAnswers.find(
                                      (a) =>
                                        a.questionId ===
                                        questions[questionNumber]?.id,
                                    )
                                  ? "bg-amber-600"
                                  : "bg-emerald-950/50"
                            }`}
                          >
                            {questionNumber + 1}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={handleNextTrackerPage}
                      disabled={trackerPage >= totalPages - 1}
                      className={`rounded-full p-1 transition-all ${
                        trackerPage >= totalPages - 1
                          ? "cursor-not-allowed text-gray-500"
                          : "text-lime-200 hover:bg-white/10"
                      }`}
                    >
                      <ChevronRight className="h-5 w-5 lg:rotate-90" />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="m-4 flex justify-between">
          <button
            onClick={handlePrevSlide}
            className={`w-26 rounded-md px-4 py-2 shadow-md transition-all md:w-32 ${styles.glassButton} ${
              currentSlide > 0
                ? "border border-amber-100 bg-transparent text-white"
                : "cursor-auto opacity-0"
            }`}
            disabled={currentSlide === 0}
          >
            Previous
          </button>

          <button
            onClick={handleNextSlide}
            className={`w-20 rounded-md px-4 py-2 shadow-md transition-all md:w-32 ${styles.glassButton} ${
              currentSlide < questions.length - 1
                ? "border border-amber-100 bg-transparent text-white"
                : "cursor-auto opacity-0"
            }`}
            disabled={currentSlide === questions.length - 1}
          >
            Next
          </button>
        </div>
        <div className="hidden w-[90%] justify-center gap-4 px-2 py-1 md:flex md:flex-col md:p-4">
          <div className="ctrl-btns flex justify-evenly gap-4">
            <button
              onClick={() => setIsReviewOpen(true)}
              className="max-w-48 flex-1 rounded-xl border-[1.25px] border-amber-200 bg-gradient-to-r from-green-700 to-lime-600/70 py-3 font-medium transition-all duration-300 ease-in-out hover:opacity-90"
            >
              Review Quiz
            </button>
            <button
              onClick={() => setIsSubmitDialogOpen(true)}
              className="max-w-48 flex-1 rounded-xl border-[1.25px] border-lime-100 bg-gradient-to-r from-yellow-400 to-orange-400 py-3 font-medium transition-all duration-300 ease-in-out hover:opacity-90"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </main>
      {/* Question Navigator */}
      <div className="absolute right-1 top-[7.25rem] z-50 block cursor-pointer md:hidden">
        {!quizTrackerVisible && <HelperTooltip />}
        <span onClick={() => setQuizTrackerVisible(!quizTrackerVisible)}>
          <Sliders
            className={`h-8 w-8 rounded-3xl border-2 border-secondary-50 p-1 text-slate-50 ${
              quizTrackerVisible ? "rotate-90" : "-rotate-90"
            }`}
          />
        </span>
      </div>
      <div
        className={`${styles.quizNav} my-6 flex h-[24%] rounded-3xl border-t border-cyan-500/20 bg-green-900/50 p-2 sm:h-[32%] md:hidden ${!quizTrackerVisible && "hidden"}`}
      >
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handlePrevTrackerPage}
            disabled={trackerPage === 0}
            className={`rounded-full p-1 transition-all ${
              trackerPage === 0
                ? "cursor-not-allowed text-gray-500"
                : "text-cyan-400 hover:bg-white/10"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex flex-col gap-2 overflow-x-hidden rounded-3xl border-t border-cyan-500/20 bg-emerald-950/60 px-2">
            {visibleQuestions.map((_, index) => {
              const questionNumber = startIndex + index;
              return (
                <button
                  key={questionNumber}
                  onClick={() => swiper?.slideTo(questionNumber)}
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-medium transition-all ${
                    currentSlide === questionNumber
                      ? "bg-gradient-to-r from-green-800 via-emerald-700 to-lime-800"
                      : selectedAnswers.find(
                            (a) =>
                              a.questionId === questions[questionNumber]?.id,
                          )
                        ? "bg-amber-600"
                        : "bg-emerald-950/50"
                  }`}
                >
                  {questionNumber + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNextTrackerPage}
            disabled={trackerPage >= totalPages - 1}
            className={`rounded-full p-1 transition-all ${
              trackerPage >= totalPages - 1
                ? "cursor-not-allowed text-gray-500"
                : "text-cyan-400 hover:bg-white/10"
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="w-full gap-4 px-2 py-1 md:flex-col md:p-4">
          <div className="ctrl-btns flex flex-col items-center justify-center gap-4 p-4">
            <button
              onClick={() => setIsReviewOpen(true)}
              className="w-full flex-1 rounded-xl border-[1.25px] border-amber-200 bg-gradient-to-r from-green-700 to-lime-600/70 py-3 font-medium transition-all hover:opacity-90"
            >
              Review Quiz
            </button>
            <button
              onClick={() => setIsSubmitDialogOpen(true)}
              className="w-full flex-1 rounded-xl border-[1.25px] border-lime-100 bg-gradient-to-r from-yellow-400 to-orange-400 py-3 font-medium transition-all hover:opacity-90"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {isReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/90 p-4 backdrop-blur-sm">
          <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-amber-500/20 bg-gradient-to-tr from-emerald-800 to-green-800">
            <div className="sticky top-0 flex items-center justify-between border-b border-amber-500/80 bg-emerald-700 bg-gradient-to-tr p-4 shadow-md backdrop-blur-md">
              <h2 className="mx-auto bg-gradient-to-r from-orange-300 via-amber-300 to-yellow-200 bg-clip-text text-2xl font-bold text-transparent">
                Review Your Answers
              </h2>
              <button
                onClick={() => setIsReviewOpen(false)}
                className="rounded-full border-2 border-amber-200/50 p-2 text-amber-300 hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-6 p-4">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-amber-500/20 bg-emerald-950/50 p-4"
                >
                  <h3 className="mb-4 font-medium text-amber-200">
                    Q{index + 1}. {question.question}
                  </h3>

                  {question.image && (
                    <Image
                      width={300}
                      height={300}
                      src={question.image}
                      alt="Question"
                      className="mx-auto mb-4 w-3/4 rounded-xl border border-amber-500/20"
                    />
                  )}

                  {question.description && question.isCode && (
                    <div className="mb-4 rounded-xl border border-amber-500/20 bg-emerald-900 p-4">
                      <h4 className="mb-2 text-amber-300">Code:</h4>
                      <pre className="overflow-x-auto text-amber-50">
                        <code>{question.description}</code>
                      </pre>
                    </div>
                  )}

                  {question.description && !question.isCode && (
                    <div className="mb-4 rounded-xl border border-amber-500/20 bg-emerald-800/90 p-4">
                      <h4 className="mb-2 text-amber-300">Description:</h4>
                      <p className="text-amber-50">{question.description}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={option.id}
                        className={`rounded-lg p-3 ${
                          selectedAnswers.find((a) => a.id === option.id)
                            ? "border-transparent bg-gradient-to-r from-amber-500 to-orange-400"
                            : "border border-amber-500/20 bg-emerald-900"
                        }`}
                      >
                        <span className="font-bold text-emerald-400">
                          {String.fromCharCode(65 + optionIndex)}.{" "}
                        </span>
                        {option.value}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!allowAnswers && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/90 p-4">
          <div className="fixed top-60 w-full max-w-md rounded-2xl border border-amber-500/20 bg-red-700/80 p-6">
            <h2 className="bg-clip-text text-center text-xl font-extrabold text-transparent text-yellow-400">
              ALERT
            </h2>
            <p className="text-amber-100">
              Its detected that you have switched windows.
            </p>
            <p className="text-amber-200">To Proceed, Contact the Organizer</p>
            <span>Flags: {flags}</span>
            <div className="mt-3 flex items-center justify-center">
              <input
                className="w-3/4 rounded-md p-2 text-black"
                type="password"
                placeholder="Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              ></input>
            </div>
            <div className="mt-4 flex justify-end gap-x-3">
              <button
                onClick={handleVerify}
                className="mr-2 rounded-xl border-[1.25px] border-amber-500 bg-red-600/75 px-4 py-2 text-white transition-colors duration-200 ease-in-out hover:opacity-80"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {isSubmitDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/90 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-amber-500/20 bg-gradient-to-b from-emerald-900 to-green-900 p-6">
            <h2 className="bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-500/90 bg-clip-text text-xl font-bold text-transparent">
              Confirm Submission
            </h2>
            <p className="text-amber-100">
              Are you sure you want to submit your answers?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsSubmitDialogOpen(false)}
                className="mr-2 rounded-xl border-2 border-amber-500 bg-red-600/75 px-4 py-2 text-white transition-colors duration-200 ease-in-out hover:opacity-80"
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                className="rounded-xl border-2 border-amber-500 bg-lime-700/70 px-4 py-2 text-white transition-colors duration-200 ease-in-out hover:bg-lime-700/50"
              >
                {submitQuizLoading ? "Submitting..." : "Submit Quiz"}
              </button>
            </div>
          </div>
        </div>
      )}
      <SuccessDialog isOpen={showSuccessDialog} />
    </div>
  );
};

export default QuizPage;

const SuccessDialog = ({ isOpen }: { isOpen: boolean }) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/80 p-4 backdrop-blur-sm">
      <div className="border-gradient-to-r w-full max-w-md rounded-2xl border-2 border-yellow-500 bg-gradient-to-bl from-amber-600/40 to-emerald-800/40 p-8 shadow-xl backdrop-blur-md">
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-400 shadow-lg">
            <Check className="h-8 w-8 text-emerald-800" />
          </div>

          <h2 className="bg-gradient-to-tr from-amber-400 via-amber-300 to-emerald-400 bg-clip-text text-2xl font-bold text-transparent">
            Quiz Submitted Successfully!
          </h2>

          <p className="text-center text-amber-100/90">
            You will be redirected to the events page in seconds...
          </p>
        </div>
      </div>
    </div>
  );
};
