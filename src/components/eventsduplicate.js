'use client'

import { useState, useEffect } from 'react';
import EventsPaginationDuplicate from "@/components/paginationduplicate";
import styles from "@/components/events.module.css"
export default function EventsDuplicate() {
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
        return (<div className="p-20">
            <h1 className="mb-8 text-xl">Loading the Live Events</h1>
            <ul className="space-y-8">
                {Array(2).fill(0).map((_el, index) => (
                    <li key={index}>
                        <div className="w-full h-24 animate pulse bg-gray-50"></div>
                    </li>
                ))}
            </ul>
        </div>);
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const liveEarningsCalls = events.filter((event) =>
        event.eventType?.secondaryType === "Earnings Call");

    return (
        <div className={styles.events}>
            <div className={styles.earnings}>
                <div className="flex font-xl capitalize text-center items-center">live earnings calls</div>
                <div className={styles.live}>
                    <div className="flex justify-center items-center relative mr-2">
                        <div className={styles.liveIndicator1}></div>
                        <div className={styles.liveIndicator2}></div>
                    </div>
                    <div className="ml-1 text-xs"> Live</div>
                </div>
                <div className={styles.viewAll}>View All</div>
            </div>
            <div>
                <div className={styles.liveEvents}>{liveEarningsCalls.length} events live right now</div>
            </div>
            {/*<EventsPagination events={liveEarningsCalls} />*/}
            <EventsPaginationDuplicate events={[...liveEarningsCalls, ...liveEarningsCalls, ...liveEarningsCalls]} />
        </div>
    );
}