'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import StreamingText from "@/components/streamingtext";

export default function EventPage({params}) {
    const eventId = params.eventId;
    const eventTitle = useSearchParams().get('title');
    const [transcriptLines, setTranscriptLines] = useState([]);

    useEffect(() => {
        const fetchTranscriptLines = async () => {
            let currentLineNumber = 1;
            const intervalId = setInterval(async () => {
                const response = await fetch(`/api/fetchLineInEvent/?eventId=${eventId}&counter=${currentLineNumber}`, {
                    method : 'GET'
                });
                if (response.ok) {
                    const lineData = await response.json();
                    setTranscriptLines(prevLines => [...prevLines, lineData.t]);
                    currentLineNumber++;
                } else {
                    clearInterval(intervalId);
                }
            }, 3000);

            return () => clearInterval(intervalId);
        };

        fetchTranscriptLines();

        }, []); // Re-run effect when eventId changes

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