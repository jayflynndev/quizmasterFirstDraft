"use client";
import { useState, useEffect } from "react";
import QuiznightCard from "@/components/QuiznightCard";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

const SavedQuiznightPage = () => {
  const [quiznights, setQuiznights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedQuiznights = async () => {
      try {
        const res = await fetch("/api/bookmarks");

        if (res.status === 200) {
          const data = await res.json();
          setQuiznights(data);
        } else {
          console.log(res.statusText);
          toast.error("Failed to fetch saved Quiz Night");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch saved Quiz Night");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedQuiznights();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Quiz Night</h1>
        {quiznights.length === 0 ? (
          <p>No saved Quiz Night</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quiznights.map((quiznight) => (
              <QuiznightCard key={quiznight._id} quiznight={quiznight} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default SavedQuiznightPage;
