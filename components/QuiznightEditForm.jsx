"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchQuiznight } from "@/utils/requests";

const QuiznightEditForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState({
    dayofweek: "",
    name: "",
    description: "",
    location: {
      street: "",
      city: "",
      region: "",
      postcode: "",
    },
    players: "",
    entry: "",
    start: "",
    features: [],
    typeofquiz: "",
    quizmaster: {
      name: "",
      email: "",
      phone: "",
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Fetch property data for form
    const fetchQuiznightData = async () => {
      try {
        const quiznightData = await fetchQuiznight(id);

        // Check rates for null, if so then make empty string

        setFields(quiznightData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiznightData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if nested property
    if (name.includes(".")) {
      const [outerKey, innerKey] = name.split(".");

      setFields((prevFields) => ({
        ...prevFields,
        [outerKey]: {
          ...prevFields[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      // Not nested
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };
  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;

    // Clone the current array
    const updatedAmenites = [...fields.amenities];

    if (checked) {
      // Add value to array
      updatedAmenites.push(value);
    } else {
      // Remove value from array
      const index = updatedAmenites.indexOf(value);

      if (index !== -1) {
        updatedAmenites.splice(index, 1);
      }
    }

    // Update state with updated array
    setFields((prevFields) => ({
      ...prevFields,
      amenities: updatedAmenites,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const res = await fetch(`/api/quiznights/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.status === 200) {
        router.push(`/quiznights/${id}`);
      } else if (res.status === 401 || res.status === 403) {
        toast.error("Permission denied");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    mounted &&
    !loading && (
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl text-center font-semibold mb-6">
          Edit Property
        </h2>

        <div className="mb-4">
          <label
            htmlFor="dayofweek"
            className="block text-gray-700 font-bold mb-2"
          >
            Property Type
          </label>
          <select
            id="dayofweek"
            name="dayofweek"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.dayofweek}
            onChange={handleChange}
          >
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="House">House</option>
            <option value="Cabin Or Cottage">Cabin or Cottage</option>
            <option value="Room">Room</option>
            <option value="Studio">Studio</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Listing Name
          </label>
          <input
            type="text"
            id="quizname"
            name="quizname"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="eg. Beautiful Apartment In Miami"
            required
            value={fields.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="border rounded w-full py-2 px-3"
            rows="4"
            placeholder="Add an optional description of your property"
            value={fields.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-4 bg-blue-50 p-4">
          <label className="block text-gray-700 font-bold mb-2">Location</label>
          <input
            type="text"
            id="street"
            name="location.street"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Street"
            value={fields.location.street}
            onChange={handleChange}
          />
          <input
            type="text"
            id="city"
            name="location.city"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="City"
            required
            value={fields.location.city}
            onChange={handleChange}
          />
          <input
            type="text"
            id="region"
            name="location.region"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Region"
            required
            value={fields.location.region}
            onChange={handleChange}
          />
          <input
            type="text"
            id="postcode"
            name="location.postcode"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="postcode"
            value={fields.location.postcode}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 flex flex-wrap">
          <div className="w-full sm:w-1/3 pr-2">
            <label
              htmlFor="players"
              className="block text-gray-700 font-bold mb-2"
            >
              players
            </label>
            <input
              type="number"
              id="players"
              name="players"
              className="border rounded w-full py-2 px-3"
              required
              value={fields.players}
              onChange={handleChange}
            />
          </div>
          <div className="w-full sm:w-1/3 px-2">
            <label
              htmlFor="entry"
              className="block text-gray-700 font-bold mb-2"
            >
              entry
            </label>
            <input
              type="number"
              id="entry"
              name="entry"
              className="border rounded w-full py-2 px-3"
              required
              value={fields.entry}
              onChange={handleChange}
            />
          </div>
          <div className="w-full sm:w-1/3 pl-2">
            <label
              htmlFor="start"
              className="block text-gray-700 font-bold mb-2"
            >
              Start Time
            </label>
            <input
              type="text"
              id="start"
              name="start"
              className="border rounded w-full py-2 px-3"
              required
              value={fields.start}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Features</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div>
              <input
                type="checkbox"
                id="features_prize"
                name="features"
                value="Cash Prize"
                className="mr-2"
              />
              <label htmlFor="features_prize">Cash Prize</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="features_mbingo"
                name="features"
                value="Music Bingo"
                className="mr-2"
              />
              <label htmlFor="features_mbingo">Music Bingo</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="features_bingo"
                name="features"
                value="Standard Bingo"
                className="mr-2"
              />
              <label htmlFor="features_bingo">Standard Bingo</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="features_friendly"
                name="features"
                value="Friendly Welcome"
                className="mr-2"
              />
              <label htmlFor="features_friendly">Friendly Welcome</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="features_book"
                name="features"
                value="Booking Advised"
                className="mr-2"
              />
              <label htmlFor="features_book">Booking Advised</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="features_sidegames"
                name="features"
                value="Side Games"
                className="mr-2"
              />
              <label htmlFor="features_sidegames">Side Games</label>
            </div>
          </div>
        </div>

        <div className="mb-4 bg-blue-50 p-4">
          <label className="block text-gray-700 font-bold mb-2">
            Quiz night type:
          </label>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <label htmlFor="typeofquiz" className="mr-2">
                Eg: Smartphone, Pen & Paper?
              </label>
              <input
                type="type"
                id="typeofquiz"
                name="typeofquiz"
                className="border rounded w-full py-2 px-3"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="seller_name"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Name
          </label>
          <input
            type="text"
            id="seller_name"
            name="quizmaster.name"
            className="border rounded w-full py-2 px-3"
            placeholder="Name"
            value={fields.quizmaster.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_email"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Email
          </label>
          <input
            type="email"
            id="seller_email"
            name="quizmaster.email"
            className="border rounded w-full py-2 px-3"
            placeholder="Email address"
            required
            value={fields.quizmaster.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_phone"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Phone
          </label>
          <input
            type="tel"
            id="seller_phone"
            name="quizmaster.phone"
            className="border rounded w-full py-2 px-3"
            placeholder="Phone"
            value={fields.quizmaster.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Property
          </button>
        </div>
      </form>
    )
  );
};
export default QuiznightEditForm;
