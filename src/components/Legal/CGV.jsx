import CTAButton from "@shared/buttons/CTAButton";
import PropTypes from "prop-types";

const CGV = ({ isInModal = false }) => {
  return (
    /* 📌🔩fix scroll max-h-screen overflow-auto */
    <article
      className="container-text max-h-screen overflow-auto"
      aria-labelledby="cgv-title"
    >
      <header>
        <h1
          id="cgv-title"
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          Conditions Générales de Vente (CGV)
        </h1>
      </header>

      <div className="prose prose-sm dark:prose-invert max-w-none text-justify">
        <section aria-labelledby="objet-heading">
          <h2 id="objet-heading" className="font-bold">
            1. Objet
          </h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent les
            modalités de souscription aux services proposés sur la plateforme{" "}
            <strong>Cyna</strong>.
          </p>
        </section>

        <section aria-labelledby="description-heading">
          <h2 id="description-heading" className="font-bold">
            2. Description du service
          </h2>
          <p>
            Cyna propose des services dématérialisés accessibles par abonnement
            mensuel ou annuel, selon les modalités précisées lors de la
            commande.
          </p>
        </section>

        <section aria-labelledby="acces-heading">
          <h2 id="acces-heading" className="font-bold">
            3. Conditions d&apos;accès
          </h2>
          <p>L&apos;accès aux services nécessite :</p>
          <ul>
            <li>la création d’un compte utilisateur,</li>
            <li>la fourniture d’une adresse de facturation valide,</li>
            <li>un moyen de paiement valide.</li>
          </ul>
        </section>

        <section aria-labelledby="prix-paiement-heading">
          <h2 id="prix-paiement-heading" className="font-bold">
            4. Prix et modalités de paiement
          </h2>
          <p>
            Les prix affichés sont exprimés en euros TTC. Le paiement est
            exigible à la commande, via carte bancaire, en une seule fois ou par
            récurrence mensuelle selon le plan choisi.
          </p>
        </section>

        <section aria-labelledby="retractation-heading">
          <h2 id="retractation-heading" className="font-bold">
            5. Droit de rétractation
          </h2>
          <p>
            Conformément à l’article L221-28 du Code de la consommation, le
            droit de rétractation ne s’applique pas aux services numériques
            pleinement exécutés avec l’accord préalable de l’utilisateur.
          </p>
        </section>

        <section aria-labelledby="resiliation-heading">
          <h2 id="resiliation-heading" className="font-bold">
            6. Résiliation et remboursement
          </h2>
          <p>
            L&apos;utilisateur peut résilier son abonnement à tout moment depuis
            son espace personnel. Toute période entamée est due et non
            remboursable.
          </p>
        </section>

        <section aria-labelledby="responsabilite-heading">
          <h2 id="responsabilite-heading" className="font-bold">
            7. Responsabilité
          </h2>
          <p>
            La plateforme Cyna s’engage à fournir un service conforme à sa
            description. Elle ne saurait être tenue responsable en cas de force
            majeure ou de défaillance extérieure à ses systèmes.
          </p>
        </section>

        <section aria-labelledby="donnees-personnelles-heading">
          <h2 id="donnees-personnelles-heading" className="font-bold">
            8. Données personnelles
          </h2>
          <p>
            Les données collectées sont nécessaires à la gestion de votre
            abonnement. Elles sont traitées conformément à notre politique de
            confidentialité.
          </p>
        </section>

        <section aria-labelledby="acceptation-heading">
          <h2 id="acceptation-heading" className="font-bold">
            9. Acceptation
          </h2>
          <p>
            L&apos;utilisateur reconnaît avoir pris connaissance des présentes
            CGV et les accepter pleinement en validant sa commande.
          </p>
        </section>
      </div>

      <footer className="flex items-center justify-end pt-6">
        {!isInModal && (
          <CTAButton
            type="button"
            link={"/"}
            label="Retour à l'accueil"
            aria-label="Retour à l’accueil de la plateforme"
          />
        )}
      </footer>
    </article>
  );
};

export default CGV;

CGV.propTypes = {
  isInModal: PropTypes.bool.isRequired,
};
