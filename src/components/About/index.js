import './index.css';

function About() {
    return (
        <>
            <div className="sm:flex items-center bg-gradient-to-r from-[#ec4899] via-[#d85999] to-[#d885af] pb-12">
                <div className="sm:w-1/2 p-8">
                    <div className="image object-center text-center">
                        <img src="https://i.imgur.com/WbQnbas.png" />
                    </div>
                </div>
                <div className="sm:w-1/2 p-5">
                    <div className="text">
                        <span className="text-white border-b-2 border-white uppercase">Sobre nosotros</span>
                        <h2 className="my-4 font-bold text-3xl sm:text-4xl text-strong">Acerca<span className="text-white">De nuestra Compañía</span>
                        </h2>
                        <p className="text-white">
                            Somos una empresa dedicada a la venta de zapatillas y accesorios de moda. Nuestro objetivo es ofrecer productos de calidad a precios accesibles. Contamos con una amplia variedad de marcas y modelos para que puedas encontrar el calzado que mejor se adapte a tu estilo. ¡Descubre nuestra colección y renueva tu look!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
