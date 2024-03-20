"use client";
import { toast } from "react-toastify";

// TODO: Give the user some feedback about the form submission before being
// redirected

const QuiznightAddForm = () => {
  // NOTE: checking for component is mounted is unnecessary so has been removed.
  // We don't need region here as we are submitting the form with a form
  // action to our API routes so we are not doing anthing with the local region.

  const handleImageChange = (e) => {
    // NOTE: Code here has changed to limit user to 4 images
    // as per the instructions to the user
    if (e.target.files.length > 4) {
      e.target.value = "";
      toast.error("You can select up to 4 images in total.");
    }
  };

  return (
    <form action="/api/quiznights" method="POST" encType="multipart/form-data">
      <h2 className="text-3xl text-center font-semibold mb-6">
        Add Quiz Night
      </h2>

      <div className="mb-4">
        <label
          htmlFor="dayofweek"
          className="block text-gray-700 font-bold mb-2"
        >
          Day of Week?
        </label>
        <select
          id="dayofweek"
          name="dayofweek"
          className="border rounded w-full py-2 px-3"
          required
        >
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Quiz Night or Pub Name?
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="eg. The Stag"
          required
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
          placeholder="What makes your quiz night special?"
        ></textarea>
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">
          Venue address
        </label>
        <input
          type="text"
          id="street"
          name="location.street"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Street"
        />
        <input
          type="text"
          id="city"
          name="location.city"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="City"
          required
        />
        <input
          type="text"
          id="region"
          name="location.region"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Region"
          required
        />
        <input
          type="text"
          id="postcode"
          name="location.postcode"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="postcode"
        />
      </div>

      <div className="mb-4 flex flex-wrap">
        <div className="w-full sm:w-1/3 pr-2">
          <label
            htmlFor="players"
            className="block text-gray-700 font-bold mb-2"
          >
            Max players per team
          </label>
          <input
            type="number"
            id="players"
            name="players"
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="w-full sm:w-1/3 px-2">
          <label htmlFor="entry" className="block text-gray-700 font-bold mb-2">
            Entry fee per person?
          </label>
          <input
            type="number"
            id="entry"
            name="entry"
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="w-full sm:w-1/3 pl-2">
          <label htmlFor="start" className="block text-gray-700 font-bold mb-2">
            Quiz start time
          </label>
          <input
            type="text"
            id="start"
            name="start"
            className="border rounded w-full py-2 px-3"
            required
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
          htmlFor="quizmaster_name"
          className="block text-gray-700 font-bold mb-2"
        >
          Quizmaster Name
        </label>
        <input
          type="text"
          id="quizmaster_name"
          name="quizmaster.name"
          className="border rounded w-full py-2 px-3"
          placeholder="Name"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="quizmaster_email"
          className="block text-gray-700 font-bold mb-2"
        >
          Quizmaster Email
        </label>
        <input
          type="email"
          id="quizmaster_email"
          name="quizmaster.email"
          className="border rounded w-full py-2 px-3"
          placeholder="Email address"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="quizmaster_phone"
          className="block text-gray-700 font-bold mb-2"
        >
          Quizmaster Phone
        </label>
        <input
          type="tel"
          id="quizmaster_phone"
          name="quizmaster.phone"
          className="border rounded w-full py-2 px-3"
          placeholder="Phone"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="images" className="block text-gray-700 font-bold mb-2">
          Images (Select up to 4 images)
        </label>
        <input
          type="file"
          id="images"
          name="images"
          className="border rounded w-full py-2 px-3"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          required
        />
      </div>

      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Quiz Night
        </button>
      </div>
    </form>
  );
};
export default QuiznightAddForm;
