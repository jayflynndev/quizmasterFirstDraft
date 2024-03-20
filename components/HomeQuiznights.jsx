import Link from "next/link";
import QuiznightCard from "@/components/QuiznightCard";
import { fetchQuiznights } from "@/utils/requests";

const HomeQuiznights = async () => {
  const data = await fetchQuiznights();

  const recentQuiznights = data.quiznights
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Quiz Nights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentQuiznights.length === 0 ? (
              <p>No Quiz Nights Found</p>
            ) : (
              recentQuiznights.map((quiznight) => (
                <QuiznightCard key={quiznight._id} quiznight={quiznight} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/quiznights"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Quiz Nights
        </Link>
      </section>
    </>
  );
};
export default HomeQuiznights;
