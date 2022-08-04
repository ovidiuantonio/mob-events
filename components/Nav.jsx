import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { IoIosMenu } from 'react-icons/io'
import { IoCloseOutline } from 'react-icons/io5'

function Nav() {
  const [open, setOpen] = useState(false);


  return (
    <div className={"navBar" + (open ? " navBar-open" : "")}>
      <div className="navBar-top">
        <Link href={"/"}>
          <a>
            <Logo className='Logo' />
          </a>
        </Link>

        {
          open ? <IoCloseOutline className="navBar-close" onClick={() =>
            setOpen(false)} /> : <IoIosMenu className="navBar-burger" onClick={() =>
              setOpen(true)
            } />

        }
      </div>

      <div className={"navBar-bottom" + (open ? " navBar-bottom-open" : "")} >
        <ul className='Links'>
          <li className='listItem'>
            <Link href={"/"}>
              <a className='Link' onClick={() =>
                setOpen(false)}>HOME</a>
            </Link>
          </li>
          <li className='listItem'>
            <Link href={"/faq"}>
              <a className='Link' onClick={() =>
                setOpen(false)}>FAQ</a>
            </Link>
          </li>
          <li className='listItem'>
            <Link href={"/sponsorships"}>
              <a className='Link' onClick={() =>
                setOpen(false)}>SPONSORSHIPS</a>
            </Link>
          </li>
          <li className='listItem'>
            <Link href={"/events"}>
              <a className='Link' onClick={() =>
                setOpen(false)}>EVENTS</a>
            </Link>
          </li>
          <li className='listItem listItem-Buy'>
            <Link href={"/events/upcoming-events"}>
              <a className='Link Link-Buy' onClick={() =>
                setOpen(false)}>BUY NOW</a>
            </Link>
          </li>
        </ul>
        <p className='copyright'>© MOB EVENTS. All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Nav;
