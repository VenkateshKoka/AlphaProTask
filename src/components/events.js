'use client'

import { useState, useEffect } from 'react';
import EventsPagination from "@/components/pagination";
import styles from "@/components/events.module.css"
export default function Events() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventsData = async () => {
            try {
                const response = await fetch('/api/fetchEvents', {
                    method: "GET"
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                setEvents(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEventsData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const liveEarningsCalls = events.filter((event) =>
        event.eventType?.secondaryType==="Earnings Call");

    return (
        <div className={styles.events}>
            <div className="flex">
                <div>Live Earnings Calls {liveEarningsCalls.length}</div>
                <div className="flex ml-3 items-center justify-center border">
                    <div className="relative flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-teal-100"></div>
                        <div className="w-2 h-2 rounded-full bg-teal-400 absolute"></div>
                    </div>
                    <div className="ml-1 font-semibold text-sm"> Live</div>
                </div>
            </div>
            <h1>Live Earnings</h1>
            <EventsPagination events={liveEarningsCalls} />
            {/*<EventsPagination events={[...liveEarningsCalls, ...liveEarningsCalls, ...liveEarningsCalls]} />*/}
        </div>
    );
}