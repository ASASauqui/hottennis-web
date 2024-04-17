import './index.css';

import { useState, useEffect } from 'react';

import { getProducts } from '../../services/products';

import TileGrid from '../../components/TileGrid';

function Products() {
    const [products, setProducts] = useState([]);

    // const products = [
    //     {
    //         id: 1,
    //         title: 'Nike Air Max 270',
    //         brand: 'Nike',
    //         price: 1500,
    //         src: 'https://images.footlocker.com/is/image/EBFL2/W2288111_a1?wid=2000&hei=2000&fmt=png-alpha',
    //         backgroundColor: '#15b8a6',
    //         textColor: '#fff'
    //     },
    //     {
    //         id: 2,
    //         title: 'Nike Air Max 270',
    //         brand: 'Nike',
    //         price: 10000,
    //         src: 'https://images.footlocker.com/is/image/EBFL2/W2288111_a1?wid=2000&hei=2000&fmt=png-alpha',
    //         backgroundColor: '#f97315',
    //         textColor: '#fff'
    //     }
    // ];

    useEffect(() => {
        let timeoutId;

        const fetchProducts = async () => {
            timeoutId = setTimeout(async () => {
                const response = await getProducts();
                const data = await response.json();

                console.log(data);

                if (response.ok) {
                    setProducts(data);
                }
            }, 1000);
        };

        fetchProducts();

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            <div className="mx-auto sm:px-6 lg:px-8">
                <div
                    className="relative isolate overflow-hidden bg-white px-6 py-20 text-center sm:px-16 sm:shadow-sm">
                    <p className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-black sm:text-4xl">
                        ¿No encuentras la zapatilla que buscas?
                    </p>
                    <form action="/search">
                        <label
                            className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                            htmlFor="search-bar">

                            <input
                                id="search-bar"
                                placeholder="Buscar zapatillas..."
                                className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white" required="" />
                            <button type="submit"
                                className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all">
                                <div className="flex items-center transition-all opacity-1">
                                    <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                                        Buscar
                                    </span>
                                </div>
                            </button>
                        </label>
                    </form>

                    <svg viewBox="0 0 1024 1024"
                        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                        aria-hidden="true">
                        <circle cx="512" cy="512" r="512" fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7">
                        </circle>
                        <defs>
                            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                                <stop stopColor="#840444"></stop>
                                <stop offset="1" stopColor="#B8266F"></stop>
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </div>

            {products.length > 0 ? (
                <div className='mt-16'>
                    <TileGrid data={products} />
                </div>
            ) : (
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
                </div>
            )}
        </>
    );
}

export default Products;
