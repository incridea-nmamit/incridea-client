"use client";

//need to add quiz has ended pop up and a timer
import { useQuery } from "@apollo/client";
// import Prism from "prismjs";
// import "prismjs/themes/prism-okaidia.css";
// import "prismjs/components/prism-python";
// import "prismjs/components/prism-java";
// import "prismjs/components/prism-javascript";
// import "prismjs/components/prism-c";
// import "prismjs/components/prism-cpp";
// import "prismjs/components/prism-markup";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  HourglassIcon,
  Maximize2,
  Sliders,
  Timer,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
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
import styles from "~/components/general/dashboard/organizer/quiz/quiz.module.css";
import { GetQuizByIdDocument } from "~/generated/generated";
import { EventByOrganizerDocument } from "~/generated/generated";
import { useAuth } from "~/hooks/useAuth";

const QuizPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { slug } = router.query;

  const [eventId, roundId] = slug?.toString().split("-") ?? [];
  const roundInt = parseInt(roundId ?? "0");
  const [processedQuizScores, setProcessedQuizScores] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [quizName, setQuizName] = useState("");

  const { data } = useQuery(EventByOrganizerDocument);

  const event =
    data?.eventByOrganizer.__typename === "QueryEventByOrganizerSuccess"
      ? data.eventByOrganizer.data.find((event) => event.id === eventId)
      : undefined;
  const round = event?.rounds.find((round) => round.roundNo === roundInt);
  const quizId = round?.quiz?.id;

  const { data: quizScores } = useQuery(GetQuizByIdDocument, {
    variables: { id: quizId ?? "" },
    skip: !quizId,
  });

  useEffect(() => {
    if (
      quizScores?.getQuizById.__typename === "QueryGetQuizByIdSuccess" &&
      !processedQuizScores
    ) {
      const qs = quizScores.getQuizById.data;
      const mappedqs = qs.questions.map((question) => ({
        id: question.id,
        question: question.question,
        image: question.image,
        options: question.options,
        isCode: question.isCode,
        description: question.description,
      }));

      setQuizName(qs.name);

      const sortedQuestions = mappedqs.sort(() => Math.random() - 0.5);

      setQuestions(sortedQuestions);
      setProcessedQuizScores(true);
    }
  }, [quizScores, processedQuizScores]);

  const [selectedAnswers, setSelectedAnswers] = useState<Options[]>([]);
  // const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
  //   null
  // );

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  // const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  useEffect(() => {
    const savedData = sessionStorage.getItem(
      `selectionOptions-${user?.id}-${quizId}`,
    );
    if (savedData) {
      const savedAnswers: Options[] = JSON.parse(savedData) as Options[];
      setSelectedAnswers(savedAnswers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    hljs.highlightAll();
  }, [isReviewOpen]);

  useEffect(() => {
    hljs.highlightAll();
  }, [questions]);

  const [quizTrackerVisible, setQuizTrackerVisible] = useState(true);
  const [trackerPage, setTrackerPage] = useState(0);

  const questionsPerPage = 6;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const startIndex = trackerPage * questionsPerPage;
  const endIndex = Math.min(startIndex + questionsPerPage, questions.length);
  const visibleQuestions = questions.slice(startIndex, endIndex);

  useEffect(() => {
    const newPage = Math.floor(currentSlide / questionsPerPage);
    if (newPage !== trackerPage) {
      setTrackerPage(newPage);
    }
  }, [currentSlide]);

  const handleNextTrackerPage = () => {
    if (trackerPage < totalPages - 1) {
      setIsOpen(false);
      setTrackerPage((prev) => prev + 1);
    }
  };

  const handlePrevTrackerPage = () => {
    if (trackerPage > 0) {
      setIsOpen(false);
      setTrackerPage((prev) => prev - 1);
    }
  };
  // const handleFinalSubmit = useCallback(() => {
  //   console.log(selectedAnswers);
  //   sessionStorage.removeItem("savedQuizData");
  //   onComplete();
  // }, [onComplete]);

  // useEffect(() => {
  //   if (quizFetchData?.getQuizById.__typename === "QueryGetQuizByIdSuccess") {
  //     const quizData = quizFetchData.getQuizById.data;
  //     if (quizData) {
  //       console.log(quizData);
  //       setQuizData(quizData);
  //       if (quizData.startTime && quizData.endTime) {
  //         setTimer((new Date(quizData.endTime).getTime() - Date.now()) / 1000);
  //       }
  //     }
  //   }
  // }, [quizFetchData]);
  // const handleSlideChange = (swiper: SwiperClass) => {
  //   setCurrentSlide(swiper.activeIndex);
  // };
  const handleOptionSelect = (option: Options) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = prev.filter(
        (answer) => answer.questionId !== option.questionId,
      );
      updatedAnswers.push(option);
      sessionStorage.setItem(
        `selectionOptions-${user?.id}-${quizId}`,
        JSON.stringify(updatedAnswers),
      );
      // console.log(updatedAnswers);
      return updatedAnswers;
    });
  };

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

  const [isOpen, setIsOpen] = useState(false);

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

      <header className="mx-auto mt-16 w-3/4 border-b-[1.5px] border-amber-200 border-white/10 bg-black/30 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <h1 className="bg-gradient-to-r from-yellow-400 via-orange-300 to-amber-400 bg-clip-text text-xl font-bold text-transparent md:text-2xl lg:text-3xl">
            {quizName}
          </h1>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-amber-400" />
              <span className="text-yellow-100">00:00</span>
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

      {/* Main Content with Swiper */}
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
            <SwiperSlide key={index}>
              <div className="rounded-2xl border border-cyan-500/20 bg-white/10 p-4 shadow-xl backdrop-blur-md">
                <div className="flex flex-col gap-4 lg:flex-row">
                  <div className="flex flex-col justify-evenly gap-6 rounded-3xl border-[1.5px] border-amber-200 p-3 lg:w-1/2">
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
                      <>
                        <Image
                          ref={imageRef}
                          width={300}
                          height={300}
                          src={question.image}
                          alt="question_image"
                          className="mx-auto w-2/3 rounded-xl border border-cyan-500/20"
                          onClick={() => setIsOpen(true)}
                          priority
                        />
                      </>
                    )}
                    {question.description && question.isCode && (
                      <div className="rounded-xl border border-cyan-500/20 bg-teal-950/50 p-4 shadow-lg">
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
                  <div className="mx-auto w-full flex-col items-center justify-center gap-x-6 gap-y-4 rounded-3xl border-[1.5px] border-amber-200 p-3 sm:grid sm:grid-cols-2 lg:flex lg:w-1/2">
                    {question.options.map((option, optionIndex) => (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option)}
                        className={`my-4 flex min-h-24 w-full gap-2 text-pretty rounded-xl border p-3 text-left transition-all sm:m-0 ${
                          selectedAnswers.find((a) => a.id === option.id)
                            ? "border-transparent bg-gradient-to-r from-amber-300 to-yellow-400"
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
              className="max-w-48 flex-1 rounded-xl border-[1.25px] border-amber-200 bg-gradient-to-r from-yellow-400 to-orange-400 py-3 font-medium transition-all duration-300 ease-in-out hover:opacity-90"
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
        className={`${styles.quizNav} my-6 flex h-[24%] rounded-3xl border-t border-cyan-500/20 bg-green-900 p-2 sm:h-[32%] md:hidden ${!quizTrackerVisible && "hidden"}`}
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

      {isSubmitDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/90 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-amber-500/20 bg-gradient-to-b from-emerald-900 to-green-900 p-6">
            <h2 className="bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-500/90 bg-clip-text text-xl font-bold text-transparent">
              Confirm Submission
            </h2>
            <p className="text-amber-100">
              Are you sure you want to submit your answers?
            </p>
            <div className="mt-4 flex justify-end gap-x-3">
              <button
                onClick={() => setIsSubmitDialogOpen(false)}
                className="mr-2 rounded-xl border-[1.25px] border-amber-500 bg-red-600/75 px-4 py-2 text-white transition-colors duration-200 ease-in-out hover:opacity-80"
              >
                Cancel
              </button>
              <button className="rounded-xl border-[1.25px] border-amber-500 bg-lime-700/70 px-4 py-2 text-white transition-colors duration-200 ease-in-out hover:bg-lime-700/50">
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
