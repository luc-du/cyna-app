import CTAButton from "../shared/buttons/CTAButton";

const CGV = ({ isInModal = false }) => {
  return (
    <main
      className="h-full max-h-50 max-w-4xl mx-auto p-6 space-y-6 sm: overflow-auto"
      role="main"
      aria-labelledby="cgv-title"
    >
      <h1
        id="cgv-title"
        className="text-3xl font-bold text-gray-900 dark:text-white"
      >
        Conditions Générales de Vente (CGV)
      </h1>

      <section
        className="prose prose-sm dark:prose-invert max-w-none text-justify"
        aria-label="Contenu des conditions générales de vente"
      >
        <p>
          <strong>1. Objet</strong>
          <br />
          Les présentes Conditions Générales de Vente (CGV) régissent les
          modalités de souscription aux services proposés sur la plateforme{" "}
          <strong>Cyna</strong>.
        </p>

        <p>
          <strong>2. Description du service</strong>
          <br />
          Cyna propose des services dématérialisés accessibles par abonnement
          mensuel ou annuel, selon les modalités précisées lors de la commande.
        </p>

        <p>
          <strong>3. Conditions d'accès</strong>
          <br />
          L'accès aux services nécessite :<br />- la création d’un compte
          utilisateur,
          <br />- la fourniture d’une adresse de facturation valide,
          <br />- un moyen de paiement valide.
        </p>

        <p>
          <strong>4. Prix et modalités de paiement</strong>
          <br />
          Les prix affichés sont exprimés en euros TTC. Le paiement est exigible
          à la commande, via carte bancaire, en une seule fois ou par récurrence
          mensuelle selon le plan choisi.
        </p>

        <p>
          <strong>5. Droit de rétractation</strong>
          <br />
          Conformément à l’article L221-28 du Code de la consommation, le droit
          de rétractation ne s’applique pas aux services numériques pleinement
          exécutés avec l’accord préalable de l’utilisateur.
        </p>

        <p>
          <strong>6. Résiliation et remboursement</strong>
          <br />
          L'utilisateur peut résilier son abonnement à tout moment depuis son
          espace personnel. Toute période entamée est due et non remboursable.
        </p>

        <p>
          <strong>7. Responsabilité</strong>
          <br />
          La plateforme Cyna s’engage à fournir un service conforme à sa
          description. Elle ne saurait être tenue responsable en cas de force
          majeure ou de défaillance extérieure à ses systèmes.
        </p>

        <p>
          <strong>8. Données personnelles</strong>
          <br />
          Les données collectées sont nécessaires à la gestion de votre
          abonnement. Elles sont traitées conformément à notre politique de
          confidentialité.
        </p>

        <p>
          <strong>9. Acceptation</strong>
          <br />
          L'utilisateur reconnaît avoir pris connaissance des présentes CGV et
          les accepter pleinement en validant sa commande.
        </p>
      </section>

      <div className="flex items-center justify-end pt-6">
        {!isInModal && (
          <CTAButton
            type="button"
            link={"/"}
            label="Retour à l'accueil"
            aria-label="Retour à l’accueil de la plateforme"
          />
        )}
      </div>
    </main>
  );
};

export default CGV;
