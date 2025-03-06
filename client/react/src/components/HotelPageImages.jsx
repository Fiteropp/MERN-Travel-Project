import {SlideshowLightbox, initLightboxJS} from 'lightbox.js-react'
import React from 'react'

import '../styles/HotelImages.css'

export default function HotelImages({hotelDetails}) {
  return (
    <div className='main-img-lightbox-cont'>
        <div className='main-img-cont'>
            <SlideshowLightbox className='lightbox-main-img-cont' showThumbnails={true}>
                <img className='main-img' src={hotelDetails.image}/>
                </SlideshowLightbox>
        </div>
        <div className='additional-img-cont'>
            <SlideshowLightbox className='lightbox-add-img-cont' showThumbnails={true}>
            {hotelDetails.additionalImg?.map((img, index) => (
                    <img key={index} className='lightbox-img' src={img} alt={`Hotel Image ${index + 1}`} />
                ))}
            </SlideshowLightbox>

            
        </div>
        
    </div>
    
  )
}