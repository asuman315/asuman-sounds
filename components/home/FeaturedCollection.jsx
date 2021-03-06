import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { productIdActions } from '../../store/productIdSlice';

export default function FeaturedCollection({ products }) {

  return (
    <section name='products' className='mt-5 md:relative max-w-6xl mx-auto'>
      <h2 className='uppercase text-left px-4'>
        bringing you the <span className='text-secondary-7'>best</span> audio
        gear
      </h2>
      <div className='md:absolute top-6 flex items-center justify-center left-0 w-full'>
        <hr className='w-28 md:w-44 m-8' />
      </div>
      <div className=' text-white grid grid-cols-grid-sm md:grid-cols-autofill-lg w-full md:my-12 my-2 p-6 mx-auto bg-white'>
        {products.map((product) => {
          const item = product.attributes;
          const { name, image, price, discountPercentage } = item;

          let discountPrice = (price * 100) / (100 - discountPercentage);

          //convert to two decimal places
          discountPrice = Math.round((discountPrice * 100) / 100).toFixed(2);

          //get url of the first images
          const imageUrl = image.data[0].attributes.url;
          const id = product.id;

          return (
            <SingleProduct
              key={id}
              name={name}
              imageUrl={imageUrl}
              price={price}
              discountPrice={discountPrice}
              discountPercentage={discountPercentage}
              productId={id}
            />
          );
        })}
      </div>
    </section>
  );
}

//Component for single product
const SingleProduct = ({
  name,
  price,
  discountPercentage,
  discountPrice,
  imageUrl,
  productId,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClick = () => {
    //set product id in store
    dispatch(productIdActions.setProductId(productId));
    router.push(`/product/${productId}`);
  };

  return (
    <article className='font-medium relative text-xs md:text-sm text-primary-11 bg-white mb-8 lg:cursor-pointer lg:hover:drop-shadow-md m-2 lg:hover:rounded-md'>
      <div
        className='flex flex-col items-start h-full'
        onClick={handleClick}>
        <img src={imageUrl} alt={name} className='' />
        <h3 className='p-3 text-xs md:text-sm text-left'>{name}</h3>
        <p className='font-bold px-3'>$ {price}</p>
        <p className='line-through text-secondary-8 text-left px-3'>$ {discountPrice}</p>
        <p className='bg-primary-13 rounded-xl ml-3 px-2 py-1 outline-none font-bold text-primary-11 absolute top-[12px] text-xs md:text-base animate-wiggle '>
          - {discountPercentage}%
        </p>
      </div>
    </article>
  );
};
