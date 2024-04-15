import './index.css';

function Tile({ id, title, brand, price, src, backgroundColor, textColor, onClick }) {
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(price);

    return (
        <>
            <div className={"flex flex-col flex-shrink-0 m-6 relative overflow-hidden rounded-lg max-w-xl h-[300px] shadow-lg"} style={{ backgroundColor: backgroundColor }} onClick={onClick.bind(this, id)}>
                <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none"
                    style={{ transform: 'scale(1.5)', opacity: 0.1 }}>
                    <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
                    <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
                </svg>
                <div className="flex-grow relative pt-10 px-10 flex items-center justify-center">
                    <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                        style={{ background: 'radial-gradient(black, transparent 60%)', transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', opacity: 0.2 }}>
                    </div>
                    <img className="relative w-40 hover:scale-125 transition duration-300 ease-in-out hover:rotate-12" src={src} alt="Sneaker" />
                </div>
                <div className="flex-grow"></div>
                <div className="relative text-white px-6 pb-6 mt-6">
                    <span className="block opacity-75 -mb-1">{brand}</span>
                    <div className="flex justify-between">
                        <span className="font-semibold text-xl">{title}</span>
                        <span className="rounded-full text-xs font-bold px-3 py-2 leading-none flex items-center" style={{ backgroundColor: textColor, color: backgroundColor }}>{formattedPrice}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tile;
