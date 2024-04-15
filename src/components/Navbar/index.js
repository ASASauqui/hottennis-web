import './index.css';

function Navbar({ title, brand, price, src, backgroundColor, textColor }) {
    return (
        <>
            <header className="h-24 sm:h-32 flex items-center z-30 w-full">
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <a href="/" className="uppercase text-gray-800 font-black text-3xl">
                        Hottenis.COM
                    </a>
                    <div className="flex items-center">
                        <nav className="font-sen text-gray-800 uppercase text-lg lg:flex items-center hidden">
                            <a href="/" className="py-2 px-6 flex">
                                Inicio
                            </a>
                            <a href="/products" className="py-2 px-6 flex">
                                Productos
                            </a>
                            {/* <a href="#" className="py-2 px-6 flex">
                                About
                            </a> */}

                        </nav>
                        <button className="lg:hidden flex flex-col ml-4">
                            <span className="w-6 h-1 bg-gray-800 mb-1">
                            </span>
                            <span className="w-6 h-1 bg-gray-800 mb-1">
                            </span>
                            <span className="w-6 h-1 bg-gray-800 mb-1">
                            </span>
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navbar;
