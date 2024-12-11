'use client';
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaEllipsisV } from "react-icons/fa";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import findAllPosts from "@/lib/helper/findallposts";
import { BounceLoader } from "react-spinners";
import { Post } from "@/lib/dao/PostDao";
import Link from "next/link";
import deletePost from "@/lib/helper/deletepost";
import StarRating from "./component/starrating";
import loginIsRequired, { Session } from "../api/auth/Session";
import { UserRole } from "@/lib/helper/userrole";
import reportPost from "@/lib/helper/reportpost";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { redirect } from "next/navigation";
import getPostComments from "@/lib/helper/getpostcomments";
import createComment from "@/lib/helper/createComment";
import UpdatePostForm from "./component/UpdatePostForm";

const HomePage = () => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        loginIsRequired(true, UserRole.visitor)
            .then((res) => {
                setSession(res);
            })
    }, []);

    const [posts, setPosts] = useState<Post[] | null>(null); // Explicit typing here();
    const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({}); // Explicit typing here

    useEffect(() => {
        findAllPosts(1, 10)//TODO: Add paging later
            .then((res) => {
                setPosts(res);
            });
    }, []);

    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const [updatedPost, setUpdatedPost] = useState<Post | null>(null);
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

    const handleReportPost = (postId: string, visitorId: string) => {
        reportPost(visitorId, postId, session?.id as string)
            .then((res) => {
                if (res) {
                    toast.success('Reported successfully', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    })
                } else {
                    toast.info('You have already reported this post', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    })
                }
            })
        setMenuVisible(false); // Close the menu after action
    };

    const handleUpdatePost = (post: Post) => {
        setUpdatedPost(post);
    }

    const handleAddComment = async (postId: string, visitorId: string) => {
        if (!session || !session.id || posts === null) {
            redirect("/signin");
        }

        const content = commentInputs[postId];
        if (!content) return;

        await createComment(postId, visitorId, content, session.id);

        const updatedPosts = await Promise.all(
            posts.map(async (post) => {
                if (post.id === postId && post.visitor === visitorId) {
                    return { ...post, comments: await getPostComments(postId, visitorId) };
                }
                return post;
            })
        );
        setPosts(updatedPosts); // Update state with the resolved posts

        setCommentInputs((prev) => ({ ...prev, [postId]: "" }));

        toast.success('Comment added successfully', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
    };

    const handleInputChange = (postId: string, value: string) => {
        setCommentInputs((prev) => ({ ...prev, [postId]: value }));
    };

    if (session === null || posts === null) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <BounceLoader color="red" loading={true} size={32} />
            </div>
        );
    }

    return (
        <div className="p-4">
            <ToastContainer />
            {
                updatedPost &&
                <UpdatePostForm
                    onClose={() => {
                        setUpdatedPost(null);
                        window.location.reload();
                    }}
                    postId={updatedPost.id}
                    visitorId={updatedPost.visitor}
                    currentPlaces={updatedPost.places
                        .map((place) => {
                            return {
                                latitude: String(place.latitude),
                                longtitude: String(place.longtitude),
                                name: place.place_name,
                                address: place.place_address
                            }
                        })}
                    currentContent={updatedPost.content.content}
                    currentImages={updatedPost.content.mediaUrl}
                    currentRatings={updatedPost.places
                        .map((place) => {
                            return {
                                [`${place.latitude},${place.longtitude}`]: place.star
                            }
                        })
                        .reduce((acc, star) => {
                            return { ...acc, ...star }
                        })}
                />
            }
            {posts.map((post) => (
                <div key={post.id} className="mb-8 border-b pb-6 relative">
                    <div className="absolute top-2 right-2 cursor-pointer" onClick={(e) => {
                        e.nativeEvent.stopImmediatePropagation();
                        setSelectedPostId(post.id);
                        if (selectedPostId === post.id) {
                            setMenuVisible((menuVisible) => !menuVisible); // Show the menu
                        } else {
                            setMenuVisible(true);
                        }
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
                                {
                                    session.id === post.visitor &&
                                    (<li
                                        className="cursor-pointer p-2 hover:bg-gray-100 rounded-t-lg"
                                        onClick={() => handleDeletePost(post.id, post.visitor)}
                                    >
                                        Delete Post
                                    </li>)
                                }
                                {
                                    session.id !== post.visitor &&
                                    (<li
                                        className="cursor-pointer p-2 hover:bg-gray-100"
                                        onClick={() => handleReportPost(post.id, post.visitor)}
                                    >
                                        Report Post
                                    </li>)
                                }
                                {
                                    session.id === post.visitor &&
                                    (<li
                                        className="cursor-pointer p-2 hover:bg-gray-100 rounded-b-lg"
                                        onClick={() => handleUpdatePost(post)}
                                    >
                                        Update Post
                                    </li>)
                                }
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
                                <div key={comment.id} className="flex items-center space-x-3">
                                    <Image
                                        src={"/anonymous.png"}
                                        alt="avatar"
                                        className="rounded-full"
                                        width={32}
                                        height={32}
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
                                onClick={() => handleAddComment(post.id, post.visitor)}
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