import React, { useCallback, useRef, useState, useEffect } from 'react';

interface WhaleSliderProps {
    sliderValue: number;
    setSliderValue: (value: number) => void;
    getWhaleHeadSrc: () => string;
}

const WhaleSlider: React.FC<WhaleSliderProps> = ({ sliderValue, setSliderValue, getWhaleHeadSrc }) => {
    const sliderContainerRef = useRef<HTMLDivElement>(null);
    const whaleHeadRef = useRef<HTMLImageElement>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    // Handling the start of a drag (mouse/touch)
    const handleDragStart = useCallback((event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();
        setIsDragging(true);
    }, []);

    // Handling the end of a drag (mouse/touch)
    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Handling movement during dragging (mouse/touch)
    const handleDragMove = useCallback((event: MouseEvent | TouchEvent) => {
        if (isDragging && sliderContainerRef.current) {
            const bounds = sliderContainerRef.current.getBoundingClientRect();
            let clientX;

            if ('touches' in event) {
                clientX = event.touches[0].clientX; // Use touch position for mobile
            } else {
                clientX = event.clientX; // Use mouse position for desktop
            }

            const mouseX = clientX - bounds.left;
            const newValue = Math.max(0, Math.min(100, (mouseX / bounds.width) * 100));
            setSliderValue(newValue);
        }
    }, [isDragging, setSliderValue]);

    // Attach event listeners for drag
    useEffect(() => {
        const handleMouseUpGlobal = () => setIsDragging(false);

        if (isDragging) {
            document.addEventListener('mousemove', handleDragMove);
            document.addEventListener('mouseup', handleMouseUpGlobal);

            document.addEventListener('touchmove', handleDragMove);
            document.addEventListener('touchend', handleDragEnd);
        }

        return () => {
            if (isDragging) {
                document.removeEventListener('mousemove', handleDragMove);
                document.removeEventListener('mouseup', handleMouseUpGlobal);

                document.removeEventListener('touchmove', handleDragMove);
                document.removeEventListener('touchend', handleDragEnd);
            }
        };
    }, [isDragging, handleDragMove, handleDragEnd]);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div ref={sliderContainerRef} className="slider-container relative w-full h-[80px] mb-5">
                {/* Whale Tail */}
                <img src="./whale/tail.png" alt="Whale Tail" className="absolute left-[-80px] bottom-0 w-[50px] h-[54.5px]" />

                {/* Whale Body */}
                <div
                    className="slider-body"
                    style={{
                        left: '-35px',
                        width: `calc(${sliderValue}% - 0px)`,
                        backgroundImage: 'url(./whale/body1.png)',
                    }}
                ></div>

                {/* Whale Head */}
                <img
                    ref={whaleHeadRef}
                    src={getWhaleHeadSrc()}
                    alt="Whale Head"
                    className="slider-head absolute cursor-pointer bottom-0 top-[43px] w-[70px] h-[44px]"
                    style={{
                        left: `calc(${sliderValue}% - 48px)`,
                        transform: isHovered ? 'scale(1.05)' : 'scale(1.01)',
                    }}
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart} // Handle touch start for mobile
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                />
            </div>

            {/* Preset Buttons */}
            <div className="buttons-container flex justify-between w-full">
                {[25, 50, 75, 100].map((val) => (
                    <button
                        key={val}
                        onClick={() => setSliderValue(val)}
                        className={`text-sm font-bold w-[20%] py-2 rounded-full bg-[#1a1a1d] border-2 border-[#00bfff] text-white transition-all duration-200 ease-in-out hover:bg-[#00bfff] hover:text-black ${sliderValue === val ? 'bg-[#00bfff] text-white' : ''}`}>
                    
                        {val === 100 ? 'All In' : `${val}%`}
                    </button>
                ))}
            </div>

        </div>
    );
};

export default WhaleSlider;
