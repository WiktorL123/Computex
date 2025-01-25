import React, {useState} from "react";
import {StarIcon as SolidStar} from "@heroicons/react/solid";
import {StarIcon as OutlineStar} from "@heroicons/react/outline";

export default function StarRating({rating, setRating}) {
    const [hover, setHover] = useState(0)

    return (
        <div className={'flex space-x-1'}>
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type={'button'}
                    className={'focus:outline-none'}
                    onClick={()=>setRating(star)}
                    onMouseEnter={()=>setHover(star)}
                    onMouseLeave={()=>setHover(0)}
                >
                    {star <=(hover || rating) ? (
                        <SolidStar className={'h-8 w-8 text-yellow-500'}/>
                    ) :
                        (
                        <OutlineStar className={'h-8 w-8 text-gray-500'}/>
                    )}


                </button>
            ))}
        </div>
    )
}
