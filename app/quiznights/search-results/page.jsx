"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaArrowRotateLeft } from "react-icons/fa6";
import QuiznightCard from "@/components/QuiznightCard";
import Spinner from "@/components/Spinner";
import QuiznightSearchForm from "@/components/QuiznightSearchForm";

const SearchResultsPage = () => {
  const searchParams = useSearchParams();

  const [quiznights, setQuiznights] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get("location");
  const quiznightType = searchParams.get("quiznightType");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/quiznights/search?location=${location}&quiznightType=${quiznightType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setQuiznights(data);
        } else {
          setQuiznights([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location, quiznightType]);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <QuiznightSearchForm />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <Link
              href="/quiznights"
              className="flex items-center text-blue-500 hover:underline mb-3"
            >
              <FaArrowRotateLeft className="mr-2 mb-1" /> Back To Quiz Nights
            </Link>
            <h1 className="text-2xl mb-4">Search Results</h1>
            {quiznights.length === 0 ? (
              <p>No search results found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quiznights.map((quiznight) => (
                  <QuiznightCard key={quiznight._id} quiznight={quiznight} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};
export default SearchResultsPage;
