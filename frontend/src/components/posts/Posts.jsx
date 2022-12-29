import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom";

import CommentBox from "../comment/CommentBox"
import RecentComment from "../comment/RecentComment";
import { Context } from "../../context/Context";
import "./post.css";

export default function Posts({ posts }) {
    const { user, dispatch } = useContext(Context);

    const [sort, setSort] = useState("");
    const [allPosts, setAllPosts] = useState([]);
    const [allPosts2, setAllPosts2] = useState([]);
    const [number, setNumber] = useState(0);
    const [searchData, setSearchData] = useState("");
    const [likeState, setLikeState] = useState([]);
    const [dislikeState, setDisLikeState] = useState([]);
    const [currentUser, setCurrentUser] = useState(user);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/posts");
            setAllPosts(res.data);
            setAllPosts2(res.data);
        };
        fetchPosts();
    }, []);

    const handleLike = async (postID, userID) => {
        const details = {
            userID,
            postID
        };

        try {
            const updatedUserData = await axios.post("posts/like", details);
            const res = await axios.get("/posts");
            
            setCurrentUser(updatedUserData.data)
            setAllPosts(res.data);
            setAllPosts2(res.data);

            likeState.push(postID)

            if(dislikeState.includes(postID)){
                dislikeState.splice(dislikeState.indexOf(postID), 1)
            }
        } catch (err) {
            console.log("error is: ");
            console.log(err);
        }
    };

    console.log("Like State array is: ");
    console.log(likeState);

    const handleDisLike = async (postID, userID) => {
        console.log("postID: " + postID);
        console.log("userID: " + userID);

        const details = {
            userID,
            postID
        };

        try {
            const updatedUserData = await axios.post("posts/dislike", details);
            const res = await axios.get("/posts");
            
            setCurrentUser(updatedUserData.data)
            setAllPosts(res.data);
            setAllPosts2(res.data);
            setNumber(number + 1);

            dislikeState.push(p._id)
            
            if(likeState.includes(postID)){
                likeState.splice(likeState.indexOf(postID), 1)
            }
        } catch (err) {
            console.log("error is: ");
            console.log(err);
        }
    };

    console.log("effect posts: ");
    console.log(allPosts);

    const getSearchData = async (event) => {
        setSearchData(event.target.value.toLowerCase());
    };

    console.log(searchData);

    const getPosts = () => {
        const Data = allPosts2;
        console.log("The datas are: ");
        console.log(Data);

        if (searchData.length === 0) {
            return;
        }

        console.log("The data is: ");
        console.log(Data);

        const filteredPosts = Data.filter(obj => {
            console.log("obj");
            console.log(obj);

            const date = new Date(obj.createdAt).toDateString().toLowerCase()

            if (obj.username.toLowerCase().includes(searchData) || obj.title.toLowerCase().includes(searchData) || obj.desc.toLowerCase().includes(searchData) || obj.category.toLowerCase().includes(searchData) || date.includes(searchData)) {
                console.log("r1");
                return obj;
            }

            var postComments = obj.comment;
            console.log("comments are: ");
            console.log(postComments);

            var i = 0;
            for (i = 0; i < postComments.length; i++) {
                if (postComments[i].toLowerCase().includes(searchData)) {
                    console.log("r1");
                    return obj;
                }
            }
        })

        console.log("fp");
        console.log(filteredPosts);
        setAllPosts(filteredPosts)

        console.log("Sorted post: ");
        console.log(allPosts);
        setNumber(number + 1)
    }

    const handleSort = async (event) => {
        console.log(posts);

        setAllPosts((Data) => {
            if (sort === "date") {
                console.log("its date");
                Data.sort((obj1, obj2) => {
                    var a = new Date(obj1.createdAt);
                    var b = new Date(obj2.createdAt);

                    console.log("a: " + a);
                    console.log("b: " + b);

                    if (a > b) {
                        return -1;
                    }
                    else if (a < b) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                })
            }

            if (sort === "comment") {
                console.log("comment posts sort");
                Data.sort((obj1, obj2) => {
                    if (obj1.comment.length > obj2.comment.length) {
                        return -1;
                    }
                    else if (obj1.comment.length < obj2.comment.length) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                })
            }

            if (sort === "like") {
                Data.sort((obj1, obj2) => {
                    if (obj1.likes > obj2.likes) {
                        return -1;
                    }
                    else if (obj1.likes < obj2.likes) {
                        return 1;
                    }
                    else {
                        if (obj1.dislikes > obj2.dislikes) {
                            return 1;
                        }
                        else if (obj1.dislikes < obj2.dislikes) {
                            return -1;
                        }
                        else {
                            return 0;
                        }
                    }
                })
            }

            setAllPosts(Data)

            return (
                Data
            )

        })

        console.log("Sorted post: ");
        console.log(allPosts);
        setNumber(number + 1)
    }

    const updateBtn= ()=>{
        console.log("Calling func");
        return "disabled";
    }

    return (
        <div className="posts d-flex flex-column">
            <h4 className="postHeading d-flex justify-content-center align-items-center mt-3">All Posts</h4>

            <div className="d-flex flex-row justify-content-evenly p-3">

                <div>
                    <select className="btn btn-secondary me-2" name="category" onChange={e => setSort(e.target.value)}>
                        <option value="">Sort By</option>
                        <option value="like">Like</option>
                        <option value="comment">Comments</option>
                        <option value="date">Date Created</option>
                    </select>

                    <button className="btn btn-primary" onClick={handleSort}>
                        Sort
                    </button>
                </div>

                <div className="d-flex flex-row">
                    <input
                        className="me-2 form-control"
                        type="text"
                        placeholder="Search anything..."
                        name="item"
                        onChange={getSearchData}
                        value={searchData}
                    />

                    <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={getPosts}
                    >
                        <i class="bi bi-search"></i>
                    </button>
                </div>
            </div>

            {/* Mapping our posts */}
            <div className="d-flex flex-row">
                {allPosts.map((p) => (
                    <div className="post p-3 form-control">
                        {
                            ()=>{
                                setLikeState("")
                                setDisLikeState("")
                            }
                        }

                        <Link to={`/post/${p._id}`} className="link d-flex justify-content-center align-items-center">
                            <span className="postTitle">{p.title}</span>
                        </Link>

                        <div className="d-flex justify-content-between">
                            <span className="postCat">{p.category}</span>

                            <span className="postDate">
                                {new Date(p.createdAt).toDateString()}
                            </span>

                        </div>
                        <hr />

                        <p className="postDesc d-flex justify-content-center align-items-center mt-2">{p.desc}</p>
                        <hr />

                        <div className="d-flex flex-row justify-content-between">
                            <button type="button" className={`btn btn-success ${likeState.includes(p._id)? "disabled": ""} `} onClick={() => { handleLike(p._id, currentUser._id) }}>Like {p.likes}</button>

                            <button type="button" className={`btn btn-danger ${dislikeState.includes(p._id)? "disabled": ""}`} onClick={() => { handleDisLike(p._id, currentUser._id) }}>Dislike {p.dislikes}</button>
                        </div>

                        <CommentBox
                            postID={p._id}
                            userID={currentUser._id}
                        />

                        {p.comment.map((comment) => (
                            <RecentComment
                                key={comment._id}
                                author={p.username}
                                comm={comment.commentValue}
                            />
                        ))}

                    </div>
                ))}
            </div>

        </div>
    );
}
