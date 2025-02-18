"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperClass } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SubmitQuizAnswerDocument } from "~/generated/generated";
import { useMutation } from "@apollo/client";
import { Navigation } from "swiper/modules";
import {
  type Question,
  type Options,
} from "~/pages/event/[slug]/quiz/[quizId]";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import styles from "./quiz.module.css";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  HourglassIcon,
  Sliders,
  X,
  Timer 
} from "lucide-react";
import { useRouter } from "next/router";
import createToast from "~/components/toast";
import { HelperTooltip } from "~/components/general/dashboard/organizer/quiz/HelperToolTip";
import Image from "next/image";
import { createPortal } from "react-dom";

const QuizPage = ({
  questions,
  name,
  description,
  startTime,
  endTime,
  quizId,
  teamId,
}: {
  questions: Question[];
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  quizId: string;
  teamId: number;
}) => {
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

  const router = useRouter();

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
    console.log("Selected Answers", selectedAnswers);
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
    console.log("Time: ", new Date(endTime).getTime() - Date.now());
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
      console.log(updatedAnswers);
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
    <div className="relative flex flex-col justify-between items-center text-white select-none">
      {isOpen &&
        imageRef.current &&
        createPortal(
          <div
            className="fixed h-full w-full inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50" // Zoom effect
          >
            <div
              className="fixed inset-0"
              onClick={() => setIsOpen(false)}
            ></div>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 bg-black/60 p-2 rounded-full hover:bg-black/80 transition"
            >
              <X className="w-5 h-5 text-white" />
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

      <header className="w-3/4 mx-auto mt-16 backdrop-blur-lg bg-black/30 border-b-[1.5px] border-b-white border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-300 to-amber-400 bg-clip-text text-transparent">
            {name}
          </h1>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <Timer 
                className={`w-5 h-5 ${alert ? "text-red-500" : "text-amber-400"}`}
              />
              <span className={`${alert ? "text-red-500" : "text-amber-400"}`}>
                {formatTime(timer)}
              </span>
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="w-60 md:w-96 h-3 bg-blue-950/50 rounded-full overflow-hidden">
          <div
            className={`relative h-full ${styles.progressBarEffect} ${styles.shimmer}`}
            style={{ width: `${progressPercentage}%` }}
          >
            <HourglassIcon className="absolute right-0 w-[0.75rem] h-3" />
          </div>
        </div>
        <p className=" text-center text-[1rem] text-lime-200 mt-2">
          Question {currentSlide + 1} of {questions.length}
        </p>
      </div>

      <main className="w-[90%] md:w-3/4 mx-auto mt-8 px-2">
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
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-cyan-500/20">
                <div className=" flex flex-col gap-4 lg:flex-row">
                  <div className="lg:w-1/2 flex flex-col justify-evenly gap-6 border-[1.5px] border-amber-300 p-3 rounded-3xl">
                    <div className="flex gap-2 -space-y-[0.5px]">
                      <span className="font-bold text-[1rem] sm:text-lg bg-gradient-to-tr from-amber-200 via-yellow-500 to-orange-200 text-transparent bg-clip-text">
                        {" "}
                        Q{index + 1 + ". "}
                      </span>
                      <p className="text-pretty text-[1rem] sm:text-lg font-medium">
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
                      <div className="bg-blue-950/50 rounded-xl p-4 border border-cyan-500/20 shadow-lg">
                        <h3 className="text-amber-300 mb-2 font-semibold">
                          Code:
                        </h3>
                        <pre className="p-0 m-0 bg-transparent overflow-x-auto rounded-md">
                          <code className="bg-transparent">
                            {question.description}
                          </code>
                        </pre>
                      </div>
                    )}

                    {question.description && !question.isCode && (
                      <div className="bg-blue-950/50 rounded-xl p-4 border border-cyan-500/20">
                        <h3 className="text-amber-300 mb-2">Description:</h3>
                        <p className="text-amber-50">{question.description}</p>
                      </div>
                    )}
                  </div>
                  <div className="w-full sm:grid sm:grid-cols-2 lg:flex flex-col mx-auto lg:w-1/2 items-center justify-center gap-y-4 gap-x-6 border-[1.5px] border-gray-100 p-3 rounded-3xl">
                    {question.options.map((option, optionIndex) => (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option)}
                        className={`my-4 sm:m-0 flex gap-2 w-full min-h-24 p-3 text-pretty rounded-xl text-left transition-all border ${
                          selectedAnswers.find((a) => a.id === option.id)
                            ? "bg-gradient-to-r from-amber-500 to-orange-400 border-transparent"
                            : "bg-green-900/40 border-cyan-500/20 hover:bg-emerald-900/40"
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
                  <div className="hidden md:flex lg:flex-col items-center gap-2 justify-center">
                    <button
                      onClick={handlePrevTrackerPage}
                      disabled={trackerPage === 0}
                      className={`p-1 rounded-full transition-all ${
                        trackerPage === 0
                          ? "text-gray-500 cursor-not-allowed"
                          : "text-lime-200 hover:bg-white/10"
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5 lg:rotate-90" />
                    </button>

                    <div className="bg-emerald-950/60 rounded-3xl border-t border-cyan-500/20 px-2 flex lg:flex-col lg:h-[20rem] justify-center gap-2 overflow-x-hidden">
                      {visibleQuestions.map((_, index) => {
                        const questionNumber = startIndex + index;
                        return (
                          <button
                            key={questionNumber}
                            onClick={() => swiper?.slideTo(questionNumber)}
                            className={`w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-full font-medium transition-all ${
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
                      className={`p-1 rounded-full transition-all ${
                        trackerPage >= totalPages - 1
                          ? "text-gray-500 cursor-not-allowed"
                          : "text-lime-200 hover:bg-white/10"
                      }`}
                    >
                      <ChevronRight className="w-5 h-5 lg:rotate-90" />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="flex justify-between m-4">
          <button
            onClick={handlePrevSlide}
            className={`w-26 md:w-32 px-4 py-2 rounded-md shadow-md transition-all ${styles.glassButton} ${
              currentSlide > 0
                ? "bg-transparent border border-amber-100 text-white"
                : "opacity-0 cursor-auto"
            }`}
            disabled={currentSlide === 0}
          >
            Previous
          </button>

          <button
            onClick={handleNextSlide}
            className={`w-20 md:w-32 px-4 py-2 rounded-md shadow-md transition-all ${styles.glassButton} ${
              currentSlide < questions.length - 1
                ? "bg-transparent border border-amber-100 text-white"
                : "opacity-0 cursor-auto"
            }`}
            disabled={currentSlide === questions.length - 1}
          >
            Next
          </button>
        </div>
        <div className="hidden md:flex w-[90%] px-2 py-1 md:p-4 justify-center gap-4 md:flex-col">
          <div className="ctrl-btns flex justify-evenly gap-4">
            <button
              onClick={() => setIsReviewOpen(true)}
              className="max-w-48 flex-1 py-3 rounded-xl bg-gradient-to-r from-green-700 to-lime-600/70 border-[1.25px] border-amber-200 font-medium hover:opacity-90 transition-all duration-300 ease-in-out"
            >
              Review Quiz
            </button>
            <button
              onClick={() => setIsSubmitDialogOpen(true)}
              className="max-w-48 flex-1 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 border-[1.25px] border-lime-100 font-medium hover:opacity-90 transition-all duration-300 ease-in-out"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </main>
      {/* Question Navigator */}
      <div className="block md:hidden absolute top-[7.25rem] right-1 z-50 cursor-pointer">
        {!quizTrackerVisible && <HelperTooltip />}
        <span onClick={() => setQuizTrackerVisible(!quizTrackerVisible)}>
          <Sliders
            className={`w-8 h-8 p-1 border-secondary-50 border-2 text-slate-50 rounded-3xl ${
              quizTrackerVisible ? "rotate-90" : "-rotate-90"
            }`}
          />
        </span>
      </div>
      <div
        className={`${styles.quizNav} flex md:hidden h-[24%] sm:h-[32%] p-2 bg-green-900/50 rounded-3xl border-t border-cyan-500/20 my-6 ${!quizTrackerVisible && "hidden"}`}
      >
        <div className="flex items-center gap-2 justify-center">
          <button
            onClick={handlePrevTrackerPage}
            disabled={trackerPage === 0}
            className={`p-1 rounded-full transition-all ${
              trackerPage === 0
                ? "text-gray-500 cursor-not-allowed"
                : "text-cyan-400 hover:bg-white/10"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="bg-emerald-950/60 rounded-3xl border-t border-cyan-500/20 px-2 flex flex-col gap-2 overflow-x-hidden">
            {visibleQuestions.map((_, index) => {
              const questionNumber = startIndex + index;
              return (
                <button
                  key={questionNumber}
                  onClick={() => swiper?.slideTo(questionNumber)}
                  className={`w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-full font-medium transition-all ${
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
            className={`p-1 rounded-full transition-all ${
              trackerPage >= totalPages - 1
                ? "text-gray-500 cursor-not-allowed"
                : "text-cyan-400 hover:bg-white/10"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="w-full px-2 py-1 md:p-4 gap-4 md:flex-col">
          <div className="flex flex-col ctrl-btns items-center justify-center gap-4 p-4">
            <button
              onClick={() => setIsReviewOpen(true)}
              className="w-full flex-1 py-3 rounded-xl bg-gradient-to-r from-green-700 to-lime-600/70 border-[1.25px] border-amber-200 font-medium hover:opacity-90 transition-all"
            >
              Review Quiz
            </button>
            <button
              onClick={() => setIsSubmitDialogOpen(true)}
              className="w-full flex-1 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 border-[1.25px] border-lime-100 font-medium hover:opacity-90 transition-all"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {isReviewOpen && (
        <div className="fixed inset-0 bg-emerald-950/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-tr from-emerald-800 to-green-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-amber-500/20">
            <div className="sticky top-0 backdrop-blur-md bg-gradient-to-tr bg-emerald-700 p-4 border-b border-amber-500/80 flex justify-between items-center shadow-md">
              <h2 className="text-2xl mx-auto font-bold bg-gradient-to-r from-orange-300 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                Review Your Answers
              </h2>
              <button
                onClick={() => setIsReviewOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full border-2 border-amber-200/50 text-amber-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-6">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="bg-emerald-950/50 rounded-xl p-4 border border-amber-500/20"
                >
                  <h3 className="font-medium mb-4 text-amber-200">
                    Q{index + 1}. {question.question}
                  </h3>

                  {question.image && (
                    <Image
                      width={300}
                      height={300}
                      src={question.image}
                      alt="Question"
                      className="mx-auto w-3/4 rounded-xl mb-4 border border-amber-500/20"
                    />
                  )}

                  {question.description && question.isCode && (
                    <div className="bg-emerald-900 rounded-xl p-4 mb-4 border border-amber-500/20">
                      <h4 className="text-amber-300 mb-2">Code:</h4>
                      <pre className="text-amber-50 overflow-x-auto">
                        <code>{question.description}</code>
                      </pre>
                    </div>
                  )}

                  {question.description && !question.isCode && (
                    <div className="bg-emerald-800/90 rounded-xl p-4 mb-4 border border-amber-500/20">
                      <h4 className="text-amber-300 mb-2">Description:</h4>
                      <p className="text-amber-50">{question.description}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={option.id}
                        className={`p-3 rounded-lg ${
                          selectedAnswers.find((a) => a.id === option.id)
                            ? "bg-gradient-to-r from-amber-500 to-orange-400 border-transparent"
                            : "bg-emerald-900 border border-amber-500/20"
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

      {isSubmitDialogOpen && (
        <div className="fixed inset-0 bg-emerald-950/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className=" bg-gradient-to-b from-emerald-900 to-green-900 rounded-2xl p-6 max-w-md w-full border border-amber-500/20">
            <h2 className=" text-xl font-bold bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-500/90 bg-clip-text text-transparent">
              Confirm Submission
            </h2>
            <p className="text-amber-100">
              Are you sure you want to submit your answers?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsSubmitDialogOpen(false)}
                className="mr-2 py-2 px-4 rounded-xl bg-red-600/75 border-2 border-amber-500 hover:opacity-80 text-white transition-colors duration-200 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                className="py-2 px-4 rounded-xl bg-lime-700/70 hover:bg-lime-700/50 border-2 border-amber-500 text-white transition-colors  duration-200 ease-in-out"
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
    <div className="fixed inset-0 bg-emerald-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-bl backdrop-blur-md border-2 border-gradient-to-r from-amber-600/40 to-emerald-800/40 border-yellow-500 rounded-2xl p-8 max-w-md w-full shadow-xl">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-400 rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-8 h-8 text-emerald-800" />
          </div>

          <h2 className="text-2xl font-bold bg-gradient-to-tr from-amber-400 via-amber-300 to-emerald-400 text-transparent bg-clip-text">
            Quiz Submitted Successfully!
          </h2>

          <p className="text-amber-100/90 text-center">
            You will be redirected to the events page in seconds...
          </p>
        </div>
      </div>
    </div>
  );
};
