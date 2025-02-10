import { useQuery } from "@apollo/client";
import { useEffect, useState, type FC } from "react";
import EventCard from "./Event";

import { RegisterdEventsDocument } from "~/generated/generated";
import { Button } from "../button/button";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/router";

const UserEvents: FC<{
  userId: string;
}> = ({ userId }) => {
  const { data: events } = useQuery(RegisterdEventsDocument);

  const [completed, setCompleted] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (
      events?.registeredEvents.__typename === "QueryRegisteredEventsSuccess"
    ) {
      const completedQuests = events.registeredEvents.data.filter((event) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (event.winner && event.winner.length > 0) {
          return event;
        }
      });
      setCompleted(completedQuests.length);
    }
  }, [events]);

  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-col flex-nowrap border-2 rounded-lg bg-gradient-to-br  from-primary-900/80 via-primary-700/80 to-primary-900/80 backdrop-blur-sm border-secondary-500/50">
        <div className="text-white">
          <h1 className="text-center font-life-craft md:text-6xl text-4xl mt-6 tracking-wider">
            MY VOYAGES
          </h1>
          <div className="mx-auto border-2 border-secondary-400/80 w-fit rounded-full p-1 px-2 mt-4">
            <span className="text-lg font-semibold text-secondary-500">
              {events?.registeredEvents.__typename ===
              "QueryRegisteredEventsSuccess"
                ? events.registeredEvents.data.length - completed
                : 0}
            </span>{" "}
            <span className="opacity-80">Voyage(s) left of</span>{" "}
            <span className="text-lg font-semibold text-secondary-500">
              {events?.registeredEvents.__typename ===
              "QueryRegisteredEventsSuccess"
                ? events.registeredEvents.data.length
                : 0}
            </span>
          </div>
        </div>
        {events?.registeredEvents.__typename ===
          "QueryRegisteredEventsSuccess" &&
        events.registeredEvents.data.length === 0 ? (
          <div className="w-full h-full text-3xl text-white justify-center flex flex-col gap-6 items-center px-8">
            <p className="text-center">
              Register yourself in events to see your Quests
            </p>
            <Button
              onClick={async () => await router.push("/events")}
              className="text-xl pr-4"
            >
              Events <MoveRight />
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-6xl mx-auto mt-8 h-full overflow-auto grid 2xl:grid-cols-3 lg:grid-cols-2 px-2 gap-y-6 pb-6 gap-x-2">
            {events?.registeredEvents.__typename ===
              "QueryRegisteredEventsSuccess" &&
              events.registeredEvents.data.map((event, idx) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                const isCompleted: boolean =
                  (event.winner && event.winner.length > 0) ?? false;
                return (
                  <>
                    <EventCard
                      isCompleted={isCompleted}
                      teams={event.teams}
                      event={event}
                      userId={userId}
                    />
                  </>
                );
              })}
          </div>
        )}
      </div>
    </section>
  );
};

export default UserEvents;
