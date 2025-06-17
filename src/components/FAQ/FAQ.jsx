import { useState } from "react";
import { faqsData } from "./faqsData";

/**
 * Page Foire Aux Questions (FAQ)
 * Affiche une liste de questions/réponses avec accordéon accessible.
 * Gère le contraste couleur pour le dark mode.
 * @returns {JSX.Element}
 */
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  /**
   * Gère l’ouverture/fermeture d’un panneau FAQ.
   * @param {number} index
   */
  const toggleQuestion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const faqs = faqsData;

  return (
    <div
      className="container-text mx-4"
      role="region"
      aria-labelledby="faq-page-title"
    >
      <h1 id="faq-page-title" className="text-3xl font-bold mb-6 text-center">
        Foire Aux Questions
      </h1>

      <div
        className="space-y-4 p-6 rounded-xl shadow-md"
        style={{
          backgroundColor: "var(--faq-bg)",
        }}
        role="group"
        aria-label="Questions fréquentes et leurs réponses"
      >
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-200 dark:border-gray-700 pb-4"
          >
            <h2 id={`faq-question-heading-${index}`} className="sr-only">
              {faq.question}
            </h2>
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full text-left font-medium text-lg focus:outline focus:ring-2 flex justify-between items-center"
              aria-expanded={openIndex === index}
              aria-controls={`faq-panel-${index}`}
              id={`faq-question-${index}`}
            >
              {faq.question}
              <span className="ml-2" aria-hidden="true">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {/* Début de la modification ici */}
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              // Ajustements CSS pour une transition douce sans "upscaling"
              className={`mt-2 text-sm transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
              // Le max-h-96 est un exemple, ajustez cette valeur pour qu'elle soit
              // suffisamment grande pour contenir la plus longue réponse de votre FAQ.
              // Vous pouvez aussi utiliser un max-h plus grand comme max-h-[500px] ou plus si nécessaire.
            >
              {faq.answer}
            </div>
            {/* Fin de la modification */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
