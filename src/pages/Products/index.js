import './index.css';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { getProducts } from '../../services/products';

import TileGrid from '../../components/TileGrid';
import RippleButton from '../../components/Buttons/RippleButton';

function Products() {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState([]);

    const { handleSubmit, handleChange, handleBlur, values } = useFormik({
        initialValues: {
            search: searchParams.get("search") || '',
            brand: searchParams.get("brand") || '',
            minPrice: searchParams.get("minPrice") || '',
            maxPrice: searchParams.get("maxPrice") || ''
        },
        onSubmit: (filterValues) => {
            const params = new URLSearchParams();

            for (const key in filterValues) {
                if (filterValues[key]) {
                    params.append(key, filterValues[key]);
                }
            }

            navigate(`/products?${params.toString()}`);
        }
    });

    const handleClearParams = () => {
        navigate('/products');
    };

    useEffect(() => {
        values.search = searchParams.get("search") || '';
        values.brand = searchParams.get("brand") || '';
        values.minPrice = searchParams.get("minPrice") || '';
        values.maxPrice = searchParams.get("maxPrice") || '';
    }, [searchParams]);


    useEffect(() => {
        let timeoutId;

        const fetchProducts = async () => {
            timeoutId = setTimeout(async () => {
                const response = await getProducts();
                const data = await response.json();

                if (response.ok) {
                    // Filter products with the values from the formik
                    const filteredProducts = data.filter(product => {
                        const brandMatch = !values.brand || product.brand.toLowerCase().includes(values.brand.toLowerCase());
                        const minPriceMatch = !values.minPrice || product.price >= values.minPrice;
                        const maxPriceMatch = !values.maxPrice || product.price <= values.maxPrice;
                        const searchMatch = !values.search || product.title.toLowerCase().includes(values.search.toLowerCase());

                        return brandMatch && minPriceMatch && maxPriceMatch && searchMatch;
                    }
                    );

                    console.log(filteredProducts);
                    setProducts(filteredProducts);
                }
            }, 1000);
        };

        fetchProducts();

        return () => clearTimeout(timeoutId);
    }, [searchParams]);

    return (
        <>
            <div className="mx-auto sm:px-6 lg:px-8">
                <div
                    className="relative isolate overflow-hidden bg-white px-6 py-20 text-center sm:px-16 sm:shadow-sm">
                    <p className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-black sm:text-4xl">
                        ¿No encuentras la zapatilla que buscas?
                    </p>
                    <form onSubmit={handleSubmit} className='flex flex-col mx-auto gap-10 max-w-4xl'>
                        <label
                            className="w-full mx-auto mt-8 relative bg-white min-w-sm flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                            htmlFor="search-bar">

                            <input
                                id="search-bar"
                                type='text'
                                value={values.search}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="search"
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

                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-2 items-start shadow-2xl">
                                <label htmlFor="brand" className="text-sm font-semibold text-gray-600">Marca</label>
                                <select
                                    id="brand"
                                    name="brand"
                                    value={values.brand}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="px-3 w-full h-[45px] rounded-md border border-gray-300 focus:border-primary focus:outline-none">
                                    <option value="">Todas las marcas</option>
                                    <option value="nike">Nike</option>
                                    <option value="adidas">Adidas</option>
                                    <option value="puma">Puma</option>
                                    <option value="reebok">Reebok</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2 items-start shadow-2xl">
                                <label htmlFor="minPrice" className="text-sm font-semibold text-gray-600">Precio mínimo</label>
                                <input
                                    id="minPrice"
                                    type="number"
                                    name="minPrice"
                                    min="0"
                                    max={values.maxPrice}
                                    value={values.minPrice}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="px-3 w-full h-[45px] rounded-md border border-gray-300 focus:border-primary focus:outline-none" />
                            </div>
                            <div className="flex flex-col gap-2 items-start shadow-2xl">
                                <label htmlFor="maxPrice" className="text-sm font-semibold text-gray-600">Precio máximo</label>
                                <input
                                    id="maxPrice"
                                    type="number"
                                    name="maxPrice"
                                    min={values.minPrice}
                                    value={values.maxPrice}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="px-3 w-full h-[45px] rounded-md border border-gray-300 focus:border-primary focus:outline-none" />
                            </div>
                        </div>

                        <div className="w-full flex flex-col sm:flex-row justify-end gap-4">
                            <div className='w-full md:w-[200px]'>
                                <RippleButton type="submit" text="Filtrar" color="bg-primary" />
                            </div>
                            <div className='w-full md:w-[200px]'>
                                <RippleButton
                                    type="button"
                                    onClick={handleClearParams}
                                    text="Limpiar"
                                    color="bg-black"
                                />
                            </div>
                        </div>
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
