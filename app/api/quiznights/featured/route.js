import connectDB from "@/config/database";
import Quiznight from "@/models/Quiznight";

// NOTE: here we need to send back a Content-Type: application/json response
// header rather than a text/plain header.

// GET /api/quiznights/featured
export const GET = async (request) => {
  try {
    await connectDB();

    const quiznights = await Quiznight.find({
      is_featured: true,
    });

    return Response.json(quiznights);
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};
