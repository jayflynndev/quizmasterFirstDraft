import Link from "next/link";
import Image from "next/image";
import { FaMapLocationDot } from "react-icons/fa6";
import { GiTabletopPlayers } from "react-icons/gi";
import { BsCashCoin, BsClock } from "react-icons/bs";

const FeaturedQuiznightCard = ({ quiznight }) => {
  return (
    <div className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row">
      <Image
        src={quiznight.images[0]}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold">{quiznight.name}</h3>
        <div className="text-gray-600 mb-4">{quiznight.dayofweek}</div>
        <h3 className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {quiznight.typeofquiz}
        </h3>
        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <GiTabletopPlayers className="inline-block mr-2" />{" "}
            {quiznight.players}{" "}
            <span className="md:hidden lg:inline">Players</span>
          </p>
          <p>
            <BsCashCoin className="inline-block mr-2" /> {quiznight.entry}{" "}
            <span className="md:hidden lg:inline">Entry</span>
          </p>
          <p>
            <BsClock className="inline-block mr-2" />
            {quiznight.start}{" "}
            <span className="md:hidden lg:inline">Start Time</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4"></div>

        <div className="border border-gray-200 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapLocationDot className="text-lg text-orange-700" />
            <span className="text-orange-700">
              {" "}
              {quiznight.location.city} {quiznight.location.postcode}
            </span>
          </div>
          <Link
            href={`/quiznights/${quiznight._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FeaturedQuiznightCard;
