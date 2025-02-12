import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCopy } from "react-icons/ai";
import { BiCheckDouble } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";

import Badge from "~/components/badge";
import Button from "~/components/button";
import ConfirmTeamModal from "~/components/general/profile/confirmTeam";
// import GoogleCalendar from './googleCalendar';
import LeaveTeamModal from "~/components/general/profile/leaveTeamModal";
import { EventType, type QueryMyTeamSuccess } from "~/generated/generated";
import { idToPid, idToTeamId } from "~/utils/id";
import { makeTeamPayment } from "~/utils/razorpay";
import { generateEventUrl } from "~/utils/url";

import CreateTeamModal from "./createTeamModal";
import EditTeamModal from "./editEvent";
import JoinTeamModal from "./joinTeamModal";
import { CONSTANT } from "~/constants";

const TeamCard = ({
  team,
  userId,
  name,
  email,
}: {
  team: QueryMyTeamSuccess["data"];
  userId: string;
  name: string;
  email: string;
}) => {
  const [sdkLoading, setSdkLoading] = useState(false);

  const url = `Join my team for ${
    team.event.name
  } event at Incridea ${CONSTANT.YEAR}! Here's the link: ${CONSTANT.BASE_URL}${generateEventUrl(
    team.event.name,
    team.event.id,
  )}?jointeam=${idToTeamId(team.id)}`;

  const copyUrl = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard!", {
      position: "bottom-center",
    });
  };

  return (
    <div className="flex flex-col">
      <div className="relative mb-4 mt-5 flex w-full flex-col items-start justify-center rounded-md border border-secondary-400/40 bg-black bg-opacity-15  p-5">
        <div className="w-full text-center">
          {team.confirmed ? (
            team.event.eventType === EventType.Individual ||
            team.event.eventType === EventType.IndividualMultipleEntry ? (
              <h1 className="">You&apos;re registered and ready to play!</h1>
            ) : (
              <h1 className="">Your team is registered and ready to play!</h1>
            )
          ) : team.event.eventType === EventType.Individual ||
            team.event.eventType === EventType.IndividualMultipleEntry ? (
            <h1 className="">
              Heads up! Your registration is not confirmed yet.
            </h1>
          ) : (
            <h1 className="">Heads up! Your team is not confirmed yet.</h1>
          )}
        </div>
        <div className="w-full">
          <div className="mb-2 flex items-center justify-center">
            {team.event.eventType === EventType.Individual ||
            team.event.eventType === EventType.IndividualMultipleEntry ? (
              team.confirmed && (
                <div className="w-fit p-3 text-center">
                  <QRCodeSVG
                    value={idToPid(userId)}
                    size={100}
                    className="mb-1"
                    bgColor="transparent"
                    fgColor="#ffffff"
                    // filter='drop-shadow(0px 0px 4px #111111bb)'
                  />
                </div>
              )
            ) : (
              <div className="w-fit p-3 text-center">
                <QRCodeSVG
                  value={idToTeamId(team.id)}
                  size={100}
                  className="mb-1"
                  fgColor="#ffffff"
                  bgColor="transparent"
                />
                <div className="mt-2 font-semibold text-white">
                  {idToTeamId(team.id)}
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="mt-5 flex w-full items-center justify-between">
              {!(
                team.event.eventType === EventType.Individual ||
                team.event.eventType === EventType.IndividualMultipleEntry
              ) ? (
                <div
                  className={`w-fit justify-center space-x-2 text-center text-2xl font-bold`}
                >
                  {team.name}
                </div>
              ) : (
                <div
                  className={`-mt-5 w-full justify-center space-x-2 text-center text-lg font-bold`}
                >
                  {idToPid(userId)}
                </div>
              )}
              {Number(userId) === team.leaderId && !team.confirmed ? (
                !(
                  team.event.eventType === EventType.Individual ||
                  team.event.eventType === EventType.IndividualMultipleEntry
                ) && <EditTeamModal team={team} userId={userId} />
              ) : (
                <Badge
                  color={"success"}
                  className="absolute right-1/2 top-0 inline-flex -translate-y-1/2 translate-x-1/2 items-center gap-1 !border-secondary-400/40 bg-[#D79128] text-sm !text-white"
                >
                  <BiCheckDouble /> Registered
                </Badge>
              )}
            </div>
            {!team.confirmed && (
              <span className="text-xs">
                Almost there!{" "}
                {team.event.fees
                  ? `Pay ${team.event.fees} to confirm `
                  : "Confirm "}
                your{" "}
                {team.event.eventType === EventType.Individual ||
                team.event.eventType === EventType.IndividualMultipleEntry
                  ? "entry"
                  : "team"}{" "}
                by clicking the button below.
              </span>
            )}
            {!team.confirmed &&
              team.leaderId === Number(userId) &&
              (team.event.fees > 0 ? (
                <Button
                  fullWidth
                  intent="success"
                  className="mt-2 items-center justify-center !font-sans font-bold"
                  disabled={sdkLoading}
                  onClick={async () => {
                    if (team.members.length >= team.event.minTeamSize)
                      await makeTeamPayment(
                        team.id,
                        name,
                        email,
                        setSdkLoading,
                      );
                    else
                      toast.error(
                        `You need ${
                          team.event.minTeamSize - team.members.length
                        } more members to confirm your team.`,
                        { position: "bottom-center" },
                      );
                  }}
                >
                  Pay {team.event.fees} to confirm
                </Button>
              ) : (
                <ConfirmTeamModal
                  teamId={team.id}
                  canConfirm={team.members.length >= team.event.minTeamSize}
                  needMore={team.event.minTeamSize - team.members.length}
                />
              ))}
          </div>
        </div>

        {!(
          team.event.eventType === EventType.Individual ||
          team.event.eventType === EventType.IndividualMultipleEntry
        ) && (
          <>
            {/* <hr className="w-full border-white/40 mt-3 mb-2" /> */}
            <p className="mb-1 mt-5 font-semibold">Team Members:</p>
            <div className="w-full">
              {team?.members?.map((member) => (
                <div className="text-sm" key={member.user.id}>
                  <h1>{member.user.name}</h1>
                </div>
              ))}
            </div>
          </>
        )}

        {!(
          team.event.eventType === EventType.Individual ||
          team.event.eventType === EventType.IndividualMultipleEntry
        ) &&
          !team.confirmed &&
          (team.leaderId === Number(userId) ? (
            <>
              <hr className="my-3 w-full border-white/20" />
              <div className="flex w-full flex-col justify-center">
                <p className="text-xs">
                  Share this link with your friends to add them to your team!
                </p>
                <div className="mt-2 flex items-center justify-evenly gap-2">
                  <input
                    readOnly
                    type="url"
                    className="w-full overflow-hidden rounded-lg bg-white bg-opacity-20 p-2 px-3 text-sm"
                    value={url}
                  />
                  <AiOutlineCopy
                    onClick={copyUrl}
                    size={20}
                    className="cursor-pointer hover:text-gray-400"
                  />
                </div>

                <div className="flex items-center py-2">
                  <div className="white/40 h-px flex-grow"></div>
                  <span className="flex-shrink px-4 text-sm font-light">
                    or
                  </span>
                  <div className="white/40 h-px flex-grow"></div>
                </div>

                <Link
                  href={`https://wa.me/?text=${encodeURIComponent(url)}`}
                  className="text-bold flex cursor-pointer items-center justify-center gap-2 rounded-md bg-primary-200/30 p-2 text-sm text-green-500 transition-colors hover:bg-primary-200/50"
                >
                  <BsWhatsapp /> Share on WhatsApp
                </Link>
              </div>
            </>
          ) : (
            <LeaveTeamModal refetch={"MyTeam"} teamId={team.id} />
          ))}

        {/* {team.confirmed && (
          <>
            <hr className="w-full border-white/40 my-3" />
            <div className="w-full space-y-3">
              <GoogleCalendar />
            </div>
          </>
        )} */}
      </div>
      {(team.event.eventType === EventType.TeamMultipleEntry ||
        team.event.eventType === EventType.IndividualMultipleEntry) && (
        <div className="flex max-w-2xl flex-col items-start justify-center">
          <EventButtons
            type={team.event.eventType}
            eventId={team.event.id}
            fees={team.event.fees}
            name={name}
            email={email}
          />
        </div>
      )}
    </div>
  );
};

const EventButtons = ({
  type,
  eventId,
}: {
  type: EventType;
  eventId: string;
  fees: number;
  name: string;
  email: string;
}) => {
  if (
    type === EventType.Individual ||
    type === EventType.IndividualMultipleEntry
  ) {
    return null;
  } else {
    return (
      <div className="w-full space-y-2">
        <CreateTeamModal eventId={eventId} />
        <JoinTeamModal />
      </div>
    );
  }
};

export default TeamCard;
