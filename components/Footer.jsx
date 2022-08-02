import { FaInstagram, FaTiktok } from "react-icons/fa";
import Logo from "./Logo";
import Link from "next/link";

function Footer() {
  const emailWindow = () => {
    window.location.href =
      "mailto:contact@mobevents.com?subject=Info&body=Message";
  };

  return (
    <div className='footer'>
      <div className='footer-section footer-mob'>
        <Link href={"/"}>
          <a>
            <Logo className='footer-logo' />
          </a>
        </Link>

        <div className='footer-socialmedia'>
          <a href={"https://www.instagram.com/mobeventss/"} target='_blank'>
            <FaInstagram className='footer-logo-instagram' />
          </a>
          <a href={"https://www.tiktok.com/@mobsummerhouse"} target='_blank'>
            <FaTiktok className='footer-logo-tiktok' />
          </a>
        </div>
      </div>

      <div className='footer-section footer-links'>
        <p className='footer-category-title'>LINKS</p>
        <ul className='footer-list'>
          <Link href={"/"}>
            <a className='footer-link'>HOME</a>
          </Link>
          <Link href={"/faq"}>
            <a className='footer-link'>FAQ</a>
          </Link>
          <Link href={"/sponsorships"}>
            <a className='footer-link'>SPONSORSHIPS</a>
          </Link>
          <Link href={"/events/upcoming-events"}>
            <a className='footer-link'>BUY NOW</a>
          </Link>
        </ul>
      </div>

      <div className='footer-section footer-contact'>
        <p className='footer-category-title'>CONTACT</p>
        <ul className='footer-list'>
          <a onClick={emailWindow} className='footer-link footer-email'>
            contact@mobevents.com
          </a>
          <a href='tel://+40723123123' className='footer-link'>
            0723123123
          </a>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
