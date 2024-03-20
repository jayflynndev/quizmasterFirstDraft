import connectDB from "@/config/database";
import Quiznight from "@/models/Quiznight";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

// NOTE: here we need to send back a Content-Type: application/json response
// header rather than a text/plain header.

// GET /api/quiznight/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const quiznight = await Quiznight.findById(params.id);

    if (!quiznight)
      return new Response("Quiz Night Not Found", { status: 404 });

    return Response.json(quiznight);
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};

// DELETE /api/quiznight/:id

export const DELETE = async (_, { params }) => {
  try {
    const quiznightId = params.id;

    const sessionUser = await getSessionUser();

    // Check for session
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    await connectDB();

    const quiznight = await Quiznight.findById(quiznightId);

    if (!quiznight) return new Response("Quiznight Not Found", { status: 404 });

    // Verify ownership
    if (quiznight.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // extract public id's from image url in DB
    const publicIds = quiznight.images.map((imageUrl) => {
      const parts = imageUrl.split("/");
      return parts.at(-1).split(".").at(0);
    });

    // Delete images from Cloudinary
    if (publicIds.length > 0) {
      for (let publicId of publicIds) {
        await cloudinary.uploader.destroy("quizmasters/" + publicId);
      }
    }

    // Proceed with quiznight deletion
    await quiznight.deleteOne();

    return new Response("Quiz Night Deleted", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};

// PUT /api/quiznight/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { id } = params;
    const { userId } = sessionUser;

    const formData = await request.formData();

    // Access all values from amenities
    const amenities = formData.getAll("amenities");

    // Get quiznight to update
    const existingQuiznight = await Quiznight.findById(id);

    if (!existingQuiznight) {
      return new Response("Quiz Night does not exist", { status: 404 });
    }

    // Verify ownership
    if (existingQuiznight.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Create quiznightData object for database
    const quiznightData = {
      dayofweek: formData.get("dayofweek"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        region: formData.get("location.region"),
        postcode: formData.get("location.postcode"),
      },
      players: formData.get("players"),
      entry: formData.get("entry"),
      start: formData.get("start"),
      amenities,
      typeofquiz: formData.get("typeofquiz"),
      quizmaster: {
        name: formData.get("quizmaster.name"),
        email: formData.get("quizmaster.email"),
        phone: formData.get("quizmaster.phone"),
      },
      owner: userId,
    };

    // Update quiznight in database
    const updatedQuiznight = await Quiznight.findByIdAndUpdate(
      id,
      quiznightData
    );

    return Response.json(updatedQuiznight);
  } catch (error) {
    console.log(error);
    return new Response("Failed to add quiznight", { status: 500 });
  }
};
