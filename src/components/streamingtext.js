'use client'

import {useState, useEffect, useRef} from 'react';

export default function StreamingText({ text }) {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        const totalTime = 2500; // 2.5 seconds in milliseconds
        const characters = text.split('');
        const intervalTime = totalTime / characters.length;

        const interval = setInterval(() => {
            setDisplayedText(text.substring(0, i));
            i++;
            if (i > text.length) {
                clearInterval(interval);
            }
        }, intervalTime); // Adjust the speed here (in milliseconds)

        return () => clearInterval(interval);
    }, [text]);

    return (
        <div className="whitespace-pre-wrap relative break-words">
            {displayedText}
        </div>
    );
}