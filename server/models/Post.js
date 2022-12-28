const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: false,
        },
        username: {
            type: String,
            required: true,
        },
        userID: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        likes: {
            type: Number
        },
        dislikes: {
            type: Number
        },
        comment: [
            {
                commentValue:{
                    type: String
                },
                userID: {
                    type: String
                }
            }
        ]
    },
    { timestamps: true }
);

PostSchema.statics.getAllPosts = async () => {
    const allPosts = await mongoose.model("Post", PostSchema).find();
    return allPosts;
};

module.exports = mongoose.model("Post", PostSchema);