"use client";

import React from "react";
import { useState, useEffect } from "react";
import styles from "@/components/paginationduplicate.module.css";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Image from "next/image";
function Items({ currentItems, itemOffset }) {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeIn" } },
  };

  return (
    <motion.div
      className={`${styles.eventsContainer} flex-row`}
      variants={variants}
      animate="visible"
      initial="hidden"
      key={itemOffset}
    >
      {currentItems.map((event) => (
        <Link
          key={event.eventId}
          href={{
            pathname: `/events/${event.eventId}`,
            query: { title: event.eventTitle },
          }}
          className={`${styles.eventItem}`}
        >
          {" "}
          {/* Event Item */}
          <div className={styles.imageContainer}>
            <Image
              src="/microsoft.png"
              alt="picture of Microsoft logo"
              height={40}
              width={40}
            />
          </div>
          <div className="flex flex-col pl-3 justify-between w-full">
            <div className="flex flex-col font-medium">
              <div>{event.eventId}</div>
              <div className={styles.companyTicker}>{event.companyId}</div>
            </div>
            <div className={styles.eventType}>
              <div>{event.eventType?.type}</div>
              <div>{new Date(event.eventDate).getFullYear()}</div>
            </div>
          </div>
        </Link>
      ))}
    </motion.div>
  );
}

export default function EventsPaginationDuplicate({ events }) {
  const items = events;
  const itemsPerPage = 3;

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} itemOffset={itemOffset} />

      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <span>
            <BsChevronRight />
          </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={
          <span>
            <BsChevronLeft />
          </span>
        }
        renderOnZeroPageCount={null}
        containerClassName={styles.paginationContainer}
        pageClassName={styles.page}
        pageLinkClassName={styles.pageLink}
        activeClassName={styles.active}
        previousClassName={styles.previous}
        previousLinkClassName={styles.previousLink}
        nextClassName={styles.next}
        nextLinkClassName={styles.nextLink}
        disabledClassName={styles.disabled}
      />
    </>
  );
}
