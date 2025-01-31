'use client';

import React, { useEffect, useState } from "react";
import { useProduct } from "@/app/context/ProductContext";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";
import StarRating from "@/app/components/StarRating";
import { useUser } from "@/app/context/UserContext";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { useUserCart } from "@/app/context/UserCartContext";
import { useBrowserCart } from "@/app/context/BrowserCartContext";

export default function ProductPage() {
    const { id } = useParams();
    const {
        product,
        fetchProductById,
        error: productError,
        loading,
        setLoading,
        setError
    } = useProduct();
    const { user } = useUser();
    const { addToUserCart } = useUserCart();
    const { addToBrowserCart } = useBrowserCart();

    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [newReview, setNewReview] = useState({ rating: "", comment: "" });
    const [error, setReviewError] = useState(null);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:4002/api/reviews/product/${id}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Nie udało się pobrać recenzji");
            }
            const data = await response.json();
            setAverageRating(data.averageRating);
            setReviews(data.reviews);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4002/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    product_id: id,
                    rating: newReview.rating,
                    comment: newReview.comment,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setReviewError(errorData.message);
                toast.error("Nie udało się dodać recenzji");
                return;
            }

            setNewReview({ rating: "", comment: "" });
            fetchReviews();
            toast.success("Dodano recenzję!");
        } catch (error) {
            toast.error("Nie udało się dodać recenzji. Spróbuj ponownie.");
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            const response = await fetch(`http://localhost:4002/api/reviews/${reviewId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(`Nie udało się usunąć recenzji: ${errorData.message}`);
                return;
            }

            toast.success("Recenzja została usunięta");
            fetchReviews();
        } catch (error) {
            toast.error("Wystąpił błąd podczas usuwania recenzji. Spróbuj ponownie.");
        }
    };

    const handleAddToCart = () => {
        const quantity = 1;
        if (user) {
            addToUserCart(id, quantity);
        } else {
            addToBrowserCart(id, quantity);
        }
    };

    useEffect(() => {
        fetchProductById(id);
    }, []);

    useEffect(() => {
        fetchReviews();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#2b2d30" size={50} />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
                <img
                    src={product?.images?.[0] || "/placeholder-image.png"}
                    alt={product?.name}
                    className="w-full md:w-1/3 object-contain rounded shadow-lg"
                />

                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">{product?.name}</h1>
                    <p className="text-gray-400">{product?.description}</p>
                    <p className="text-lg font-semibold text-green-600">
                        Cena: {product?.price} PLN
                    </p>
                    <p className="text-gray-400">Dostępność: {product?.stock} sztuk</p>
                    <div className="text-yellow-500 text-lg">
                        Średnia ocena: {averageRating}/5
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Dodaj do koszyka
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Recenzje</h2>
                {reviews.length === 0 ? (
                    <p className="text-gray-400">Brak recenzji dla tego produktu.</p>
                ) : (
                    reviews.map((review) => (
                        <div
                            key={review._id}
                            className="border-b border-gray-500 py-4 flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-semibold">
                                    {review.user_id?.name} {review.user_id?.second_name}
                                </h3>
                                <p className="text-yellow-500">Ocena: {review.rating}/5</p>
                                <p className="text-gray-400">{review.comment}</p>
                            </div>
                            {user && user.userId === review.user_id?._id && (
                                <button
                                    onClick={() => handleDeleteReview(review._id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 size={20} />
                                </button>
                            )}
                        </div>
                    ))
                )}

                <form
                    onSubmit={handleReviewSubmit}
                    className="mt-6 p-4 border rounded shadow-lg"
                >
                    <h3 className="text-lg font-bold mb-2">Dodaj recenzję</h3>
                    <label className="block mb-2">
                        Ocena:
                        <StarRating
                            rating={newReview.rating}
                            setRating={(star) => setNewReview({ ...newReview, rating: star })}
                        />
                    </label>
                    <label className="block mb-4">
                        Komentarz:
                        <textarea
                            className="text-gray-500 w-full p-2 border rounded mt-1"
                            rows="3"
                            value={newReview.comment}
                            onChange={(e) =>
                                setNewReview({ ...newReview, comment: e.target.value })
                            }
                        ></textarea>
                    </label>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Dodaj recenzję
                    </button>
                </form>
            </div>
        </div>
    );
}