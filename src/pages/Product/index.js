import './index.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useShoppingCart } from '../../hooks/useShoppingCart';
import { getProduct } from '../../services/products';
import RippleButton from '../../components/Buttons/RippleButton';

function Product() {
    const { id } = useParams();
    const { addItem } = useShoppingCart();
    const [product, setProduct] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await getProduct(id);
            const data = await response.json();

            setProduct(data);
        };

        fetchProduct();
    }, [id]);

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(product?.price);

    const handlePrevImage = () => {
        setImageIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : product?.images?.length - 1);
    };

    const handleNextImage = () => {
        setImageIndex((prevIndex) => prevIndex < product?.images?.length - 1 ? prevIndex + 1 : 0);
    };

    const handleAddToCart = () => {
        addItem(id);
    };

    return (
        <>
            <div className="py-20">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-x-5 gap-y-10">
                        <div className="md:flex-1 flex flex-col flex-shrink-0 relative overflow-hidden rounded-lg shadow-lg bg-orange-400">
                            <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none"
                                style={{ transform: 'scale(1.5)', opacity: 0.1 }}>
                                <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
                                <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
                            </svg>
                            <div className="flex-grow relative pt-10 px-10 flex items-center justify-center">
                                <img className="relative w-auto sm:w-1/2 h-[300px] sm:h-auto hover:scale-110 transition duration-300 ease-in-out hover:rotate-12"
                                    src={product?.images?.[imageIndex]}
                                    alt={product?.title || 'Product Image'}
                                />

                                <div className="absolute bottom-0 left-0 right-0 p-1 bg-black bg-opacity-50 text-white text-center">
                                    <button onClick={handlePrevImage} className="inline-block bg-opacity-50 text-white text-2xl w-10 h-10 hover:bg-opacity-75">&lt;</button>
                                    {imageIndex + 1} / {product?.images?.length}
                                    <button onClick={handleNextImage} className="inline-block bg-opacity-50 text-white text-2xl w-10 h-10 hover:bg-opacity-75">&gt;</button>
                                </div>
                            </div>
                        </div>
                        <div className="md:flex-1 flex flex-col gap-2">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{product?.title}</h2>
                            <h3 className="text-gray-600 text-2xl mb-4">
                                {product?.brand}
                            </h3>
                            <div className="flex mb-4">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700">Precio:</span>
                                    <span className="text-gray-600">{formattedPrice}</span>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700">Disponibilidad:</span>
                                    <span className="text-gray-600">2 unidades</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <span className="font-bold text-gray-700">Seleccionar talla:</span>
                                <div className="flex items-center mt-2">
                                    <button className="bg-gray-300  text-gray-700  py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">S</button>
                                    <button className="bg-gray-300  text-gray-700  py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">M</button>
                                    <button className="bg-gray-300  text-gray-700  py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">L</button>
                                    <button className="bg-gray-300  text-gray-700  py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">XL</button>
                                    <button className="bg-gray-300  text-gray-700  py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">XXL</button>
                                </div>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700">Descripción del producto:</span>
                                <p className="text-gray-600 text-sm mt-2">
                                    {product?.description}
                                </p>
                            </div>


                            <div>
                                <RippleButton type="submit" text="Añadir al carrito"
                                onClick={handleAddToCart}
                                color="bg-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;
