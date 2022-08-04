import { ImArrowDown } from "react-icons/im";
import { useState } from "react";
import Buy from "../components/Buy";

export default function Faq() {
  const [chapters, setChapters] = useState([
    {
      title: "De la ce vârsta pot veni la un eveniment?",
      answer:
        "Accesul este permis tuturor vârstelor, totuși dacă aveți sub 14 ani, ar fi indicat sa aveți un însoțitor.",
      open: true,
    },
    {
      title: "Consumația este obligatorie?",
      answer:
        "Consumația nu este obligatorie decât dacă doriți sa rezervați o masa, unde prețul diferă de la eveniment la eveniment.",
      open: false,
    },
    {
      title: "Cum cumpăr bilet?",
      answer:
        "Biletele se pot cumpăra online, de la noi de pe site dar se accepta doar plata cu cardul, sau din ziua evenimentului de la intrare la un preț puțin mai mare.",
      open: false,
    },
  ]);

  const emailWindow = () => {
    window.location.href =
      "mailto:contact@mobevents.com?subject=Your Question&body=Details";
  };

  return (
    <div>
      <div className="sponsorships">
        <h1 className="categoryTitle">FAQ</h1>
        <div className="chapters">
          {chapters.map((chapter, i) => (
            <div className="chapter" key={i}>
              <div className="chapter-top">
                <h2 className="chapter-title">
                  {" "}
                  <button
                    className="chapter-btn"
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
                  {chapter.title}
                </h2>
              </div>
              <div
                className={
                  "chapter-bottom" + (chapter.open ? "chapter-bottom-open" : "")
                }
              >
                <p className="chapter-text">{chapter.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cta-holder">
          <div className="cta-holder-seemore">
            <h2 className="seeall-text seeall-text-sponsor">
              Vrei mai multe detalii?
            </h2>
          </div>
          <div className="cta-holder-buynow">
            <h1 className="buynow-text buynow-text-email">
              <a className="buynow-link" onClick={emailWindow}>
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
