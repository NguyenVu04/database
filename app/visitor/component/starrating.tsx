import { FaStar } from "react-icons/fa";

const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <FaStar key={i} color={i <= Math.floor(rating) ? "gold" : "#ccc"} />
        );
    }
    return <div className="flex">{stars}</div>;
};

export default StarRating;