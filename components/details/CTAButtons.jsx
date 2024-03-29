import { cartActions } from '../../store/cartSlice';
import { useRouter } from 'next/router';
import { formatprice } from '../HorLine';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';

const CTAButtons = ({ singleProduct, productId, setAlert }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { price, name, image, percentageDiscount } = singleProduct;

   const quantity = useSelector((state) => state.quantityValue.quantity);

  let discountPrice = (price * 100) / (100 - percentageDiscount);
  discountPrice = formatprice(discountPrice);
  //grab thumbnail - of the first image - of the product if it has one - otherwise use the full image.
  const imageThumbnail = image.data[0].attributes.formats
    ? image.data[0].attributes.formats.thumbnail.url
    : image.data[0].attributes.url;

  const cartItem = {
    id: productId,
    name,
    price,
    imageUrl: imageThumbnail,
    discountPrice,
    percentageDiscount,
    quantity,
    totalPrice: price * quantity,
  };

  const addToCart = () => {
    // Set 'cartItems' to the cartItems in local storage if it exists otherwise set it to an empty array
    const cartItems = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [];

    // Check if the cartItems array already contains the item
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productId
    );

    // If the cartItems array already contains the item, increment the quantity amd update the totalPrice
    if (existingCartItem) {
      existingCartItem.quantity = cartItem.quantity;
      existingCartItem.totalPrice =
        existingCartItem.quantity * existingCartItem.price;
    } else {
      cartItems.push(cartItem);
    }

    // Add the cartItems array in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Add the cartItems array in the redux store
    dispatch(cartActions.setCartItems(cartItems));
    setAlert({
      type: 'success',
      show: true,
      msg: existingCartItem
        ? 'Item updated successfully'
        : 'Item successfully added to cart',
    });
  };

  const buyItNowItem = {
    id: productId,
    name,
    price,
    imageThumbnail,
    discountPrice,
    discountPercentage: percentageDiscount,
    quantity,
  };

  const buyItNow = () => {
    localStorage.setItem('buyItNowItem', JSON.stringify(buyItNowItem));
    localStorage.setItem('isAddToCartBtnClicked', false);
    router.push('/product/checkout/address');
  };

  return (
    <div className='relative'>
      {/*Add to cart button */}
      <button
        className='text-center w-full mt-6 mb-4 text-2xl text-primary-1 flex flex-row items-center justify-center outline-none rounded-none uppercase'
        onClick={addToCart}>
        <HiOutlineShoppingCart className='absolute left-8 sm:left-20 md:left-12 lg:left-28' />
        Add to cart
      </button>
      {/*Buy It Now button */}
      <button
        className='text-center w-full border-primary-11 border-[1px] bg-primary-12 mb-12 text-2xl text-primary-11 flex flex-row items-center justify-center  outline-none rounded-none uppercase'
        onClick={buyItNow}>
        Buy it now
      </button>
    </div>
  );
};

export default CTAButtons;
