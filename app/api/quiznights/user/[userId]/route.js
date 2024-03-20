import connectDB from "@/config/database";
import Quiznight from "@/models/Quiznight";

// NOTE: here we need to send back a Content-Type: application/json response
// header rather than a text/plain header.

// GET /api/quiznights/user/:userId
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const userId = params.userId;

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    const quiznights = await Quiznight.find({ owner: userId });

    return Response.json(quiznights);
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};
