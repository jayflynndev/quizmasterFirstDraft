import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaMapMarker,
} from "react-icons/fa";
import QuiznightMap from "@/components/QuiznightMap";

const QuiznightDetails = ({ quiznight }) => {
  return (
    <main>
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{quiznight.dayofweek}</div>
        <h1 className="text-3xl font-bold mb-4">{quiznight.name}</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          <FaMapMarker className="text-lg text-orange-700 mr-2" />
          <p className="text-orange-700">
            {quiznight.location.street}, {quiznight.location.city}{" "}
            {quiznight.location.postcode}
          </p>
        </div>

        <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
          Rates & Options
        </h3>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">
              {quiznight.typeofquiz}
            </div>
            <div className="text-2xl font-bold text-blue-500"></div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
        <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
          <p>
            {quiznight.players}{" "}
            <span className="hidden sm:inline">players</span>
          </p>
          <p>
            {quiznight.entry}{" "}
            <span className="hidden sm:inline">Entry fee per person</span>
          </p>
          <p>
            <FaRulerCombined className="inline-block mr-2" />
            {quiznight.start}{" "}
            <span className="hidden sm:inline">Start time</span>
          </p>
        </div>
        <p className="text-gray-500 mb-4 text-center">
          {quiznight.description}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Features</h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2">
          {quiznight.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <QuiznightMap quiznight={quiznight} />
      </div>
    </main>
  );
};
export default QuiznightDetails;
