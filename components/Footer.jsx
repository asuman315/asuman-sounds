import React from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';
import { RiFacebookCircleLine } from 'react-icons/ri';
import { RiTwitterLine } from 'react-icons/ri';
import HorLine from './HorLine';

function Footer() {
  return (
    <footer className='flex flex-col items-center justify-center  md:flex-row md:justify-between w-screen md:h-[300px] md:items-start pb-10 md:px-10 md:py-14 relative pt-4 font-medium max-w-6xl mx-auto'>
      <HorLine />
      <article className='text-center mb-4'>
        <h4 className=''>Company</h4>
        <p>About Us</p>
        <p>Return</p>
        <p>Help</p>
      </article>
      <article className='mb-4'>
        <h4>Visit</h4>
        <p>Store locator</p>
      </article>
      <article className='mb-4'>
        <h4>Connect</h4>
        <p>Contact Us</p>
      </article>
      <article className='flex md:absolute justify-center w-full top-56 md:text-[2rem] mt-6 left-0'>
        <AiOutlineInstagram className='' />
        <RiFacebookCircleLine className='mr-9 ml-9' />
        <RiTwitterLine className='' />
      </article>
    </footer>
  );
}

export default Footer;