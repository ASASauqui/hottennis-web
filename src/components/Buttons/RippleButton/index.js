import React from 'react';
import './index.css';

const RippleButton = ({ text, type, color, emoji, time, onClick }) => {
    const rippleTime = time ? time : 1000;

    const handleClick = (e) => {
        const buttonCoords = e.currentTarget.getBoundingClientRect();

        const newRipple = document.createElement("span");
        newRipple.classList.add("ripple-effect");
        newRipple.style.left = `${e.clientX - buttonCoords.left}px`;
        newRipple.style.top = `${e.clientY - buttonCoords.top}px`;

        e.currentTarget.appendChild(newRipple)

        setTimeout(() => {
            newRipple.remove();
        }, rippleTime);

        onClick && onClick();
    };

    return (
        <>
            <button
                type={type}
                className={`${color} relative mx-auto min-w-[150px] w-full h-[50px] flex justify-center bg-gradient-to-br items-center rounded-[5px] cursor-pointer overflow-hidden transition duration-300 ease-out`} onClick={handleClick}>
                <div className="text-center text-[0.8rem] sm:text-[1rem] text-white font-semibold mr-1">{text}</div>

                {emoji ?
                    <div className="text-[20px]">{emoji}</div>
                    : ""}
            </button>
        </>
    );
};

export default RippleButton;
