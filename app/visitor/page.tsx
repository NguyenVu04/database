'use client';
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaEllipsisV, FaStar } from "react-icons/fa";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import findAllPosts from "@/lib/helper/findallposts";
import { BounceLoader } from "react-spinners";
import { Post } from "@/lib/dao/PostDao";
import Link from "next/link";
import deletePost from "@/lib/helper/deletepost";

// const initialPosts = [
//     {
//         id: 1,
//         user: {
//             name: "Alice Johnson",
//             avatar: "/bg_login.jpg",
//         },
//         title: "Discover Hidden Gems in Asia",
//         description: "A journey through some of the most picturesque destinations in Asia.",
//         images: ["/bg_login.jpg", "/bg_login.jpg", "/bg_login.jpg"],
//         places: [
//             { name: "Bali, Indonesia", rating: 4.5 },
//             { name: "Kyoto, Japan", rating: 4.8 },
//             { name: "Chiang Mai, Thailand", rating: 4.7 },
//         ],
//         comments: [
//             {
//                 id: 1,
//                 user: {
//                     name: "Mark Lee",
//                     avatar: "/bg_login.jpg",
//                 },
//                 content: "Bali is amazing! Highly recommend visiting during the summer.",
//             },
//         ],
//     },
// ];

const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <FaStar key={i} color={i <= Math.floor(rating) ? "gold" : "#ccc"} />
        );
    }
    return <div className="flex">{stars}</div>;
};

const HomePage = () => {
    const [posts, setPosts] = useState<Post[] | null>(null); // Explicit typing here();
    const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({}); // Explicit typing here

    useEffect(() => {
        findAllPosts(1, 10)//TODO: Add paging later
            .then((res) => {
                setPosts(res);
            });
    }, []);

    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close the menu if the user clicks outside of it
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuVisible(false);
        }
    };

    // Attach event listener to close the menu when clicking outside
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleDeletePost = (postId: string, userId: string) => {
        deletePost(postId, userId)
            .then(() => {
                findAllPosts(1, 10)//TODO: Add paging later
                    .then((res) => {
                        setPosts(res);
                    });
            })
            .catch((err) => {
                alert(err);
            })
    };

    const handleReportPost = (postId: string) => {
        alert(`Report Post with ID: ${postId}`);
        setMenuVisible(false); // Close the menu after action
    };
    const handleAddComment = (postId: string) => {
        console.log(`Add Comment to Post with ID: ${postId}`);
        // const content = commentInputs[postId];
        // if (!content) return;

        // const newComment = {
        //     id: Date.now(),
        //     user: {
        //         name: "New User", // Replace with actual logged-in user's name
        //         avatar: "/bg_login.jpg",
        //     },
        //     content,
        // };

        // setPosts((prevPosts) =>
        //     prevPosts.map((post) =>
        //         post.id === postId
        //             ? { ...post, comments: [...post.comments, newComment] }
        //             : post
        //     )
        // );

        // setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    };

    const handleInputChange = (postId: string, value: string) => {
        setCommentInputs((prev) => ({ ...prev, [postId]: value }));
    };

    if (posts === null) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <BounceLoader color="red" loading={true} size={64} />
            </div>
        );
    }

    return (
        <div className="p-4">
            {posts.map((post) => (
                <div key={post.id} className="mb-8 border-b pb-6 relative">
                    <div className="absolute top-2 right-2 cursor-pointer" onClick={(e) => {
                        e.nativeEvent.stopImmediatePropagation();
                        setSelectedPostId(post.id);
                        setMenuVisible((menuVisible) => !menuVisible); // Show the menu
                    }}>
                        <FaEllipsisV size={20} />
                    </div>

                    {/* Popup Menu */}
                    {(selectedPostId === post.id && menuVisible) && (
                        <div
                            ref={menuRef}
                            className="absolute top-8 right-2 bg-white shadow-lg rounded-lg w-40 z-10"
                        >
                            <ul className="space-y-2 text-sm">
                                <li
                                    className="cursor-pointer p-2 hover:bg-gray-100"
                                    onClick={() => handleDeletePost(post.id, post.visitor)}
                                >
                                    Delete Post
                                </li>
                                <li
                                    className="cursor-pointer p-2 hover:bg-gray-100"
                                    onClick={() => handleReportPost(post.id)}
                                >
                                    Report Post
                                </li>
                            </ul>
                        </div>
                    )}
                    {/* User Info */}
                    <div className="flex items-center mb-4">
                        <Image
                            src={"/anonymous.png"}
                            alt={`avatar`}
                            className="rounded-full mr-3"
                            width={32}
                            height={32}
                        />
                        <p className="text-lg font-medium">{post.username}</p>
                    </div>

                    {/* Post Content */}
                    <p className="text-gray-700 mb-3">{post.content.content}</p>

                    {/* Image Swiper */}
                    {
                        post.content.mediaUrl && (
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={1}
                                loop
                                modules={[Autoplay]}
                                autoplay={{
                                    delay: 5000, // 3 seconds delay
                                    disableOnInteraction: false, // Keep autoplay even after user interaction
                                }}>
                                {post.content.mediaUrl.map((img, idx) => (
                                    <SwiperSlide key={idx}>
                                        <Image
                                            src={img}
                                            alt={`Slide ${idx + 1}`}
                                            className="object-cover"
                                            layout="responsive"
                                            width={300}
                                            height={200}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )
                    }

                    {/* Places and Ratings */}
                    <div className="mt-4">
                        <strong>Places:</strong>
                        <ul className="list-disc ml-5 mt-2">
                            {post.places.map((place, idx) => (
                                <li key={idx} className="mb-2">
                                    <Link href={`https://www.google.com/maps/search/?api=1&query=${place.latitude}%2C${place.longtitude}`} target="_blank" className="hover:underline hover:text-blue-500">
                                        <span className="font-medium">{`${place.place_name}, ${place.place_address}:`}</span>
                                    </Link>
                                    <StarRating rating={place.star} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-6">
                        <strong>Comments:</strong>
                        <div className="mt-2 space-y-4">
                            {post.comments.map((comment) => (
                                <div key={comment.id} className="flex items-start space-x-3">
                                    <Image
                                        src={"/anonymous.png"}
                                        alt="avatar"
                                        className="rounded-full"
                                        width={16}
                                        height={16}
                                    />
                                    <div>
                                        <p className="font-medium">{comment.sender_name}</p>
                                        <p className="text-gray-700">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Comment */}
                        <div className="mt-4 flex items-center space-x-3">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={commentInputs[post.id] || ""}
                                onChange={(e) =>
                                    handleInputChange(post.id, e.target.value)
                                }
                                className="flex-1 border rounded px-3 py-2"
                            />
                            <button
                                type="button"
                                onClick={() => handleAddComment(post.id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomePage;