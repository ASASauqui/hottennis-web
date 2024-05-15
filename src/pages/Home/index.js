import './index.css';

import useTyped from '../../hooks/useTyped';
import About from '../../components/About';

function Home() {
  const texts = [
    "Siempre a la moda.",
    "Tu estilo, tu huella."
  ];

  const el = useTyped(
    texts,
    100,
    80,
    {
      loop: true,
      backDelay: 1500,
      shuffle: false,
      showCursor: true,
      cursorChar: '<span class="text-[50px] md:text-[60px]">|</span>'
    }
  );

  return (
    <>
      <div className="bg-white flex relative z-20 items-center overflow-hidden p-5">
        <div className="container mx-auto px-6 flex relative py-4">
          <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
            <span className="w-20 h-2 bg-gray-800 mb-12">
            </span>

            <div className='w-full h-[100px] sm:h-[150px] mb-[20px]'>
              <span className='text-4xl sm:text-6xl font-semibold text-black' ref={el}></span>
            </div>

            <p className="text-sm sm:text-base text-gray-700">
              Descubre nuestra colección de zapatillas y accesorios de moda. Conoce las últimas tendencias y novedades en calzado deportivo y urbano. ¡No te quedes sin tu par!
            </p>
            <div className="flex mt-8">
              <a href="/products" className="uppercase py-2 px-4 rounded-lg bg-primary border-2 border-transparent text-white text-md mr-4 hover:bg-primary-hover">
                Compra ahora
              </a>
            </div>
          </div>

          <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative rotate-12">
            <img src="https://images.footlocker.com/is/image/EBFL2/W2288111_a1?wid=2000&hei=2000&fmt=png-alpha" alt="Sneaker"
              className="max-w-lg md:max-w-lg m-auto" />
          </div>
        </div>
      </div>

      <About />
    </>
  );
}

export default Home;
