import connectDB from "@/config/database";
import Quiznight from "@/models/Quiznight";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

// GET /api/quiznights
export const GET = async (request) => {
  try {
    await connectDB();

    const page = request.nextUrl.searchParams.get("page") || 1;
    const pageSize = request.nextUrl.searchParams.get("pageSize") || 6;

    const skip = (page - 1) * pageSize;

    const total = await Quiznight.countDocuments({});
    const quiznights = await Quiznight.find({}).skip(skip).limit(pageSize);

    const result = {
      total,
      quiznights,
    };

    return Response.json(result);
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    const formData = await request.formData();

    // Access all values from features and images
    const features = formData.getAll("features");

    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

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
      features,
      typeofquiz: formData.get("typeofquiz"),
      quizmaster: {
        name: formData.get("quizmaster.name"),
        email: formData.get("quizmaster.email"),
        phone: formData.get("quizmaster.phone"),
      },
      owner: userId,
    };

    const imageUrls = [];

    for (const imageFile of images) {
      const imageBuffer = await imageFile.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert the image data to base64
      const imageBase64 = imageData.toString("base64");

      // Make request to upload to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "quizmasters",
        }
      );

      imageUrls.push(result.secure_url);
    }

    // NOTE: here there is no need to await the resolution of
    // imageUploadPromises as it's not a array of Promises it's an array of
    // strings, additionally we should not await on every iteration of our loop.

    quiznightData.images = imageUrls;

    const newQuiznight = new Quiznight(quiznightData);
    await newQuiznight.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/quiznights/${newQuiznight._id}`
    );
  } catch (error) {
    return new Response("Failed to add Quiz night", { status: 500 });
  }
};
