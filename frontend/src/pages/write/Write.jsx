import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [likes, setLikes] = useState(0);
    const [dislikes, setDisLikes] = useState(0);
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            username: user.username,
            userID: user._id,
            title,
            desc,
            category,
            likes,
            dislikes
        };

        try {
            console.log("user is: ", user);

            const res = await axios.post("/posts", newPost);
            window.location.replace("/post/" + res.data._id);
        } catch (err) { }
    };

    return (
        <div className="p-5 mt-5 container upperContainer">

            <form className="p-4 mt-3 form-control writeBox" onSubmit={handleSubmit}>
                <div className="mt-3">
                    <input
                        type="text"
                        placeholder="Title"
                        className="form-control"
                        autoFocus={true}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div className="mt-3">
                    <textarea
                        placeholder="Tell something..."
                        type="text"
                        rows="5"
                        className="form-control"
                        onChange={e => setDesc(e.target.value)}
                    ></textarea>
                </div>

                <div className="mt-3 mb-3 d-flex flex-row justify-content-between">
                    <select className="btn btn-secondary" name="category" onChange={e => setCategory(e.target.value)}>
                        <option value="">Select a category</option>
                        <option value="electronics">Electronics</option>
                        <option value="study">Study</option>
                        <option value="fashion">Fashion</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="beauty">Beauty</option>
                        <option value="sports">Sports</option>
                        <option value="toys">Toys</option>
                        <option value="home">Home Decor</option>
                    </select>

                    <button className="btn btn-primary" type="submit">
                        Publish
                    </button>
                </div>


            </form>
        </div>
    );
}
