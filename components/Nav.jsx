import React from "react";
import Logo from "./Logo";
import Link from "next/link";

function Nav() {
  return (
    <div className={"navBar"}>
      <Link href={"/"}>
        <a>
          <Logo className='Logo' />
        </a>
      </Link>

      <ul className='Links'>
        <li className='listItem'>
          <Link href={"/"}>
            <a className='Link'>HOME</a>
          </Link>
        </li>
        <li className='listItem'>
          <Link href={"/faq"}>
            <a className='Link'>FAQ</a>
          </Link>
        </li>
        <li className='listItem'>
          <Link href={"/sponsorships"}>
            <a className='Link'>SPONSORSHIPS</a>
          </Link>
        </li>
        <li className='listItem'>
          <Link href={"/events"}>
            <a className='Link'>EVENTS</a>
          </Link>
        </li>
        <li className='listItem listItem-Buy'>
          <Link href={"/events/upcoming-events"}>
            <a className='Link Link-Buy'>BUY NOW</a>
          </Link>
        </li>
      </ul>
      <p className='copyright'>© MOB EVENTS. All Rights Reserved</p>
    </div>
  );
}

export default Nav;
