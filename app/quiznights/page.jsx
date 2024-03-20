import QuiznightSearchForm from "@/components/QuiznightSearchForm";
import Quiznights from "@/components/Quiznights";

const QuiznightsPage = async () => {
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <QuiznightSearchForm />
        </div>
      </section>
      <Quiznights />
    </>
  );
};
export default QuiznightsPage;
