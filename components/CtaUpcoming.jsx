function CtaUpcoming() {
  return (
    <div className='cta-holder'>
      <div className='cta-holder-seemore'>
        <h2 className='seeall-text'>
          <a href={"/events/upcoming-events"} className='seeall-link'>
            See all events
          </a>
        </h2>
      </div>
      <div className='cta-holder-buynow'>
        <h1 className='buynow-text'>
          <a href={"/events/upcoming-events"} className='buynow-link'>
            Buy your tickets now
          </a>
        </h1>
      </div>
    </div>
  );
}

export default CtaUpcoming;
