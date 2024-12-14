'use client';
import { useEffect, useRef, useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { FaBars, FaTrashAlt, FaPlus, FaGlobe, FaUserCircle, FaEllipsisV, FaTimes } from 'react-icons/fa';
import { CgDanger } from "react-icons/cg";
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
import deletePost from '@/lib/helper/deletepost';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import deletePostReports from '@/lib/helper/deletepostreports';
import { Admin } from '@/db/schema/admin.schema';
import getAdmins from '@/lib/helper/getadmins';
import deleteAdmin from '@/lib/helper/deleteadmin';
import { createAdmin } from '@/lib/helper/createadmin';
import loginIsRequired, { Session } from '../api/auth/Session';
import { BounceLoader } from 'react-spinners';

const AdminPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [reportedPosts, setReportedPosts] = useState<PostReport[] | null>(null);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [admins, setAdmins] = useState<Omit<Admin, 'password'>[] | null>(null);
  const [password, setPassword] = useState<string>('');
  const [isAdminFormOpen, setIsAdminFormOpen] = useState<boolean>(false);

  useEffect(() => {
    loginIsRequired(true, "admin")
      .then((res) => {
        setSession(res);
      })
      .catch(() => {
        redirect('/signin/admin');
      });
  }, []);

  const handleDeleteAdmin = (id: string) => {
    deleteAdmin(id)
      .then(() => {
        toast.success('Admin deleted successfully', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        getAdmins()
          .then((res) => {
            setAdmins(res);
          });
      })
      .catch(() => {
        toast.error('Failed to delete admin', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  const handleCreateAdmin = () => {
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    createAdmin(password)
      .then(() => {
        toast.success('Admin created successfully', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        getAdmins()
          .then((res) => {
            setAdmins(res);
          });
      })
      .catch(() => {
        toast.error('Failed to create admin', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
    setPassword('');
    setIsAdminFormOpen(false);
  };

  useEffect(() => {
    getReportedPosts()
      .then((res) => {
        setReportedPosts(res);
      });
  }, []);

  const handleDeletePost = (postId: string, userId: string) => {
    // Handle post deletion logic here
    deletePost(postId, userId)
      .then(() => {
        toast.success('Post deleted successfully', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        getReportedPosts()
          .then((res) => {
            setReportedPosts(res);
          });
      })
      .catch(() => {
        toast.error('Failed to delete post', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

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

  const handleIgnoreReports = (postId: string, visitorId: string) => {
    deletePostReports(postId, visitorId)
      .then(() => {
        toast.success('Reports ignored successfully', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        getReportedPosts()
          .then((res) => {
            setReportedPosts(res);
          });
      })
      .catch(() => {
        toast.error('Failed to ignore reports', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
    setMenuVisible(false); // Close the menu after action
  };

  useEffect(() => {
    getAdmins()
      .then((res) => {
        setAdmins(res);
      })
  }, []);

  if (session === null) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <BounceLoader color="red" loading={true} size={32} />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      {/* Collapsible Sidebar */}
      <Collapsible.Root open={open} onOpenChange={setOpen} className="flex fixed top-0 left-0 max-h-screen overflow-y-scroll z-20 no-scrollbar">
        <Collapsible.Trigger className="bg-blue-600 text-white p-2 fixed top-0 left-0 h-screen">
          <FaBars />
        </Collapsible.Trigger>

        <Collapsible.Content
          className="bg-white shadow-md w-64 h-full CollapsibleContent ml-7"
        >
          <div className="p-4">
            <h3 className="text-sm font-bold">Admin List</h3>
            <ul>
              {admins &&
                admins.map((admin) => (
                  <li
                    key={admin.id}
                    className="flex justify-between items-center bg-gray-200 p-2 rounded mt-2 text-nowrap"
                  >
                    {admin.id}
                    <button disabled={admin.id === session?.id} type="button" title='Delete' className="text-red-500 hover:text-red-700 ml-10 disabled:cursor-not-allowed disabled:text-gray-400" onClick={() => handleDeleteAdmin(admin.id)}>
                      <FaTrashAlt />
                    </button>
                  </li>
                ))}
            </ul>
            <button type='button' className="w-full mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-nowrap"
              onClick={() => setIsAdminFormOpen(true)}>
              <FaPlus className="inline mr-2" /> Add Admin
            </button>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>

      {/* Main Content */}
      <div className='ml-8'>
        {/* Navbar */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center fixed w-full z-10 top-0">
          <Link href="/">
            <FaGlobe size={30} /> {/* Globe Icon */}
          </Link>
          <div className="flex items-center space-x-4">
            <FaUserCircle size={30} onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="cursor-pointer hover:scale-125 transition duration-1000 mr-8" /> {/* Profile Icon */}
          </div>
          {isDropdownOpen && (
            <div className="absolute top-12 right-16 bg-white text-black shadow-lg rounded-lg z-10 w-32">
              <ul>
                <li className="hover:bg-gray-200 hover:text-red-500 rounded-lg p-2 cursor-pointer" onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Reported Posts */}
        <div className="p-4 mt-16">
          <h2 className="text-xl font-bold mb-4 text-red-500 uppercase">Reported Posts</h2>
          <div className="space-y-4">
            {reportedPosts &&
              reportedPosts.map((post) => (
                <div key={post.postId} className="mb-8 border-b pb-6 relative">
                  <div className="text-base mb-2 text-nowrap bg-red-500 w-fit p-2 rounded-full text-white mr-0 ml-auto flex justify-center items-center gap-2">
                    <CgDanger className='inline' size={20} /> Number of reports: {post.countReports}
                  </div>
                  <div className="absolute top-14 right-2 cursor-pointer" onClick={(e) => {
                    e.nativeEvent.stopImmediatePropagation();
                    setSelectedPostId(post.postId);
                    if (selectedPostId === post.postId) {
                      setMenuVisible((menuVisible) => !menuVisible); // Show the menu
                    } else {
                      setMenuVisible(true);
                    }
                  }}>
                    <FaEllipsisV size={20} />
                  </div>

                  {/* Popup Menu */}
                  {(selectedPostId === post.postId && menuVisible) && (
                    <div
                      ref={menuRef}
                      className="absolute top-20 right-6 bg-white shadow-lg rounded-lg w-40 z-10"
                    >
                      <ul className="space-y-2 text-sm">
                        <li
                          className="cursor-pointer p-2 hover:bg-gray-100 rounded-t-lg"
                          onClick={() => handleDeletePost(post.postId, post.visitorId)}
                        >
                          Delete Post
                        </li>

                        <li
                          className="cursor-pointer p-2 hover:bg-gray-100"
                          onClick={() => handleIgnoreReports(post.postId, post.visitorId)}
                        >
                          Ignore Reports
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
                    <p className="text-lg font-medium">{post.userName}</p>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-700 mb-3 text-justify">{post.postContent.content}</p>

                  {/* Image Swiper */}
                  {
                    post.postContent.mediaUrl && (
                      <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        loop
                        modules={[Autoplay]}
                        autoplay={{
                          delay: 5000, // 3 seconds delay
                          disableOnInteraction: false, // Keep autoplay even after user interaction
                        }}>
                        {post.postContent.mediaUrl.map((img, idx) => (
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
      {
        isAdminFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-80 p-6 rounded shadow-lg relative">
              <button
                title='Close'
                type='button'
                onClick={() => {
                  setIsAdminFormOpen(false);
                  setPassword('');
                }}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={18} />
              </button>
              <h2 className="text-xl font-bold mb-4">Create New Admin</h2>
              <form onSubmit={() => handleCreateAdmin()} className="space-y-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Create Admin
                </button>
              </form>
            </div>
          </div>
        )
      }
    </>
  );
};

export default AdminPage;