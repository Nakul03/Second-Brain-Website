import mongoose, {model,  Schema} from "mongoose";

mongoose.connect("mongodb+srv://nakulpise831:nakul1381@cluster0.h4om8.mongodb.net/Second_Brain")

const userSchema = new Schema({
    username: { type: String, unique: true},
    password: String,
});

export const userModel = model("User", userSchema);

const contentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    type: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true}
});

const LinkSchema = new Schema({
    hash: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true}
});

export const LinkModel = model("Links", LinkSchema);
export const contentModel = model("Content", contentSchema); 