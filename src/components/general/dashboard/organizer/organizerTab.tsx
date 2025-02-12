import { useQuery } from "@apollo/client";
import { Tab } from "@headlessui/react";

import Spinner from "~/components/spinner";
import { EventByOrganizerDocument } from "~/generated/generated";

import EditEventModal from "./editEventModal";
import RoundEventModal from "./roundEventModal";
import RoundsTab from "./roundsTab";
import ViewEventModal from "./viewEventModal";

function OrganizerTab({ organizerId }: { organizerId: string }) {
  const { data, loading } = useQuery(EventByOrganizerDocument, {
    variables: {
      organizerId,
    },
  });
  if (loading) {
    return <Spinner />;
  }
  if (!data || data.eventByOrganizer.length == 0) return <div>No events</div>;
  return (
    <Tab.Group
      as={"div"}
      className="mt-5 overflow-hidden border-0 border-gray-900/40 sm:rounded-xl"
    >
      <Tab.List className="flex w-full overflow-x-auto bg-black bg-opacity-10 backdrop-blur-md">
        {data.eventByOrganizer.map((event) => (
          <Tab className="focus:outline-none" key={event.id}>
            {({ selected }) => (
              <button
                className={`whitespace-nowrap p-3 text-base font-semibold transition-colors sm:px-5 sm:py-4 sm:text-lg ${
                  selected
                    ? "bg-black bg-opacity-10 backdrop-blur-md-900 text-[#D79128] shadow-lg shadow-black"
                    : "bg-transparent text-white hover:bg-[#054432]/60"
                }`}
              >
                {event.name}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        <div className="bg-black bg-opacity-20 backdrop-blur-md p-0 pt-3 sm:p-5">
          {data.eventByOrganizer.map((event) => (
            <Tab.Panel className="space-y-3" key={event.id}>
              <div className="flex flex-wrap items-center justify-between gap-5 rounded-lg border-gray-600 bg-[#054432]/30 px-3 py-3 backdrop-blur-md">
                <div className="flex gap-3 px-5 sm:px-0">
                  <h2 className="text-2xl font-bold text-[#D79128]">
                    {event.name}
                  </h2>
                  <p className="flex h-fit items-center justify-center rounded-md border border-white px-2 leading-8 text-white">
                    {event.branch.name}
                  </p>
                </div>
                <div className="flex space-x-2 overflow-x-auto px-5 md:overflow-hidden md:p-0">
                  <ViewEventModal event={event} />
                  <EditEventModal event={event} />
                  <RoundEventModal event={event} />
                </div>
              </div>
              <RoundsTab
                eventType={event.eventType}
                rounds={event.rounds}
                eventId={event.id}
              />
            </Tab.Panel>
          ))}
        </div>
      </Tab.Panels>
    </Tab.Group>
  );
}
export default OrganizerTab;
