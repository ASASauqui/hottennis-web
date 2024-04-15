import { useRef, useEffect } from 'react';
import Typed from "typed.js";

const useTyped = (strings, typedSpeed, backSpeed, extra) => {
    const el = useRef(null);
    const typed = useRef(null);

    useEffect(() => {
        const options = {
            strings,
            typeSpeed: typedSpeed,
            backSpeed: backSpeed,
            ...extra
        };

        typed.current = new Typed(el.current || "", options);

        return () => {
            typed.current?.destroy();
        }
    }, []);

    return el;
};

export default useTyped;