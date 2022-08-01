import { HiShoppingCart } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/router';

const listItems = [
  { text: 'headsets', path: '/products/category/3' },
  { text: 'speakers', path: '/products/category/1' },
  { text: 'home theaters', path: '/products/category/2' },
  { text: 'headphones', path: '/products/category/4' },
];

export default function DesktopNavigation({ toggleCart, totalQuantity }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <nav className={`hidden px-6 md:flex w-screen text-white ${isHomePage ? 'text-white' : 'text-primary-11'}`}>
      <div className='flex justify-between items-center w-full md:py-2 lg:py-4 border-b-[1px]'>
        <div className='font-["Arima_Madurai"] font-bold hover:scale-105 duration-300 ease-linear text-2xl'>
          <Link href='/'>asuman sounds</Link>
        </div>
        <div className='flex'>
          <ul className='flex justify-between items-center md:text-xs lg:text-sm'>
            {listItems.map((listItem, index) => {
              const { text, path } = listItem;
              return (
                <li
                  key={index}
                  className='md:ml-6 uppercase font-semibold hover:translate-x-2 duration-300 ease-linear'>
                  <Link href={path}>
                    {text}
                  </Link>
                </li>
              );
            })}
          </ul>
          {/**Cart icon container */}
          <div className='relative flex' onClick={toggleCart}>
            <HiShoppingCart className='md:ml-10 w-8 h-8 md:h-9 md:w-9 cursor-pointer hover:scale-105 duration-300 ease-linear self-center' />
            {totalQuantity >= 1 ? (
              <p className='absolute pt-[1px] bg-secondary-8 text-xs top-2 right-0 w-5 h-5 rounded-[50%] flex items-center justify-center font-bold cursor-pointer'>
                {totalQuantity}
              </p>
            ) : null}
          </div>
          {/**Sign-up and login buttons */}
          <div className='flex items-center'>
            <Button action={'signup'} path='auth/signup' />
            <Button action={'login'} path='auth/login' />
          </div>
        </div>
      </div>
    </nav>
  );
}

const Button = ({ action, path }) => {
  const router = useRouter();
  return (
    <button
      className='py-2.5 px-5 capitalize bg-primary-11 md:text-xs lg:text-base ml-4 font-semibold'
      onClick={() => router.push(`/${path}`)}>
      {action}
    </button>
  );
};
