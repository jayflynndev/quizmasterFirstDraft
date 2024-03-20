import connectDB from "@/config/database";
import Quiznight from "@/models/Quiznight";

// NOTE: here we need to send back a Content-Type: application/json response
// header rather than a text/plain header.

// GET /api/quiznights/search
export const GET = async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const quiznightType = searchParams.get("quiznightType");

    const locationPattern = new RegExp(location, "i");

    // Match location pattern against database fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    // Only check for quiznight if its not 'All'
    if (quiznightType && quiznightType !== "All") {
      const typePattern = new RegExp(quiznightType, "i");
      query.type = typePattern;
    }

    const quiznights = await Quiznight.find(query);

    return Response.json(quiznights);
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
