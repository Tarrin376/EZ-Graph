import { useState, useEffect } from "react";

function useWindowSize() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        // Function that updates the window width and height
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        // Add an event listener for the resizing of the window
        window.addEventListener('resize', handleWindowResize);

        // Remove the even listener on cleanup
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    return [windowWidth, windowHeight];
}

export default useWindowSize;