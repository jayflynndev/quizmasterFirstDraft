import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// NOTE: here we need to send back a Content-Type: application/json response
// header rather than a text/plain header.

export const POST = async (request) => {
  try {
    await connectDB();

    const { quiznightId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    // Find user in database
    const user = await User.findOne({ _id: userId });

    // Check if quiznight is bookmarked
    let isBookmarked = user.bookmarks.includes(quiznightId);

    return Response.json({ isBookmarked });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
