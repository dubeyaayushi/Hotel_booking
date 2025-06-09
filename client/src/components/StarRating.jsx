import React from 'react'
import { assets } from '../assets/assets'

const StarRating = ({rating = 4}) => {
return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {Array(5).fill('').map((_, index) => (
                    <img
                            key={index}
                            src={rating > index ? assets.starIconFilled : assets.starIconOutlined}
                            alt="star-icon"
                            className='w-4.5 h-4.5'
                            style={{ marginRight: index < 4 ? '4px' : 0 }}
                    />
            ))}
    </div>
)
}

export default StarRating