import { useEffect } from "react";
import "./settings.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import MyPosts from "../../components/posts/MyPosts";
import MyComments from "../../components/comment/MyComments"

export default function Settings() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [posts, setMyPosts] = useState([]);

    const { user, dispatch } = useContext(Context);

    useEffect(() => {
        const fetchMyPosts = async () => {
            const res = await axios.get("/posts");
            setMyPosts(res.data)

            setMyPosts((Data) => {
                return (
                    Data.filter((item) => {
                        return item.userID === user._id;
                    }
                    )
                )
            })

        };
        fetchMyPosts();
    }, [user._id, posts]);

    const [currentUser, setCurrentUser] = useState(user);
    
    const PF = "http://localhost:5000/images/"

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) { }
        }
        try {
            const res = await axios.put("/users/" + user._id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };

    return (
        <div className="settings container">
            <h5 className="settingsUpdateTitle d-flex justify-content-center align-items-center">Update Your Account</h5>

            <div className="settingsWrapper">

                <form className="settingsForm form-control p-3" onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder={user.username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="settingsSubmit" type="submit">
                        Update
                    </button>
                    {success && (
                        <span
                            style={{ color: "green", textAlign: "center", marginTop: "20px" }}
                        >
                            Profile has been updated...
                        </span>
                    )}
                </form>
            </div>

            <MyPosts
                posts={posts}
            />

            <MyComments
                myComments={currentUser.comments.length === 0 ? "" : currentUser.comments}
            />
        </div>
    );
}
