import CTAButton from "@shared/buttons/CTAButton";

const LegalNotice = () => {
  return (
    <article className="container-text" aria-labelledby="privacy-title">
      <header>
        <h1
          id="privacy-title"
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          Politique de confidentialité
        </h1>
      </header>

      <div className="prose prose-sm dark:prose-invert max-w-none text-justify">
        <section aria-labelledby="intro-heading">
          <h2 id="intro-heading" className="font-bold">
            1. Introduction
          </h2>
          <p>
            La présente politique de confidentialité décrit les données
            personnelles collectées par la plateforme Cyna, la manière dont
            elles sont utilisées, et vos droits concernant ces données.
          </p>
        </section>

        <section aria-labelledby="data-collected-heading">
          <h2 id="data-collected-heading" className="font-bold">
            2. Données collectées
          </h2>
          <p>
            Lors de l’inscription et de l’utilisation du service, nous
            collectons les données suivantes :
          </p>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Adresse postale</li>
            <li>
              Données de paiement (traitées via un prestataire tiers sécurisé)
            </li>
          </ul>
        </section>

        <section aria-labelledby="purpose-heading">
          <h2 id="purpose-heading" className="font-bold">
            3. Finalité de la collecte
          </h2>
          <p>Ces données sont utilisées pour :</p>
          <ul>
            <li>La gestion de votre compte utilisateur</li>
            <li>La facturation des services</li>
            <li>L’envoi de notifications liées à votre abonnement</li>
          </ul>
        </section>

        <section aria-labelledby="sharing-heading">
          <h2 id="sharing-heading" className="font-bold">
            4. Partage des données
          </h2>
          <p>
            Vos données ne sont jamais revendues. Elles peuvent être partagées
            uniquement avec des prestataires nécessaires à l&apos;exécution du
            service (ex : Stripe).
          </p>
        </section>

        <section aria-labelledby="security-heading">
          <h2 id="security-heading" className="font-bold">
            5. Sécurité
          </h2>
          <p>
            Les données sont stockées de manière sécurisée. Les informations
            sensibles (comme les cartes bancaires) sont gérées par un
            prestataire conforme PCI-DSS.
          </p>
        </section>

        <section aria-labelledby="rights-heading">
          <h2 id="rights-heading" className="font-bold">
            6. Vos droits
          </h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li>Droit d’accès</li>
            <li>Droit de rectification</li>
            <li>Droit à l’effacement</li>
            <li>Droit d’opposition</li>
          </ul>
          <p>Vous pouvez exercer ces droits en contactant notre support.</p>
        </section>

        <section aria-labelledby="retention-heading">
          <h2 id="retention-heading" className="font-bold">
            7. Conservation
          </h2>
          <p>
            Les données sont conservées pendant toute la durée de votre
            abonnement, puis archivées ou supprimées conformément à la
            législation en vigueur.
          </p>
        </section>

        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="font-bold">
            8. Contact
          </h2>
          <p>
            Pour toute question relative à la confidentialité de vos données,
            vous pouvez nous contacter à l’adresse suivante :{" "}
            <a href="mailto:support@cyna.dev">support@cyna.dev</a>
          </p>
        </section>
      </div>

      <footer className="flex items-center justify-end pt-6">
        <CTAButton
          type="button"
          link="/"
          label="Retour à l'accueil"
          aria-label="Retour à l’accueil de la plateforme"
          className={"cta-secondary"}
        />
      </footer>
    </article>
  );
};

export default LegalNotice;
