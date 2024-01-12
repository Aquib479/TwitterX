import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
  } from "firebase/firestore";
  import React, { useEffect, useState } from "react";
  import { useOutletContext } from "react-router-dom";
  import { db } from "../../firebase";
  import { formatDistanceToNow } from "date-fns";
  
  
  const Posts = () => {
    const [userDetail, setUserDetail] = useOutletContext();
    const [postData, setPostData] = useState([]);
    const [IsLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await Promise.all(
            userDetail.posts.map(async (pid) => {
              const q = query(
                collection(db, "posts"),
                where("postID", "==", pid)
              );
  
              const querySnapshot = await getDocs(q);
  
              const postPromises = querySnapshot.docs.map(async (pdoc) => {
                const postRef = doc(db, "posts", pdoc.id);
                const postSnapshot = await getDoc(postRef);
                return postSnapshot.data();
              });
  
              const posts = await Promise.all(postPromises);
  
              return posts;
            })
          );
          const allPosts = response.flat();
          setPostData(allPosts);
          setIsLoading(false);
        } catch (error) {
          alert("Something went wrong while fetching the data");
          setIsLoading(false)
        }
      }
      fetchData();
    }, []);
  
  
  
  
    if (IsLoading) {
      // Loading state
      return (
        <>
          <div class="rounded-md p-4 max-w-md w-full mx-auto my-4">
            <div class="animate-pulse flex space-x-4">
              <div class="rounded-full bg-slate-300 h-10 w-10"></div>
              <div class="flex-1 space-y-6 py-1">
                <div class="h-2 bg-slate-300 rounded"></div>
                <div class="space-y-3">
                  <div class="grid grid-cols-3 gap-4">
                    <div class="h-2 bg-slate-300 rounded col-span-2"></div>
                    <div class="h-2 bg-slate-300 rounded col-span-1"></div>
                  </div>
                  <div class="h-2 bg-slate-300 rounded"></div>
                  <div class="h-2 bg-slate-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  
    if (postData.length === 0) {
      // No elements exist case
      return (
        <div>
          <p>No posts found.</p>
        </div>
      );
    }
  
    function timeAgo(timestamp) {
      // const currentDate = new Date();
      const targetDate = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date object
      return formatDistanceToNow(
        // "Fri Jan 13 2024 00:09:21 GMT+0530 (India Standard Time)",
        targetDate,
        { addSuffix: true }
      );
    }
  
    return (
      <>
        <div className="posts-page">
          {postData.map((post) => (
            <div
              key={post.postID}
              className="user-content flex gap-2 relative overflow-hidden p-4 custom-shadow rounded-2xl mt-8"
            >
              <div className="user-logo">
                <img
                  src=""
                  alt=""
                  className="w-10 h-10 rounded-full border border-slate-400"
                />
              </div>
              <div className="user-detail w-full">
                <div className="flex justify-between items-center px-4 pt-1 pb-3">
                  <p className="text-[1.2rem] font-medium text-slate-700">
                    {userDetail.username}
                  </p>
                  <p className="text-[0.7rem] text-slate-500">{timeAgo(post.date)}{" "}</p>
                </div>
                <p className="text-[0.8rem] pl-4 pr-8 text-slate-500">
                  {post.text}
                </p>
                <div className="w-10 h-10 bg-rose-400 absolute right-[-1.2rem] top-[40%] rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };
  
  export default Posts;
  