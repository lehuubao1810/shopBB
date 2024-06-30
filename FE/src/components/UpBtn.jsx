import { useState } from 'react';

function UpBtn() {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', handleScroll);

    return (
        <>
            {showButton && (
                <button onClick={handleClick} className="upBtn">
                    <i className="fa-solid fa-chevron-up"></i>
                </button>
            )}
        </>
    );
}

export default UpBtn;
