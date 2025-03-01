import { motion } from "framer-motion";

export default function Marquee() {
    return (
        <div className="overflow-hidden bg-orange-400 py-2">
            <motion.div
                className="flex whitespace-nowrap text-text text-lg font-semibold"
                animate={{ x: ["50%", "-1000%"] }}
                transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
                initial={{ x: "50%" }}
            >
                <span className="flex space-x-1">
                    {Array.from({ length: 100 }, (_, i) => (
                        <span key={i}>
                            Website registrations close at 4:00PM &nbsp; • &nbsp;
                            There are no on-spot registrations &nbsp; • &nbsp;
                            Band distribution closes at 2:00PM &nbsp; • &nbsp;
                            Concert gates closes at 6:00PM &nbsp; • &nbsp;
                        </span>
                    ))}
                </span>
            </motion.div>
        </div>
        
    );
}
