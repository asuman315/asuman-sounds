import { useRouter } from 'next/router';
import Carousel from '../../components/details/Carousel';
import ProductInfo from '../../components/details/ProductInfo';
import Buttons from '../../components/details/Buttons';
import Description from '../../components/details/Description';

export default function Product({ product }) {
  const singleProduct = product.attributes;
 
  return (
    <section className='pt-20'>
      <Carousel singleProduct={singleProduct} />
      <ProductInfo singleProduct={singleProduct} />
      <Buttons />
      <Description singleProduct={singleProduct} />
    </section>
  );
}

export async function getStaticProps(context) {
  const productId = context.params.productId;

  //console.log(productId);
  const response = await fetch(
    `https://asmn-shopping-cart.herokuapp.com/api/shopping-carts/${productId}?populate=*`
  );
  const productData = await response.json();
  const product = productData.data;

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch(
    'https://asmn-shopping-cart.herokuapp.com/api/shopping-carts?populate=*'
  );

  const productsData = await response.json();

  const paths = productsData.data.map((product) => {
    //console.log(product);
    return { params: { productId: product.id.toString() } };
  });

  return {
    paths,
    fallback: false,
  };
}