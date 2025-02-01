import { Calendar, MapPin, Users } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

import { env } from "~/env";
import { type PublishedEventsQuery } from "~/generated/generated";
import { generateEventUrl } from "~/utils/url";
import Image from "next/image";

const Event = ({
  data,
}: {
  data: PublishedEventsQuery["publishedEvents"][0];
}) => {
  const router = useRouter();
  const getEventAttributes = () => {
    let teamSizeText = "",
      eventTypeText = "";

    // Team Size Formatting
    if (data.minTeamSize === data.maxTeamSize) {
      if (data.minTeamSize === 1) teamSizeText = "Solo";
      else teamSizeText = `${data.minTeamSize} per Team`;
      if (data.minTeamSize === 0) teamSizeText = "";
    } else {
      teamSizeText = `${data.minTeamSize}-${data.maxTeamSize} per Team`;
    }

    // Event Type Formatting
    if (data.eventType.includes("MULTIPLE")) {
      eventTypeText = "Multiple";
    } else {
      eventTypeText =
        data.eventType.split("_")[0]![0] +
        data.eventType.split("_")[0]!.slice(1).toLowerCase();
    }

    // Replace Team/Individual with correct terms
    eventTypeText = eventTypeText.replaceAll("Individual", "Solo");
    eventTypeText = eventTypeText.replaceAll("Team", "Multiplayer");

    // Correctly format multiple entry
    const eventTypeWithTeamSize = `${eventTypeText} / ${teamSizeText}`;

    return [
      {
        name: "Date",
        text: data.rounds[0]?.date
          ? new Date(data.rounds[0]?.date).toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
          : "TBD",
        Icon: Calendar,
      },
      {
        name: "Type & Team Size",
        text: eventTypeWithTeamSize,
        Icon: Users,
      },
      {
        name: "Venue",
        text: data.venue,
        Icon: MapPin,
      },
    ];
  };

  return (
    <div
      data-scroll
      onClick={() => router.push(generateEventUrl(data.name, data.id))}
      className={`relative flex w-full mt-20 cursor-pointer flex-col mb-28  rounded-2xl   transition-transform duration-300 hover:scale-[1.02]`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 259.2 278.88"
        className="w-full h-full object-cover rounded-2xl"
        style={{ transform: "scale(1.8)" }}
      >
        <defs>
          <style>{`
                .c {
                  fill: url(#gradient1);
                }
                .e {
                  fill:url(#gradient2);
                }
              `}</style>
        </defs>
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="50%" style={{ stopColor: "rgba(0, 126, 63, 1)" }} />
          </linearGradient>

          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "rgba(0, 50, 45, 0.8)" }} />
            <stop offset="100%" style={{ stopColor: "rgba(0, 30, 25, 1)" }} />
          </linearGradient>
        </defs>

        <path
          className="c"
          d="M186.17,34.6h6.8v14.61c0,3.75-3.05,6.8-6.8,6.8h0v-21.41h0Z"
          transform="translate(23.48 147.32) rotate(-45)"
        />
        <foreignObject x="50" y="110" width="17" height="60">
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-white italic font-semibold text-[8px] uppercase transform origin-center -rotate-90 whitespace-nowrap  px-2 shadow-2xl rounded-xl">
              {data.category?.toLowerCase() === "non_technical"
                ? "Non Tech"
                : data.category?.toLocaleLowerCase()}
            </span>
          </div>
        </foreignObject>

        <polygon
          className="c z-10"
          points="117.98 35.32 102.62 25.36 68.83 25.36 59.14 35.32 117.98 35.32"
        />
        <polyline
          className="c"
          points="94.87 25.36 107.97 25.36 117.98 35.32 96.12 35.37 96.12 35.37"
        />
        <image
          href={`${env.NEXT_PUBLIC_BASE_IMAGE_URL}/assets/png/logo.png`}
          x="72"
          y="16"
          width="28"
          height="28"
          className="object-cover z-50"
        />
        <polygon
          className="c z-10"
          points="194.64 45.6 194.64 167.4 68.83 167.4 68.83 41.59 190.66 41.59 184.44 35.32 59.14 35.32 53.03 41.59 53.03 103.01 66.1 114.4 66.1 167.4 53.03 180.47 53.03 243.71 66.1 257.97 184.44 257.97 198.71 243.71 198.71 49.7 194.64 45.6"
        />
        <foreignObject x="69.5" y="42" width="125" height="125">
          {data.image && (
            <Image
              src={data.image}
              alt={data.name}
              layout="fill"
              className="object-cover rounded-tr-2xl"
            />
          )}
        </foreignObject>
        <polyline
          className="c"
          points="66.13 257.97 66.09 257.93 53.03 245.02 53.03 242.34 65.95 249.18"
        />
        <polygon
          className="c"
          points="186.7 246.89 184.44 257.97 185.51 257.97 198.71 245.02 198.69 242.99 186.7 246.89"
        />
        <foreignObject x="53" y="167" width="146" height="73">
          <div className="text-white flex flex-col items-center justify-center ">
            <h2 className="text-sm font-bold mb-[1px]"> {data.name}</h2>
            <div className="flex flex-col gap-[2px] w-full px-2">
              {getEventAttributes().map((attr, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-gradient-to-t from-gray-800/70 to-gray-600/70 rounded-sm px-3 py-[1.5px] border border-slate-800 shadow-2xl"
                >
                  <attr.Icon width="7" height="7" />
                  <span className="text-[7px]" suppressHydrationWarning>
                    {attr.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </foreignObject>
        <polygon
          className="c"
          points="186.26 249.07 185.51 257.97 188.91 257.97 198.71 248.21 198.71 245.02 189.79 245.46 186.26 249.07"
        />
        <polyline
          className="c"
          points="58.96 244.43 53.03 245.07 53.03 248.21 62.8 257.97 66.64 257.97 66.56 252.48 58.99 244.48"
        />
        <a href={generateEventUrl(data.name, data.id)}>
          <polyline
            className="e"
            points="187.6 256.65 196.04 248.27 55.71 248.27 64.11 256.65"
          />
          <polyline
            className="e"
            points="64.16 239.89 55.71 248.27 196.04 248.27 187.64 239.89"
          />
          <text
            x="125"
            y="251"
            className="text-white italic font-semibold text-[9px] uppercase cursor-pointer"
            textAnchor="middle"
            fill="white"
          >
            Register
          </text>
        </a>
      </svg>
    </div>
  );
};

export default Event;
