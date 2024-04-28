'use client';

import {useState, useEffect, useRef} from 'react';
import { useSearchParams } from 'next/navigation';
import StreamingText from "@/components/streamingtext";

export default function EventPage({params}) {
    const eventId = params.eventId;
    const eventTitle = useSearchParams().get('title');
    const [transcriptLines, setTranscriptLines] = useState([]);

    // Reference to track the mounted state of the component
    const isMountedRef = useRef(false);

    useEffect(() => {

        isMountedRef.current = true;
        const fetchTranscriptLines = async () => {
            let currentLineNumber = 1;
            const intervalId = setInterval(async () => {
                if(isMountedRef.current) {
                    const response = await fetch(`/api/fetchLineInEvent/?eventId=${eventId}&counter=${currentLineNumber}`, {
                        method: 'GET'
                    });

                    if (response.ok) {
                        const lineData = await response.json();
                        setTranscriptLines(prevLines => [...prevLines, lineData.t]);
                        currentLineNumber++;
                    } else {
                        clearInterval(intervalId);
                    }
                } else {
                    clearInterval(intervalId);
                }
            }, 3000);

            return () => clearInterval(intervalId);
        };

        fetchTranscriptLines();

        return () => { isMountedRef.current = false };

        }, []);

    return (
        <div className="container ml-auto mr-auto mt-4">
            <div>
                <h1>Event: {eventId}</h1>
                <h1>Event Title: {eventTitle}</h1>
            </div>
            <div>
                {transcriptLines.map((line, index) => (
                    <StreamingText key={index} text={line}/>
                ))}
            </div>
        </div>
    );
}