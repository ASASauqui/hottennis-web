import './index.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services/products';
import RippleButton from '../../components/Buttons/RippleButton';

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

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

    return (
        <>
            <div className="py-20">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
                                <img className="w-full h-full object-cover" src={product?.images?.[0]}
                                    alt="Product Image" />
                            </div>
                        </div>
                        <div className="md:flex-1 flex flex-col px-4 gap-2">
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
                                <RippleButton type="submit" text="Añadir al carrito" color="bg-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Product;
