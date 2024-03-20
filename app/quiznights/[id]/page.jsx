"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchQuiznight } from "@/utils/requests";
import QuiznightHeaderImage from "@/components/QuiznightHeaderImage";
import QuiznightDetails from "@/components/QuiznightDetails";
import QuiznightImages from "@/components/QuiznightImages";
import BookmarkButton from "@/components/BookmarkButton";
import QuiznightContactForm from "@/components/QuiznightContactForm";
import ShareButtons from "@/components/ShareButtons";
import Spinner from "@/components/Spinner";
import { FaArrowRotateLeft } from "react-icons/fa6";

const QuiznightPage = () => {
  const { id } = useParams();

  const [quiznight, setQuiznight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiznightData = async () => {
      if (!id) return;
      try {
        const quiznight = await fetchQuiznight(id);
        setQuiznight(quiznight);
      } catch (error) {
        console.error("Error fetching quiznight:", error);
      } finally {
        setLoading(false);
      }
    };

    if (quiznight === null) {
      fetchQuiznightData();
    }
  }, [id, quiznight]);

  if (!quiznight && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Quiznight Not Found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && quiznight && (
        <>
          <QuiznightHeaderImage image={quiznight.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/quiznights"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowRotateLeft className="mr-2" /> Back to Quiz Nights
              </Link>
            </div>
          </section>

          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <QuiznightDetails quiznight={quiznight} />
                <aside className="space-y-4">
                  <BookmarkButton quiznight={quiznight} />
                  <ShareButtons quiznight={quiznight} />
                  <QuiznightContactForm quiznight={quiznight} />
                </aside>
              </div>
            </div>
          </section>
          <QuiznightImages images={quiznight.images} />
        </>
      )}
    </>
  );
};
export default QuiznightPage;
