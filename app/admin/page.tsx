'use client';
import { useEffect, useRef, useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { FaBars, FaTrashAlt, FaPlus, FaGlobe, FaUserCircle, FaEllipsisV } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import getReportedPosts from '@/lib/helper/getreportedposts';
import { PostReport } from '@/lib/dao/AdminDao';
import { Autoplay } from 'swiper/modules';
import StarRating from '../visitor/component/starrating';

const AdminPage = () => {
  const [open, setOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [reportedPost, setReportedPost] = useState<PostReport[] | null>(null);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getReportedPosts()
      .then((res) => {
        setReportedPost(res);
      });
  }, []);

  const handleDeletePost = (postId: string, userId: string) => {
    // Handle post deletion logic here
    console.log('Deleting post with ID:', postId);
    console.log('Deleting post by user ID:', userId);
  };

  const admins = [
    { id: 1, name: 'Admin 1' },
    { id: 2, name: 'Admin 2' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Collapsible Sidebar */}
      <Collapsible.Root open={open} onOpenChange={setOpen} className="flex">
        <Collapsible.Trigger className="bg-blue-600 text-white p-2">
          <FaBars />
        </Collapsible.Trigger>

        <Collapsible.Content
          className="bg-white shadow-md CollapsibleContent"
        >
          <div className="p-4">
            <h3 className="text-sm font-bold">Admin List</h3>
            <ul>
              {admins.map((admin) => (
                <li
                  key={admin.id}
                  className="flex justify-between items-center bg-gray-200 p-2 rounded mt-2 text-nowrap"
                >
                  {admin.name}
                  <button type="button" title='Delete' className="text-red-500 hover:text-red-700 ml-10">
                    <FaTrashAlt />
                  </button>
                </li>
              ))}
            </ul>
            <button className="w-full mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-nowrap">
              <FaPlus className="inline mr-2" /> Add Admin
            </button>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>

      {/* Main Content */}
      <div>
        {/* Navbar */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center fixed w-full z-10">
          <Link href="/">
            <FaGlobe size={30} /> {/* Globe Icon */}
          </Link>
          <div className="flex items-center space-x-4">
            <FaUserCircle size={30} onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="cursor-pointer hover:scale-125 transition duration-1000" /> {/* Profile Icon */}
          </div>
          {isDropdownOpen && (
            <div className="absolute top-12 right-12 bg-white text-black shadow-lg rounded-lg z-10 w-32">
              <ul>
                <li className="hover:bg-gray-200 hover:text-blue-500 rounded-t-lg p-2 cursor-pointer" onClick={() => redirect('/profile/visitor')}>
                  Profile
                </li>
                <li className="hover:bg-gray-200 hover:text-red-500 rounded-b-lg p-2 cursor-pointer" onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Reported Posts */}
        <div className="p-4 mt-4">
          <h2 className="text-xl font-bold mb-4">Reported Posts</h2>
          <div className="space-y-4">
            {reportedPost &&
              reportedPost.map((post) => (
                <div key={post.post} className="mb-8 border-b pb-6 relative">
                  <div className="absolute top-2 right-2 cursor-pointer" onClick={(e) => {
                    e.nativeEvent.stopImmediatePropagation();
                    setSelectedPostId(post.post);
                    if (selectedPostId === post.post) {
                      setMenuVisible((menuVisible) => !menuVisible); // Show the menu
                    } else {
                      setMenuVisible(true);
                    }
                  }}>
                    <FaEllipsisV size={20} />
                  </div>

                  {/* Popup Menu */}
                  {(selectedPostId === post.post && menuVisible) && (
                    <div
                      ref={menuRef}
                      className="absolute top-8 right-2 bg-white shadow-lg rounded-lg w-40 z-10"
                    >
                      <ul className="space-y-2 text-sm">
                          <li
                            className="cursor-pointer p-2 hover:bg-gray-100 rounded-t-lg"
                            onClick={() => handleDeletePost(post.post, post.visitor)}
                          >
                            Delete Post
                          </li>
                        
                          <li
                            className="cursor-pointer p-2 hover:bg-gray-100"
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
                    <p className="text-lg font-medium">{post.visitor}</p>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-700 mb-3 text-justify">{post.content.content}</p>

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
                          <Link href={`https://www.google.com/maps/search/?api=1&query=${place.latitude}%2C${place.longitude}`} target="_blank" className="hover:underline hover:text-blue-500">
                            <span className="font-medium">{`${place.place_name}, ${place.place_address}:`}</span>
                          </Link>
                          <StarRating rating={place.star} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;