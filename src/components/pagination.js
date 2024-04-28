'use client';

import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import styles from './pagination.module.css';
import React from "react";

export default function EventsPagination({ events }) { // Receive events as props
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 3;
    const eventsContainerRef = useRef(null);

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);


    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(events.length / eventsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className={`${styles.eventsContainer} flex-row`}>
                {currentEvents.map(event => (
                    <div key={event.eventId} className={`${styles.eventItem} p-4`}> {/* Event Item */}
                        <Link href={`/events/${event.eventId}`}>
                            <div>{event.eventId}</div>
                            <h2>{event.eventTitle}</h2>
                            <p>{event.eventType?.secondaryType}</p>
                        </Link>
                    </div>
                ))}
            </div>
            <div className={`${styles.pagination} flex mt-4`}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ''}`}>
                    {`<`}
                </button>

                <div className={styles.pageNumbers}>
                    {pageNumbers.map(number => (
                        <div
                            key={number}
                            onClick={() => handlePageChange(number)}
                            className={`${styles.pageNumber} ${currentPage === number ? styles.active : ''}`}
                        >
                            {number}
                        </div>
                    ))}
                </div>


                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`${styles.paginationButton} ${currentPage === pageNumbers.length ? styles.disabled : ''}`}>
                    {`>`}
                </button>
            </div>
        </>
    );
}