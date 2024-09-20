import React from 'react';
import whales_1 from '../assets/whale/whales_1.png';
import whales_2 from '../assets/whale/whales_2.png';
import whales_3 from '../assets/whale/whales_3.png';
import whales_4 from '../assets/whale/whales_4.png';

interface ChildComponent2Props {
    percentages: string[];
    selectedPercentage: string;
    handleSelect: (percentage: string) => void;
    showImage: boolean;
}

const ChildComponent2: React.FC<ChildComponent2Props> = ({ percentages, selectedPercentage, handleSelect, showImage }) => {
    return (
        <div>
            {selectedPercentage === '' && (
                <img src={whales_1} alt="" className={`transition-effect ${showImage ? 'show' : ''}`} />
            )}
            {selectedPercentage === 'ALL IN' && (
                <img src={whales_4} alt="" className={`transition-effect ${showImage ? 'show' : ''}`} />
            )}
            {selectedPercentage === '25%' && (
                <img src={whales_1} alt="" className={`transition-effect ${showImage ? 'show' : ''}`} />
            )}
            {selectedPercentage === '50%' && (
                <img src={whales_2} alt="" className={`transition-effect ${showImage ? 'show' : ''}`} />
            )}
            {selectedPercentage === '75%' && (
                <img src={whales_3} alt="" className={`transition-effect ${showImage ? 'show' : ''}`} />
            )}
            <div className="w-full text-white p-2 rounded-lg shadow flex items-center justify-between space-x-2">
                {percentages.map((percent) => (
                    <button
                        key={percent}
                        className={`text-sm w-[20%] py-1 rounded-full transition-colors duration-200 
              ${selectedPercentage === percent ? 'bg-white text-black' : 'bg-transparent border-white'} 
              border-2 hover:bg-white hover:text-black`}
                        onClick={() => handleSelect(percent)}
                    >
                        {percent}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChildComponent2;