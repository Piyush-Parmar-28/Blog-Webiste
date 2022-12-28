import { useEffect, useState } from "react"
import axios from "axios"

import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
    const [sort, setSort] = useState("");
    const [allPosts, setAllPosts] = useState([]);
    const [allPosts2, setAllPosts2] = useState([]);
    const [number, setNumber] = useState(0);
    const [searchData, setSearchData] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/posts");
            setAllPosts(res.data);
            setAllPosts2(res.data);
        };
        fetchPosts();
    }, []);

    console.log("effect posts: ");
    console.log(allPosts);

    const getSearchData = async (event) => {
        setSearchData(event.target.value.toLowerCase());
    };

    console.log(searchData);

    const getPosts = () => {
        const Data= allPosts2;
        console.log("The datas are: ");
        console.log(Data);

        if(searchData.length === 0){
            return;
        }

        // setAllPosts((Data) => {
            console.log("The data is: ");
            console.log(Data);

            const filteredPosts = Data.filter(obj => {
                console.log("obj");
                console.log(obj);

                const date= new Date(obj.createdAt).toDateString().toLowerCase()

                if (obj.username.toLowerCase().includes(searchData) || obj.title.toLowerCase().includes(searchData) || obj.desc.toLowerCase().includes(searchData) || obj.category.toLowerCase().includes(searchData) || date.includes(searchData) ) {
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

            // return (
            //     filteredPosts
            // )
        // })

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

                    // return (a.localeCompare(b))
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

    return (
        <div className="posts d-flex flex-column">
            <h4>All Posts</h4>

            <div className="d-flex flex-row justify-content-evenly">

                <div>
                    <select className="btn btn-secondary" name="category" onChange={e => setSort(e.target.value)}>
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


            {allPosts.map((p) => (
                <Post
                    key={p._id}
                    post={p}
                />
            ))}
        </div>
    );
}
