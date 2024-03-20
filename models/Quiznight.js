import { Schema, model, models } from "mongoose";

const QuiznightSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dayofweek: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      region: {
        type: String,
      },
      postcode: {
        type: String,
      },
    },
    players: {
      type: Number,
      required: true,
    },
    entry: {
      type: Number,
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    features: [
      {
        type: String,
      },
    ],
    typeofquiz: {
      type: String,
      required: true,
    },
    quizmaster: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    // NOTE: Limit the user to a maximum of 4 images
    images: {
      type: [String],
      validate: {
        validator: (v) => v.length <= 4,
        message: (props) =>
          `The images array can contain a maximum of 4 images, but got ${props.value.length}`,
      },
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Quiznight = models.Quiznight || model("Quiznight", QuiznightSchema);

export default Quiznight;
