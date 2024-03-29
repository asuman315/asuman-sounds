import React from 'react';
import man from '../../public/images/man.png';
import Image from 'next/image';

const About = () => {
  return (
    <section className='my-20 px-5 max-w-6xl mx-auto leading-8 md:flex grid-cols-4 flex-row-reverse'>
      <div className='flex justify-center bg-primary-11 rounded-lg col-span-2 w-[100%] h-[fit-content]'>
        {/* <img
          src={man.src}
          alt='image of a person listening to music on headsets'
          className=''
        /> */}
        <Image
          src={man}
          alt='image of a person listening to music on headsets'
          width={580}
          height={400}
        />
      </div>
      <div className='text-center px-4 col-span-2 md:text-left md:w-[90%]'>
        <h2 className='uppercase text-center md:text-left py-5 md:pt-0'>
          bringing you the <span className='text-secondary-7'>best</span> audio
          gear
        </h2>
        <p className='pb-3'>
          Located at the heart of Kampala City, Asuman Sounds is the premier
          store for high end headphones, speakers, home theaters, headsets and
          audio accessories.
        </p>
        <p className='pb-3'>
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experince a wide range of our products.
        </p>
        <p>
          Stop by our store to meet some of the fantastic people who make Asuman
          Sounds the best place to buy your audio equipment.
        </p>
      </div>
      <div></div>
    </section>
  );
};

export default About;
