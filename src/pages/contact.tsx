import { type NextPage } from "next";
import { MdCall, MdLocationOn, MdMail } from "react-icons/md";

const Contact: NextPage = () => {
  return (
    <div className="min-h-screen px-4 pt-24 text-white md:px-6">
      <div className="mx-auto max-w-4xl">
        <h2
          className={`text-center text-4xl tracking-wider font-life-craft text-white md:text-6xl`}
        >
          Contact Us
        </h2>
        <h5 className="mx-auto mt-5 max-w-7xl text-center text-base md:mt-7 md:text-xl">
          Any queries should be directed to the student organizers and college
          staff at the following contact information:
        </h5>
        <div className="mx-auto mt-6 max-w-7xl rounded-sm bg-white/20 px-5 py-4 md:mb-8 md:px-10 md:py-7">
          <div className="flex items-center space-x-2 text-base font-semibold md:text-2xl">
            <MdMail />
            <a>Mail</a>
          </div>
          <p className="mt-2">
            <a
              href="mailto:incridea@nmamit.in"
              className="mt-2 hover:underline"
            >
              {" "}
              incridea@nmamit.in
            </a>
          </p>
          <div className="mt-5 flex items-center space-x-2 text-base font-semibold md:text-2xl">
            <MdCall />
            <a>Phone Numbers</a>
          </div>
          <p className="mt-2">
            General Query: +91{" "}
            <a href="tel:9449530107" className="hover:underline">
              94495 30107
            </a>{" "}
            or +91{" "}
            <a href="tel:9513295282" className="hover:underline">
              95132 95282
            </a>
          </p>
          <p className="mt-2">
            Tecnichal Query: +91{" "}
            <a href="tel:9448846524" className="hover:underline">
              94488 46524
            </a>{" "}
            or +91{" "}
            <a href="tel:9686356123" className="hover:underline">
              96863 56123
            </a>
          </p>
          <div className="mt-5 flex items-center space-x-2 text-base font-semibold md:text-2xl">
            <MdLocationOn />
            <a>Address</a>
          </div>
          <p className="mt-2 flex flex-col gap-3">
            <div className="">
              <p>NMAM Institute of Technology,</p>
              <p>Nitte, Karkala Taluk, Udupi,</p>
              <p>Karnataka, India - 574110</p>
            </div>
            <div className="">
              <p>
                A unit of Nitte (Deemed to be University), Nitte Education Trust
              </p>
              <p>6th Floor, University Enclave,</p>
              <p>Medical Sciences Complex,</p>
              <p>Deralakatte, Mangaluru - 575018</p>
              <p>Karnataka, India</p>
            </div>

            <div className="relative w-full h-96 flex justify-center items-center m-auto mt-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.6730538655893!2d74.92911808195412!3d13.183002554024787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbb56415ad85e5b%3A0x10b77ac6f6afc7fa!2sNitte%20Mahalinga%20Adyantaya%20Memorial%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1738765768735!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
