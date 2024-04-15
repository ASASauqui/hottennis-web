import './index.css';

import { useNavigate } from 'react-router-dom';

import Tile from '../Tile';

function TileGrid({ data }) {
    const navigate = useNavigate();

    const backgroundColors = ['#f97315', '#60a5fa', '#34d399', '#f472b6'];

    const onClick = (id) => {
        navigate(`/products/${id}`);
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((item, index) => (
                    <Tile
                        key={index}
                        id={item._id}
                        title={item.title}
                        brand={item.brand}
                        price={item.price}
                        src={item.images[0]}
                        backgroundColor={backgroundColors[index % backgroundColors.length]}
                        textColor={'#fff'}
                        onClick={() => onClick(item._id)} />
                ))}
            </div>
        </>
    );
}

export default TileGrid;

