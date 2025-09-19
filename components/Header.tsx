
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Customer Sentiment Analyzer
            </h1>
            <p className="mt-3 text-lg text-gray-400">
                Instantly understand your customers' feelings with the power of AI.
            </p>
        </header>
    );
};

export default Header;
