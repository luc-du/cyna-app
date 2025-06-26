/**
 * Page de contact du site Cyna.
 * Affiche les informations de contact (email, support, etc.).
 * Accessibilité renforcée : titres ARIA, structure HTML sémantique.
 * @component
 * @returns {JSX.Element}
 */
const Contact = () => {
  return (
    <div
      className="container-text"
      role="region"
      aria-labelledby="contact-page-title"
    >
      <h1
        id="contact-page-title"
        className="text-3xl font-bold mb-6 text-center"
        tabIndex={0}
      >
        Contactez-nous
      </h1>

      <section
        className="space-y-6 rounded-xl p-6 shadow-md"
        aria-labelledby="contact-section-title"
      >
        <h2
          id="contact-section-title"
          className="text-2xl font-semibold"
          tabIndex={0}
        >
          Informations utiles
        </h2>

        <p>
          Une question sur nos services ? Une demande de devis ou une difficulté
          avec votre compte ? Contactez notre équipe :
        </p>

        <ul className="space-y-3 list-disc list-inside">
          <li>
            Service client :{" "}
            <a
              href="mailto:service@cyna.fr"
              className="text-blue-600 dark:text-blue-400 underline focus:outline focus:ring-2"
            >
              service@cyna.fr
            </a>
          </li>
          <li>
            Support technique :{" "}
            <a
              href="mailto:support@cyna.fr"
              className="text-blue-600 dark:text-blue-400 underline focus:outline focus:ring-2"
            >
              support@cyna.fr
            </a>
          </li>
          <li>
            Recrutement / RH :{" "}
            <a
              href="mailto:rh@cyna.fr"
              className="text-blue-600 dark:text-blue-400 underline focus:outline focus:ring-2"
            >
              rh@cyna.fr
            </a>
          </li>
        </ul>

        <div className="pt-4">
          <p>
            Nous vous répondrons dans un délai de 24 à 48h ouvrées. N’hésitez
            pas à consulter notre{" "}
            <a
              href="/faq"
              className="underline text-blue-600 dark:text-blue-400"
            >
              FAQ
            </a>{" "}
            en attendant.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
