import { fetchQuiznights } from "@/utils/requests";
import FeaturedQuiznightCard from "./FeaturedQuiznightcard";

const FeaturedQuiznights = async () => {
  const quiznights = await fetchQuiznights({
    showFeatured: true,
  });

  return (
    quiznights.length > 0 && (
      <section className="bg-blue-50 px-4 pt-6 pb-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Featured Quiz Nights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quiznights.map((quiznight) => (
              <FeaturedQuiznightCard
                key={quiznight._id}
                quiznight={quiznight}
              />
            ))}
          </div>
        </div>
      </section>
    )
  );
};
export default FeaturedQuiznights;
