'use client';
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaEllipsisV, FaGlobe, FaStar, FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { Autoplay } from "swiper/modules";

const initialPosts = [
    {
        id: 1,
        user: {
            name: "Alice Johnson",
            avatar: "/bg_login.jpg",
        },
        title: "Discover Hidden Gems in Asia",
        description: "A journey through some of the most picturesque destinations in Asia.",
        images: ["/bg_login.jpg", "/bg_login.jpg", "/bg_login.jpg"],
        places: [
            { name: "Bali, Indonesia", rating: 4.5 },
            { name: "Kyoto, Japan", rating: 4.8 },
            { name: "Chiang Mai, Thailand", rating: 4.7 },
        ],
        comments: [
            {
                id: 1,
                user: {
                    name: "Mark Lee",
                    avatar: "/bg_login.jpg",
                },
                content: "Bali is amazing! Highly recommend visiting during the summer.",
            },
        ],
    },
];

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
    const [posts, setPosts] = useState(initialPosts);
    const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({}); // Explicit typing here

    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close the menu if the user clicks outside of it
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node) && menuRef.current.getAttribute("display") === "block") {
            setMenuVisible(false);
            menuRef.current.setAttribute("display", "none");
        }
    };

    // Attach event listener to close the menu when clicking outside
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleDeletePost = (postId: number) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        setMenuVisible(false); // Close the menu after action
    };

    const handleReportPost = (postId: number) => {
        alert(`Report Post with ID: ${postId}`);
        setMenuVisible(false); // Close the menu after action
    };
    const handleAddComment = (postId: number) => {
        const content = commentInputs[postId];
        if (!content) return;

        const newComment = {
            id: Date.now(),
            user: {
                name: "New User", // Replace with actual logged-in user's name
                avatar: "/bg_login.jpg",
            },
            content,
        };

        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? { ...post, comments: [...post.comments, newComment] }
                    : post
            )
        );

        setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    };

    const handleInputChange = (postId: number, value: string) => {
        setCommentInputs((prev) => ({ ...prev, [postId]: value }));
    };
    
    return (
        <div>
            {/* Top Bar with Gradient and Profile Icon */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center">
                <FaGlobe size={30} /> {/* Globe Icon */}
                <div className="flex items-center space-x-4">
                    <button className="bg-green-500 px-4 py-2 rounded text-white">
                        Create New Post
                    </button>
                    <FaUserCircle size={30} /> {/* Profile Icon */}
                </div>
            </div>

            {/* Posts Section */}
            <div className="p-4">
                {posts.map((post) => (
                    <div key={post.id} className="mb-8 border-b pb-6 relative">
                        <div className="absolute top-2 right-2 cursor-pointer" onClick={(e) => {
                                    e.stopPropagation(); // Prevent event from propagating
                                    setSelectedPostId(post.id);
                                    setMenuVisible(true); // Show the menu
                                }}>
                            <FaEllipsisV size={20}/>
                        </div>

                        {/* Popup Menu */}
                        {(selectedPostId === post.id && menuVisible) && (
                            <div
                                ref={menuRef}
                                className={`absolute top-8 right-2 bg-white shadow-lg rounded-lg w-40 ${menuVisible ? "block" : "hidden"}`}
                            >
                                <ul className="space-y-2 text-sm">
                                    <li
                                        className="cursor-pointer p-2 hover:bg-gray-100"
                                        onClick={() => handleDeletePost(post.id)}
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
                                src={post.user.avatar}
                                alt={`${post.user.name}'s avatar`}
                                className="rounded-full mr-3"
                                width={12}
                                height={12}
                            />
                            <p className="text-lg font-medium">{post.user.name}</p>
                        </div>

                        {/* Post Content */}
                        <h2 className="text-2xl font-semibold">{post.title}</h2>
                        <p className="text-gray-700 mb-3">{post.description}</p>

                        {/* Image Swiper */}
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            loop
                            modules={[Autoplay]}
                            autoplay={{
                                delay: 5000, // 3 seconds delay
                                disableOnInteraction: false, // Keep autoplay even after user interaction
                            }}>
                            {post.images.map((img, idx) => (
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

                        {/* Places and Ratings */}
                        <div className="mt-4">
                            <strong>Places:</strong>
                            <ul className="list-disc ml-5 mt-2">
                                {post.places.map((place, idx) => (
                                    <li key={idx} className="mb-2">
                                        <span className="font-medium">{place.name}</span> -
                                        <span className="ml-2">Rating:</span>
                                        <StarRating rating={place.rating} />
                                        <span className="ml-2 text-gray-600">({place.rating}/5)</span>
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
                                            src={comment.user.avatar}
                                            alt={`${comment.user.name}'s avatar`}
                                            className="rounded-full"
                                            width={10}
                                            height={10}
                                        />
                                        <div>
                                            <p className="font-medium">{comment.user.name}</p>
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
        </div>
    );
};

export default HomePage;