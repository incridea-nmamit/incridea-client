import { type NextPage } from "next";
import { CONSTANT } from "~/constants";

const Guidelines: NextPage = () => {
  return (
    <div className="overflow-y-auto overflow-x-hidden text-gray-100 p-10 pt-32">
      <div className="mx-auto w-full max-w-7xl">
        <h1 className={`text-center text-6xl font-life-craft tracking-wider`}>
          Guidelines and Regulations for Participating in Incridea 2025
        </h1>
        <div className="">
          <p className="mt-6 text-center">
            The fest is open to all students from engineering as well as Nitte
            sister institutions. This article outlines the guidelines and
            regulations that participants need to follow.
          </p>

          <h2 className="my-6 text-2xl font-semibold">
            Participant Registration, Entry, Identification and Access
          </h2>
          <ul className="mt-2 list-disc pl-4">
            <li>
              Registration for the fest can only be done through the official
              website of Incridea ({CONSTANT.BASE_URL}).
            </li>
            <li>
              There are two different categories of participants, who will have
              access to all the events and pronites.
            </li>
            <li>Students of NMAM Institute of Technology, Nitte - ₹ 350</li>
            <li>
              Students of external engineering colleges and Nitte sister
              institutions - ₹ 450
            </li>
            <li>
              Event registrations can be done either through website or on-spot,
              which may vary according to the event, please check the Incridea
              website for further information regarding the same.
            </li>
            <li>
              All participants must present a valid PID (Participant
              Identification) during registration for events and pronites entry.
            </li>
            <li>
              The PID provided must belong to the participant registering for
              the events, and the organisers reserve the right to verify its
              authenticity.
            </li>
            <li>
              Attendees must present their physical college IDs to access the
              events and pronites.
            </li>
            <li>
              Any participant found to have provided false or misleading
              information will be disqualified.
            </li>
            <li>
              Participants are responsible for ensuring the accuracy and
              validity of their PID and other personal information. Failure to
              provide a valid PID will result in the participant being
              ineligible to participate in the events and pronites.
            </li>
          </ul>

          <h2 className="my-6 text-2xl font-semibold">Event Rules</h2>
          <ul className="mt-2 list-disc pl-4">
            <li>
              The organisers of any event hold the right to change the rules of
              their event prior to its commencement as they see fit, without any
              obligation of notice.
            </li>
            <li>
              NMAM Institute of Technology &amp; Nitte University is not
              responsible for any loss or damage to participants&apos; personal
              belongings.
            </li>
            <li>
              Other rules pertaining to the respective events are given in their
              respective web-pages.
            </li>
          </ul>

          <h2 className="my-6 text-2xl font-semibold">Prohibited Conduct</h2>
          <ul className="mt-2 list-disc pl-4">
            <li>
              The consumption of alcoholic drinks, use of tobacco products,
              hallucinogenic drugs or other illegal substances on the campus
              premises is strictly prohibited.
            </li>
            <li>
              Anyone trying to enter the campus under the influence of
              &quot;such substances&quot; will be denied access.
            </li>
          </ul>

          <h2 className="my-6 text-2xl font-semibold">
            Accommodation for external engineering students
          </h2>
          <ul className="mt-2 list-disc pl-4">
            <li>
              The accommodation will be provided for the participants if they
              have opted for the same in the Incridea website or filled out the
              Google form provided.
            </li>
            <li>
              The accommodation service will be of two types, on-campus and
              external; the locations of the accommodation will be provided
              later up on booking of the service.
            </li>
            <li>
              Details regarding payment and other relevant information will be
              provided by the point of contact.
            </li>
            <li>
              Allotment will be on a first-come-first-serve basis, of which
              on-campus will be allotted first.
            </li>
            <li>
              <p className="font-semibold">
                The rules and regulations for the on-campus accommodation:
              </p>
              <ul className="mt-2 list-disc pl-4">
                <li>
                  {" "}
                  Separate accommodation for male and female participants.
                </li>
                <li>
                  The gate of the building in which accommodation is provided
                  will be closed within half an hour from the end of the program
                  every night.
                </li>
                <li>
                  The gate of the building will only be opened at 6 AM, so it is
                  advised to carry necessary things well in advance.
                </li>
              </ul>
            </li>
            <li>
              If the accommodation provided is external, then participants will
              be given details of the place of stay and they may book the same
              directly; transportation will be provided for the participants
              from college to place of stay and vice versa.
            </li>
          </ul>

          <h2 className="my-6 text-2xl font-semibold">
            Campus Rules and Regulations
          </h2>
          <ul className="mt-2 list-disc pl-4">
            <li>
              All the participants when inside the campus, must follow the rules
              and regulations of the campus.
            </li>
            <li>
              If found guilty of any violations, strict actions will be taken.
            </li>
            <li>
              Contact concerned organisers, core team, security officials or any
              other concerned authorities for any help or grievances.
            </li>
          </ul>

          <p className="mt-3">
            By participating in Incridea, participants agree to abide by the
            guidelines and regulations outlined above. Any participant found
            violating the rules may be immediately expelled from the campus,
            registration for all events may be cancelled, and they will be
            penalized appropriately. NMAM Institute of Technology & Nitte
            University reserve the right to take any appropriate legal actions
            in any case that requires it.
          </p>

          <p className="mb-4 mt-3">
            For further information regarding the fest and live updates, check
            out our website and Instagram handle.
          </p>

          <h2 className="my-6 text-2xl font-semibold">Championship Rules</h2>
          <ul className="mt-2 list-disc pl-4">
            <li>
              <p className="font-semibold">
                Events will be classified into 4 categories:
              </p>
              <div className="my-3 flex w-max flex-row border-2 text-center md:ml-4">
                <div className="flex flex-col border-r-2 font-semibold">
                  <div className="border-b-2 p-2">Event Category</div>
                  <div className="border-b-2 p-2">Winner</div>
                  <div className="border-b-2 p-2">Runner-Up</div>
                  <div className="p-2"> Second Runner-Up</div>
                </div>
                <div className="flex flex-col border-r-2">
                  <div className="border-b-2 p-2 font-semibold">Diamond</div>
                  <div className="border-b-2 p-2">600</div>
                  <div className="border-b-2 p-2">550</div>
                  <div className="p-2">500</div>
                </div>
                <div className="flex flex-col border-r-2">
                  <div className="border-b-2 p-2 font-semibold">Gold</div>
                  <div className="border-b-2 p-2">450</div>
                  <div className="border-b-2 p-2">400</div>
                  <div className="p-2">350</div>
                </div>
                <div className="flex flex-col border-r-2">
                  <div className="border-b-2 p-2 font-semibold">Silver</div>
                  <div className="border-b-2 p-2">300</div>
                  <div className="border-b-2 p-2">250</div>
                  <div className="p-2">200</div>
                </div>
                <div className="flex flex-col">
                  <div className="border-b-2 p-2 font-semibold">Bronze</div>
                  <div className="border-b-2 p-2">150</div>
                  <div className="border-b-2 p-2">100</div>
                  <div className="p-2">50</div>
                </div>
              </div>
            </li>
            <li>
              To be eligible for the championship, a college must qualify for
              the final round of at least 3 technical events and 2 non-technical
              events.
            </li>
            <li>
              The college that accumulates the highest points will be announced
              as the winner, and the college with the second-highest points will
              be declared the runner-up. The second runner-up will not be
              recognized with a prize; it is included only for calculating the
              championship points.
            </li>
            <li>The point system does not apply to special events.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
