"use client";
import { useState, useEffect } from "react";
import QuiznightCard from "@/components/QuiznightCard";
import Spinner from "@/components/Spinner";
import Pagination from "@/components/Pagination";

const Quiznights = () => {
  const [quiznights, setQuiznights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchQuiznights = async () => {
      try {
        const res = await fetch(
          `/api/quiznights?page=${page}&pageSize=${pageSize}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setQuiznights(data.quiznights);
        setTotalItems(data.total);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiznights();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return loading ? (
    <Spinner />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {quiznights.length === 0 ? (
          <p>No Quiznights found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quiznights.map((quiznight) => (
              <QuiznightCard key={quiznight._id} quiznight={quiznight} />
            ))}
          </div>
        )}
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};
export default Quiznights;
