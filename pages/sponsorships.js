import { ImArrowDown } from "react-icons/im";
import { useState } from "react";
import Buy from "../components/Buy";

export default function Sponsorships() {
  const [chapters, setChapters] = useState([
    {
      title: "Ce servicii oferim?",
      answer:
        "Selectam o locatie care se preteaza la orice isi doreste fiecare. Booking artistic (posibilitate de a aduce artistul dorit la un pret mai mic). Servicii de rulare reclame si marketing. Organizarea evenimentului (amenajare, servicii de paza, barmani, ospatari, sonorizare). Intocmirea actelor, contracte si servicii de contabilitate facute de firma noastra. Estimare costuri.",
      open: true,
    },
    {
      title: "Cum lucrezi cu noi?",
      answer:
        "Avem 2 modalitati simple de parteneriat: 1. 'Your own Boss' Daca vrei sa prinzi experienta unui patron de club, sa vezi daca esti in stare sa ai un rulaj mare de bani si sa gestionezi toate lucruile intr-o singura seara, acesta este pachetul pentru tine! Doar ne spui ceea ce vrei sa faci noi neocupam doar de organizare iar tu vii cu intreaga investitie si tot profitul iti revine tie, noi vom primi doar un mic comision de 300 euro pentru toate serivciile oferite! (Capital recomandat 10.000-15.000 euro). 2. “Safe and easy” Daca pur si simplu vrei sa obtii un profit usor, sau nu dispui de un capital mare si vrei sa nu risti mult, acest pachet este perfect pentru tine! Ne spui ceea ce doresti sa faci, ne ocupam noi de tot, inchiriem noi locatia dar avem barul, si un comision de 15% din bilete, mult mai putin decat orice patron de club! Cheltuielile tale vor fi doar pe artist/dj, paza, barman si reclame! (Capital recomandat 2.000-5.000 euro).",
      open: false,
    },
    {
      title: "Cum ne contactezi?",
      answer:
        "Ne faci o scurta prezentare la ceea ce iti doresti sa faci (orasul, locatia, artistul/ dj-ul dorit, capitalul tau, viziunea si dorintele tale, etc). Apoi ne trimiti prezentarea ta pe mail: mateii3321@gmail.com sau mesaj pe Instagram @matei3321.",
      open: false,
    },
  ]);

  const emailWindow = () => {
    window.location.href =
      "mailto:contact@mobevents.com?subject=Detalii Mob Sponsorship&body=Message";
  };

  return (
    <div>
      <div className='sponsorships'>
        <h1 className='categoryTitle'>MOB SPONSORSHIP</h1>
        <div className='chapters'>
          {chapters.map((chapter, i) => (
            <div className='chapter' key={i}>
              <div className='chapter-top'>
                <button
                  className='chapter-btn'
                  onClick={() =>
                    setChapters(
                      chapters.map((chapter, index) => {
                        if (index === i) {
                          chapter.open = !chapter.open;
                        } else {
                          chapter.open = false;
                        }

                        return chapter;
                      })
                    )
                  }
                  index={i}
                >
                  <ImArrowDown
                    className={chapter.open ? "arrow-up" : "arrow-down"}
                  />
                </button>
                <h2 className='chapter-title'>{chapter.title}</h2>
              </div>
              <div
                className={
                  "chapter-bottom" + (chapter.open ? "chapter-bottom-open" : "")
                }
              >
                <p className='chapter-text'>{chapter.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='cta-holder'>
          <div className='cta-holder-seemore'>
            <h2 className='seeall-text seeall-text-sponsor'>
              Vrei mai multe detalii?
            </h2>
          </div>
          <div className='cta-holder-buynow'>
            <h1 className='buynow-text buynow-text-email'>
              <a className='buynow-link' onClick={emailWindow}>
                Scrie-ne un email!
              </a>
            </h1>
          </div>
        </div>
      </div>

      <Buy />
    </div>
  );
}
