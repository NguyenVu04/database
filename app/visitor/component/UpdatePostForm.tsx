'use client';
import { Place } from "@/db/schema/place.schema";
import { searchPlace } from "@/lib/helper/seachPlaces";
import updatePost from "@/lib/helper/updatepost";
import { debounce } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState, ChangeEvent, useMemo, useEffect, FormEvent } from "react";
import { AiFillStar, AiOutlineStar, AiOutlineDelete, AiOutlinePicture, AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";

interface UpdatePostFormProps {
    postId: string;
    visitorId: string;
    onClose: () => void;
    currentPlaces: Place[];
    currentContent: string;
    currentImages?: string[];
    currentRatings: Record<string, number>;
}

export default function UpdatePostForm({
    postId,
    visitorId,
    onClose,
    currentPlaces,
    currentContent,
    currentImages,
    currentRatings
}: UpdatePostFormProps) {
    const [selectedPlaces, setSelectedPlaces] = useState<Place[]>(currentPlaces);
    const [ratings, setRatings] = useState<Record<string, number>>(currentRatings);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [places, setPlaces] = useState<Place[]>([]);
    const [content, setContent] = useState<string>(currentContent);
    const [images, setImages] = useState<File[]>([]);
    const [shownImages, setShownImages] = useState<string[] | undefined>(currentImages);

    const handlePlaceSelection = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(
            (option) => option.value
        );
        const selectedPlaces = places.filter((place) =>
            selectedOptions.includes(`${place.latitude},${place.longitude}`)
        );
        setSelectedPlaces((prevSelected) => [
            ...prevSelected,
            ...selectedPlaces.filter(
                (place) =>
                    !prevSelected.some(
                        (selectedPlace) =>
                            selectedPlace.latitude === place.latitude &&
                            selectedPlace.longitude === place.longitude
                    )
            ),
        ]);
        setRatings((prev) =>
            selectedPlaces.reduce((acc, place) => {
                if (!prev[`${place.latitude},${place.longitude}`]) acc[`${place.latitude},${place.longitude}`] = 0;
                return acc;
            }, prev)
        );
    };

    // Handle rating update
    const handleRating = (place: Place, rating: number) => {
        setRatings((prev) => ({
            ...prev,
            [`${place.latitude},${place.longitude}`]: rating,
        }));
    };

    const debouncedSearch = useMemo(
        () =>
            debounce((term: string) => {
                if (!term.trim()) return;

                searchPlace(term)
                    .then((data) => {
                        setPlaces(data);
                    })
                    .catch((error) => {
                        toast.error(error.message);
                    });
            }, 500),
        [] // No dependencies to ensure it's created only once
    );

    // Cleanup the debounce on unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    // Handle search input change
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        debouncedSearch(searchTerm);
    };

    // Handle removal of voted place
    const handleRemovePlace = (place: Place) => {
        setSelectedPlaces((prevSelected) => prevSelected.filter(
            (p) => p.latitude !== place.latitude || p.longitude !== place.longitude
        ));
        const newRatings = { ...ratings };
        delete newRatings[`${place.latitude},${place.longitude}`];
        setRatings(newRatings);
    };

    // Only filter places if there is a search term, and exclude already voted places
    const filteredPlaces = searchTerm
        ? places.filter(
            (place) =>
                `${place.name} ${place.address}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) &&
                !selectedPlaces.some(
                    (selectedPlace) =>
                        selectedPlace.latitude === place.latitude &&
                        selectedPlace.longitude === place.longitude
                )
        )
        : []; // No places to display when searchTerm is empty

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!visitorId) {
            redirect("/signin");
        }
        try {
            await updatePost(
                postId,
                visitorId,
                {
                    images: shownImages
                },
                {
                    content: content,
                    images: images,
                },
                selectedPlaces.map((place) => {
                    const starRating = ratings[`${place.latitude},${place.longitude}`];
                    return starRating ? {
                        longitude: Number(place.longitude),
                        latitude: Number(place.latitude),
                        star: starRating
                    } : null;
                }).filter((place) => place !== null))
            window.location.reload();
        } catch (error) {
            toast.error(error as string);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl font-inter max-h-[80vh] overflow-y-auto flex flex-col relative">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Create New Tourism Post</h2>
                <form onSubmit={handleFormSubmit} className="flex flex-col flex-grow">
                    <div className="mb-6">
                        <label className="text-xl font-medium text-gray-700 flex items-center">
                            <AiOutlineSearch className="mr-3 text-gray-600 text-xl" />
                            Post Content
                        </label>
                        <textarea
                            required
                            title="content"
                            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg text-gray-900 p-3"
                            placeholder="Write your post here..."
                            rows={4}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mb-6">
                        <label className="text-xl font-medium text-gray-700 flex items-center">
                            <AiOutlinePicture className="mr-3 text-gray-600 text-xl" />
                            Upload Images
                        </label>
                        <input
                            title="images"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(event) => {
                                if (event.target.files) {
                                    setImages((prev) => [...prev, ...Array.from(event.target.files as FileList)]);
                                }
                            }}
                            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <ul className="mt-2 flex flex-wrap">
                            {shownImages &&
                                shownImages.map((image, index) => (
                                    <li key={index} className="w-full flex justify-between p-4 mb-4 rounded-lg bg-gray-100">
                                        <Image src={image} alt="image" width={32} height={32} />
                                        <button
                                            title="remove image"
                                            type="button"
                                            onClick={() => setShownImages(shownImages.filter((_, i) => i !== index))}
                                            className="text-red-500"
                                        >
                                            <AiOutlineDelete size={24} />
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                        <ul className="mt-2 flex flex-wrap">
                            {
                                images.map((image, index) => (
                                    <li key={index} className="w-full flex justify-between p-4 mb-4 rounded-lg bg-gray-100">
                                        <Link href={URL.createObjectURL(image)} target="_blank">
                                            <p className="text-black">{image.name}</p>
                                        </Link>
                                        <button
                                            title="remove image"
                                            type="button"
                                            onClick={() => setImages(images.filter((_, i) => i !== index))}
                                            className="text-red-500"
                                        >
                                            <AiOutlineDelete size={24} />
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className="mb-6">
                        <label className="text-xl font-medium text-gray-700 flex items-center">
                            <AiOutlineSearch className="mr-3 text-gray-600 text-xl" />
                            Search Places
                        </label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg text-gray-900 p-3"
                            placeholder="Search for places"
                        />
                        <div className="mt-4">
                            <select
                                title="places"
                                multiple
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg text-gray-900 p-3"
                                onChange={handlePlaceSelection}
                            >
                                {filteredPlaces.map((place) => (
                                    <option key={`${place.latitude},${place.longitude}`} value={`${place.latitude},${place.longitude}`}>
                                        {place.name} - {place.address}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {selectedPlaces.length > 0 && (
                        <div className="mb-6 flex-grow overflow-y-auto">
                            <h3 className="text-xl font-medium text-gray-900">Voted Places</h3>
                            <div className="max-h-60 overflow-y-auto mt-4">
                                {selectedPlaces.map((place) => (
                                    <div key={`${place.latitude},${place.longitude}`} className="flex items-center mt-4">
                                        <span className="w-32 text-gray-900 text-lg">{place.name} - {place.address}</span>
                                        <div className="flex space-x-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => handleRating(place, star)}
                                                    className="text-yellow-500 text-xl"
                                                >
                                                    {ratings[`${place.latitude},${place.longitude}`] >= star ? (
                                                        <AiFillStar />
                                                    ) : (
                                                        <AiOutlineStar />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                        <span className="ml-4 text-gray-600">
                                            Rating: {ratings[`${place.latitude},${place.longitude}`] ?? 0} / 5
                                        </span>
                                        <button
                                            title="remove"
                                            type="button"
                                            onClick={() => handleRemovePlace(place)}
                                            className="ml-4 text-red-500 hover:text-red-700 text-xl"
                                        >
                                            <AiOutlineDelete />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-6 py-3 rounded-md text-lg hover:bg-gray-600"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-600"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}