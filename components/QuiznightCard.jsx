import Image from "next/image";
import Link from "next/link";
import { GiTabletopPlayers } from "react-icons/gi";
import { BsCashCoin, BsClock } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";

const QuiznightCard = ({ quiznight }) => {
  return (
    <div className="rounded-xl shadow-md relative">
      <Image
        src={quiznight.images[0]}
        alt=""
        height={0}
        width={0}
        sizes="100vw"
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{quiznight.dayofweek}</div>
          <h3 className="text-xl font-bold">{quiznight.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {quiznight.typeofquiz}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <GiTabletopPlayers className="inline mr-2" /> {quiznight.players}{" "}
            <span className="md:hidden lg:inline"> players per team</span>
          </p>
          <p>
            <BsCashCoin className="inline mr-2" />£ {quiznight.entry}{" "}
            <span className="md:hidden lg:inline">Entry fee per person</span>
          </p>
          <p>
            <BsClock className="inline mr-2" />
            {quiznight.start}{" "}
            <span className="md:hidden lg:inline">Start Time</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4"></div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapLocationDot className="text-green-700 mt-1" />
            <span className="text-orange-700">
              {" "}
              {quiznight.location.city} {quiznight.location.postcode}{" "}
            </span>
          </div>
          <Link
            href={`/quiznights/${quiznight._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};
export default QuiznightCard;
