import './index.css';

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

function Navbar() {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
    };

    const handleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            {/* <!-- Main navigation container --> */}
            <nav
                className="flex-no-wrap relative flex w-full items-center justify-between bg-zinc-50 py-2 shadow-dark-mild lg:flex-wrap lg:justify-start lg:py-4 px-4">
                <div className="flex w-full flex-wrap items-center justify-between px-3">
                    {/* <!-- Hamburger button for mobile view --> */}
                    <button
                        type="button"
                        onClick={handleMobileMenu}
                        className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 lg:hidden">
                        {/* <!-- Hamburger icon --> */}
                        <span
                            className="[&>svg]:w-7 [&>svg]:stroke-black/50">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                    clipRule="evenodd" />
                            </svg>
                        </span>
                    </button>

                    {/* <!-- Collapsible navigation container --> */}
                    <div
                        className={"flex-grow basis-[100%] items-center lg:!flex lg:basis-auto" + (isMobileMenuOpen ? "  visible" : " hidden")}>
                        {/* <!-- Logo --> */}
                        <a
                            className="mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0"
                            href="#">
                            <img
                                src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
                                style={{ height: '15px' }}
                                alt="TE Logo"
                                loading="lazy" />
                        </a>
                        {/* <!-- Left navigation links --> */}
                        <ul
                            className="list-style-none me-auto flex flex-col ps-0 lg:flex-row">
                            <li className="mb-4 lg:mb-0 lg:pe-2">
                                {/* Home Link */}
                                <a
                                    className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none lg:px-2"
                                    href="/"
                                >
                                    Inicio
                                </a>
                            </li>
                            {/* Products Link */}
                            <li className="mb-4 lg:mb-0 lg:pe-2">
                                <a
                                    className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none lg:px-2"
                                    href="/products"
                                >Productos
                                </a>
                            </li>
                        </ul>
                        {/* <!-- Left links --> */}
                    </div>

                    {/* <!-- Right elements --> */}
                    {user ? (
                        <div className="relative flex items-center gap-3">
                            {/* <!-- Icon --> */}
                            <a className="text-neutral-600" href="#">
                                <span className="[&>svg]:w-5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-full h-full">
                                        <path
                                            d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                    </svg>
                                </span>
                                {/* <!-- Notification counter --> */}
                                <span
                                    className="absolute -mt-4 ms-2.5 rounded-full bg-rose-500 px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white"
                                >1</span>
                            </a>

                            {/* <!-- Second dropdown container --> */}
                            <div
                                className="relative">
                                {/* <!-- Second dropdown trigger --> */}
                                <a
                                    className="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                                    href="/profile"
                                    role="button">
                                    {user && user.user.profileImage !== null && user.user.profileImage !== '' ? (
                                        <img
                                            src={user.user.profileImage}
                                            className="rounded-full"
                                            style={{ height: '30px', width: '30px' }}
                                            alt="User avatar"
                                            loading="lazy" />
                                    ) : (
                                        <span
                                            className="flex items-center justify-center bg-neutral-200 text-neutral-600 rounded-full"
                                            style={{ height: '30px', width: '30px' }}
                                        >
                                            <span
                                                className="text-[0.8rem] font-semibold">
                                                {user.user.name.charAt(0)}
                                            </span>
                                        </span>
                                    )}
                                </a>
                            </div>

                            {/* <!-- Second dropdown container --> */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-8 h-8 flex items-center justify-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none">
                                    {/* Red power icon */}
                                    <span className="w-full h-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" className="w-full h-full">
                                            <path fill="none" d="M0 0h48v48H0z"></path>
                                            <path d="M20.17 31.17 23 34l10-10-10-10-2.83 2.83L25.34 22H6v4h19.34l-5.17 5.17zM38 6H10c-2.21 0-4 1.79-4 4v8h4v-8h28v28H10v-8H6v8c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4z"></path>
                                        </svg>
                                    </span>
                                </button>
                            </div>

                        </div>
                    ) : (
                        <div className="relative flex items-center gap-2">
                            <a
                                className="text-neutral-600"
                                href="/login"
                            >
                                Iniciar Sesión
                            </a>
                            |
                            <a
                                className="text-neutral-600"
                                href="/signup"
                            >
                                Registrarse
                            </a>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
