import CTAButton from "../shared/buttons/CTAButton";

const PrivacyPolicy = () => {
  return (
    <main
      className="max-w-4xl mx-auto p-6 space-y-6"
      role="main"
      aria-labelledby="privacy-title"
    >
      <h1
        id="privacy-title"
        className="text-3xl font-bold text-gray-900 dark:text-white"
      >
        Politique de confidentialité
      </h1>

      <section
        className="prose prose-sm dark:prose-invert max-w-none text-justify"
        aria-label="Contenu de la politique de confidentialité"
      >
        <p>
          <strong>1. Introduction</strong>
          <br />
          La présente politique de confidentialité décrit les données
          personnelles collectées par la plateforme Cyna, la manière dont elles
          sont utilisées, et vos droits concernant ces données.
        </p>

        <p>
          <strong>2. Données collectées</strong>
          <br />
          Lors de l’inscription et de l’utilisation du service, nous collectons
          les données suivantes :<br />- Nom et prénom
          <br />- Adresse email
          <br />
          - Adresse postale
          <br />- Données de paiement (traitées via un prestataire tiers
          sécurisé)
        </p>

        <p>
          <strong>3. Finalité de la collecte</strong>
          <br />
          Ces données sont utilisées pour :<br />- La gestion de votre compte
          utilisateur
          <br />- La facturation des services
          <br />- L’envoi de notifications liées à votre abonnement
        </p>

        <p>
          <strong>4. Partage des données</strong>
          <br />
          Vos données ne sont jamais revendues. Elles peuvent être partagées
          uniquement avec des prestataires nécessaires à l'exécution du service
          (ex : Stripe).
        </p>

        <p>
          <strong>5. Sécurité</strong>
          <br />
          Les données sont stockées de manière sécurisée. Les informations
          sensibles (comme les cartes bancaires) sont gérées par un prestataire
          conforme PCI-DSS.
        </p>

        <p>
          <strong>6. Vos droits</strong>
          <br />
          Conformément au RGPD, vous disposez des droits suivants :<br />- Droit
          d’accès
          <br />- Droit de rectification
          <br />- Droit à l’effacement
          <br />
          - Droit d’opposition
          <br />
          Vous pouvez exercer ces droits en contactant notre support.
        </p>

        <p>
          <strong>7. Conservation</strong>
          <br />
          Les données sont conservées pendant toute la durée de votre
          abonnement, puis archivées ou supprimées conformément à la législation
          en vigueur.
        </p>

        <p>
          <strong>8. Contact</strong>
          <br />
          Pour toute question relative à la confidentialité de vos données, vous
          pouvez nous contacter à l’adresse suivante : support@cyna.dev
        </p>
      </section>

      <div className="flex items-center justify-end pt-6">
        <CTAButton
          type="button"
          link="/"
          label="Retour à l'accueil"
          aria-label="Retour à l’accueil de la plateforme"
        />
      </div>
    </main>
  );
};

export default PrivacyPolicy;
