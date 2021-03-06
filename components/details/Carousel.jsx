import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Carousel({ singleProduct }) {
     
 const { image } = singleProduct;

  return (
    <section className='md:w-full'>
      <MySwiper image={image} />
     <Images image={image} />
    </section>
  );
}

//Swiper is only shown on small screens (screens below 768px)
//Swiper is a slider that can be used to display images, videos, or other content.
function MySwiper({ image }) {
  
  return (
    <div className='md:hidden'>    
    <Swiper
      // install Swiper modules
      className='bg-[white]'
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      speed={700}
      autoplay={{ delay: 4000, disableOnInteraction: true }}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      {image.data.map((image, index) => {
        return (
          <SwiperSlide key={index}>
            <img
              key={index}
              src={image.attributes.url}
              alt='slide image'
            />
          </SwiperSlide>
        );
      })}
      {/* <SwiperSlide>Slide 1</SwiperSlide> */}
      ...
    </Swiper>
    </div>
  );
};

//This component is for displaying images of the product on medium and large screens (screens above 768px)
const Images = ({ image }) => {

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  //set current slide index to the index of the image that is clicked
  const changeSlide = (index) => {
    setCurrentSlideIndex(index);
  }

  return (
    <section>
      {/*Container for slide images */}
      <div className='hidden md:block overflow-hidden h-[600px]'>
        <div className='flex h-full relative w-[95%]'>
          {image.data.map((image, index) => {
            return (
              <article
                key={index}
                className={`h-full ${
                  currentSlideIndex === index ? 'opacity-100' : 'opacity-0'
                }`}>
                <img
                  src={image.attributes.url}
                  alt='slide image'
                  className='rounded-xl mt-8 ml-4 absolute h-full object-cover md:object-fill'
                />
              </article>
            );
          })}
        </div>
      </div>
      {/*Thumbnails Container. Only shown on medium screens and above*/}
      <div className={`hidden md:grid grid-cols-grid-thumbs gap-4 pl-4 pt-4 ${image.data.length <= 1 ? 'md:hidden' : 'null' }`}>
        {image.data.map((image, index) => {
          return (
            <article
              key={index}
              className={`rounded-lg  ${
                currentSlideIndex === index ? 'border-2' : 'border-0'
              }`}>
              <img
                src={image.attributes.formats.thumbnail.url}
                alt='slide image'
                className={`mr-4 cursor-pointer rounded-lg  ${
                  currentSlideIndex === index
                    ? 'opacity-70 border-secondary-7'
                    : 'opacity-100 border-0'
                }`}
                onClick={() => changeSlide(index)}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
