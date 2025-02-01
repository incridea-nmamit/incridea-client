import { Menu, Transition } from "@headlessui/react";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { type GetStaticProps } from "next";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { CiWarning } from "react-icons/ci";
import { IoTodayOutline } from "react-icons/io5";

import Event from "~/components/event";
import {
  EventCategory,
  PublishedEventsDocument,
  type PublishedEventsQuery,
} from "~/generated/generated";
import { client } from "~/lib/apollo";

enum AllCategory {
  ALL = "ALL",
}

type Props = { data: PublishedEventsQuery["publishedEvents"] };

const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const { data: events } = await client.query({
      query: PublishedEventsDocument,
      fetchPolicy: "no-cache",
    });
    return {
      props: {
        data: events.publishedEvents,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: [],
      },
      revalidate: 60,
    };
  }
};

const Page = ({ data }: Props) => {
  const containerRef = useRef(null);

  const dayFilters = ["All", "DAY 1", "DAY 2", "DAY 3"];

  const [currentDayFilter, setCurrentDayFilter] =
    useState<(typeof dayFilters)[number]>("All");
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState<
    EventCategory | AllCategory
  >(AllCategory.ALL);
  const [query, setQuery] = useState("");

  const [filteredEvents, setFilteredEvents] = useState(data || []);

  useEffect(() => {
    let tempFilteredEvents = data;
    if (currentDayFilter !== "All") {
      const filteredDay = new Date(
        currentDayFilter === "DAY 1"
          ? "2024-02-22"
          : currentDayFilter === "DAY 2"
            ? "2024-02-23"
            : "2024-02-24",
      ).getDate();
      tempFilteredEvents = tempFilteredEvents.filter((event) =>
        event.rounds.some((round) => round.date?.getDate() === filteredDay),
      );
    }
    if (currentCategoryFilter !== AllCategory.ALL)
      tempFilteredEvents = tempFilteredEvents.filter(
        (event) => event.category === currentCategoryFilter,
      );

    setFilteredEvents(tempFilteredEvents);
  }, [currentDayFilter, currentCategoryFilter, data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentDayFilter("All");
    setCurrentCategoryFilter(AllCategory.ALL);
    if (e.target.value === "") {
      setFilteredEvents(data || []);
    } else {
      setFilteredEvents(
        data.filter((event) =>
          event.name.toLowerCase().includes(e.target.value.toLowerCase()),
        ),
      );
    }
  };

  return (
    <div
      style={{ willChange: "transform" }}
      className="relative flex min-h-screen shadow-2xl justify-center overflow-hidden bg-gradient-to-b from-green-400 to-green-500"
    >
      <div className="mx-auto flex flex-col items-center justify-center px-5 sm:px-7 lg:px-10">
        <div className="no-scrollbar overflow-y-auto">
          <div
            data-scroll-container
            ref={containerRef}
            className={`relative px-2 md:px-10 ${
              filteredEvents.length > 0 ? "pt-28" : "pt-10 md:pt-20"
            } flex flex-col items-center justify-center`}
          >
            <div
              data-scroll-section
              className="mb-2 flex flex-col justify-center"
            >
              <h1
                data-scroll
                className={`text-center font-VikingHell text-7xl tracking-wide text-white md:text-8xl`}
              >
                Events
              </h1>

              <h2
                data-scroll
                className={`text-md mx-2 mb-6 mt-2 text-center tracking-wide text-white md:mt-4 md:text-xl`}
              >
                Navigate Your Digital Playground with Our Ultimate Event
                Collection!
              </h2>

              <div className="relative w-full basis-full lg:w-auto lg:basis-[75%]">
                <input
                  value={query}
                  onChange={handleSearch}
                  className="w-full rounded-full border border-primary-200/80 bg-black/30 p-3 pl-6 pr-14 text-white placeholder:text-gray-200 focus:outline-none"
                  placeholder="Search epic quests here..."
                  type="text"
                />
                <AiOutlineSearch
                  size={"1.4rem"}
                  className="absolute right-6 top-3 text-gray-200"
                />
              </div>

              <div
                data-scroll
                className="flex w-full flex-row items-center justify-between py-4 text-lg md:justify-evenly md:text-xl"
              >
                <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                  <Menu
                    as={"div"}
                    className={"relative flex w-full justify-start"}
                  >
                    <Menu.Button
                      className={
                        "inline-flex h-[40px] w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-primary-200/80 bg-black/30 px-4 py-2 text-sm text-white md:text-lg"
                      }
                    >
                      <IoTodayOutline size="16" />
                      {currentDayFilter !== "All"
                        ? currentDayFilter
                            .toLowerCase()
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (char) => char.toUpperCase())
                        : "Day"}
                    </Menu.Button>
                    <Transition
                      enter="transition duration-300 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-300 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Menu.Items className="absolute top-11 z-[100] mt-1 flex flex-col gap-2 overflow-hidden rounded-3xl border border-primary-200/80 bg-primary-300 p-2 text-center shadow-2xl shadow-black/80">
                        {dayFilters.map((filter) => (
                          <Menu.Item key={filter}>
                            {() => (
                              <button
                                className={`${
                                  currentDayFilter === filter
                                    ? "bg-white/20"
                                    : "bg-black/10"
                                } w-36 rounded-full border border-primary-200/80 px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-white/10`}
                                onClick={() => setCurrentDayFilter(filter)}
                              >
                                {
                                  filter
                                    .toLowerCase()
                                    .replace(/\b\w/g, (char) =>
                                      char.toUpperCase(),
                                    )
                                    .split(" ")[0]
                                }{" "}
                                {filter.split(" ")[1]}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>

                <div>
                  <a
                    href="https://drive.google.com/file/d/1H43LJXI4E-HELku71b9NLOBRoDpmxuHk/view?usp=drive_link"
                    download
                  >
                    <button className="inline-flex h-[40px] w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-primary-200/80 bg-black/30 px-4 py-2 text-sm text-white md:text-lg">
                      Rule Book
                    </button>
                  </a>
                </div>
                <div>
                  <a
                    href="https://drive.google.com/file/d/1oqBkgCtTzA3asYb1UUKmUE092fRiobJG/view?usp=sharing"
                    download
                  >
                    <button className="inline-flex h-[40px] w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-primary-200/80 bg-black/30 px-4 py-2 text-sm text-white md:text-lg">
                      Schedule
                    </button>
                  </a>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                  <Menu
                    as={"div"}
                    className={"relative flex w-full justify-end"}
                  >
                    <Menu.Button
                      className={
                        "inline-flex h-[40px] w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-primary-200/80 bg-black/30 px-4 py-2 text-sm text-white md:text-lg"
                      }
                    >
                      <BiCategory size="16" />
                      {currentCategoryFilter !== AllCategory.ALL
                        ? currentCategoryFilter
                            .toLowerCase()
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (char) => char.toUpperCase())
                        : "Category"}
                    </Menu.Button>
                    <Transition
                      enter="transition duration-300 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-300 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Menu.Items className="absolute top-11 z-[100] mt-1 flex flex-col gap-2 overflow-hidden rounded-3xl border border-primary-200/80 bg-primary-300 p-2 text-center shadow-2xl shadow-black/80">
                        {[
                          Object.keys(EventCategory),
                          Object.keys(AllCategory),
                        ].map((e, idx) => {
                          return e.map((filter) => {
                            return (
                              <Menu.Item key={idx}>
                                <button
                                  className={`${
                                    currentCategoryFilter === filter
                                      ? "bg-white/20"
                                      : "bg-black/10"
                                  } w-36 rounded-full border border-primary-200/80 px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-white/10`}
                                  onClick={() =>
                                    setCurrentCategoryFilter(
                                      filter as EventCategory | AllCategory,
                                    )
                                  }
                                >
                                  {filter
                                    .replace("_", " ")
                                    .toLowerCase()
                                    .replace(/\b\w/g, (char) =>
                                      char.toUpperCase(),
                                    )}
                                </button>
                              </Menu.Item>
                            );
                          });
                        })}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
            <div
              data-scroll-section
              data-scroll-speed="0.7"
              className={
                filteredEvents.length > 0
                  ? `mx-auto mb-44 grid h-full w-full max-w-7xl grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 place-items-center`
                  : "flex h-full w-full items-center justify-center"
              }
            >
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <Event key={event.id} data={event} />
                ))
              ) : (
                <div
                  data-scroll
                  className="flex w-full flex-col items-center justify-center gap-5 rounded-xl border border-primary-200/80 bg-black/30 p-10 text-center text-xl text-white"
                >
                  <CiWarning size={50} />
                  No events found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { getStaticProps };
export default Page;
