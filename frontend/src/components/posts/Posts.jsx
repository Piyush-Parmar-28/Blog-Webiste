import {useEffect, useState} from "react"
import axios from "axios"

import Post from "../post/Post";
import "./posts.css";

export default function Posts({posts}) {
    const [sort, setSort] = useState("");
    const [allPosts, setAllPosts] = useState([]);
    const [number, setNumber]= useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/posts");
            setAllPosts(res.data);
        };
        fetchPosts();
    }, []);

    console.log("effect posts: ");
    console.log(allPosts);

    const handleSort= async (event)=>{
        console.log(posts);

        setAllPosts( (Data) =>{
            if(sort === "date"){
                console.log("its date");
                Data.sort( (obj1, obj2)=>{
                    var a= new Date(obj1.createdAt);
                    var b= new Date(obj2.createdAt);

                    console.log("a: "+ a);
                    console.log("b: "+ b);

                    // return (a.localeCompare(b))
                    if(a > b){
                        return -1;
                    }
                    else if(a < b){
                        return 1;
                    }
                    else{
                        return 0;
                    }
                } )
            }
    
            if(sort === "comment"){
                console.log("comment posts sort");
                Data.sort( (obj1, obj2)=>{
                    if(obj1.comment.length > obj2.comment.length){
                        return -1;
                    }
                    else if(obj1.comment.length < obj2.comment.length){
                        return 1;
                    }
                    else{
                        return 0;
                    }
                } )
            }

            if(sort === "like"){
                Data.sort( (obj1, obj2)=>{
                    if(obj1.likes > obj2.likes){
                        return -1;
                    }
                    else if(obj1.likes < obj2.likes){
                        return 1;
                    }
                    else{
                        if(obj1.dislikes > obj2.dislikes){
                            return 1;
                        }
                        else if(obj1.dislikes < obj2.dislikes){
                            return -1;
                        }
                        else{
                            return 0;
                        }
                    }
                } )
            }

            setAllPosts(Data)

            return(
                Data
            )

        } )
        
        console.log("Sorted post: ");
        console.log(allPosts);
        setNumber(number+1)
    }

    return (
        <div className="posts d-flex flex-column">
            <h4>All Posts</h4>

            <div>
                <h5>Sort By: </h5>
                
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

            {allPosts.map((p) => (
                <Post
                    key={p._id}
                    post={p}
                />
            ))}
        </div>
    );
}
