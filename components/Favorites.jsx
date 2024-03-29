import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Cart from './cart';
import { IoMdRemove } from 'react-icons/io';
import Alert from './Auth/Alert';

const Favorites = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    type: '',
    msg: '',
  });


  useEffect(() => {
    const favoriteItems =
      JSON.parse(localStorage.getItem('favoriteItems')) || [];
    setFavoriteItems(favoriteItems);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='pt-24 lg:mb-20'>
      <Cart />
      {alert.show && <Alert alert={alert} setAlert={setAlert} />}
      <h1 className='text-center uppercase px-4 lg:py-12'>
        Your favorite items
      </h1>
      {favoriteItems.length > 0 ? (
        <WithItems
          favoriteItems={favoriteItems}
          setFavoriteItems={setFavoriteItems}
          setAlert={setAlert}
        />
      ) : (
        <WithOutItems />
      )}
    </div>
  );
};

const WithItems = ({ favoriteItems, setFavoriteItems, setAlert }) => {
  
  return (
    <div className='my-8 sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 max-w-6xl lg:mx-auto'>
      {favoriteItems.map((favoriteItem) => {
        const {
          id,
          name,
          price,
          imageUrl,
          discountPrice,
          percentageDiscount,
        } = favoriteItem;

        const handleClick = () => {
          const newFavoriteItems = favoriteItems.filter(
            (item) => item.id !== id
          );
          setFavoriteItems(newFavoriteItems);
          localStorage.setItem(
            'favoriteItems',
            JSON.stringify(newFavoriteItems)
          );
          setAlert({
            show: true,
            type: 'success',
            msg: 'Item removed from favorites',
        });
      };

        return (
          <article key={id}>
            <div className='relative rounded-md'>
              <Image
                src={imageUrl}
                alt={`Image of ${name}`}
                width={450}
                height={400}
                className='rounded-md'
              />
              {percentageDiscount && (
                <div className='absolute flex text-primary-10 bg-primary-12 items-center justify-center top-5 left-5 w-16 h-16 rounded-full font-bold'>
                  <p>-{percentageDiscount}%</p>
                </div>
              )}
              <IoMdRemove
                className='absolute text-primary-2 rounded-full top-5 right-5 text-4xl bg-dark-red cursor-pointer'
                onClick={handleClick}
              />
            </div>
            <Link href={`/product/details/${id}`} passHref>
              <h3 className='pt-4 text-secondary-8 text-sm md:text-base xl:text-lg tracking-wider lg:cursor-pointer'>
                {name}
              </h3>
            </Link>
            <div className='flex justify-center items-center py-4'>
              <p className='text-lg sm:text-2xl font-bold mr-4'>${price}</p>
              {percentageDiscount && (
                <p className='font-medium sm:text-xl text-base line-through'>
                  {discountPrice}
                </p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};

const WithOutItems = () => {
  return (
    <div className='flex flex-col items-center bg-primary-3 my-6 mx-8 py-12 max-w-4xl lg:mx-auto'>
      <h3 className='text-3xl px-5 leading-[42px]'>
        You have added no favorite items
      </h3>
      <Link href='/' passHref>
        <button className='uppercase tracking-wider mt-12'>shop now</button>
      </Link>
    </div>
  );
};

export default Favorites;
