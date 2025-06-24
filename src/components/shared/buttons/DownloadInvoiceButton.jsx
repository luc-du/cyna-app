import { jsPDF } from "jspdf";
import PropTypes from "prop-types";
import { DownloadIcon, logoPng } from "../../../utils/indexImages";
import CTAButton from "./CTAButton";

/**
 * Composant pour télécharger une facture PDF de l’abonnement.
 *
 * @param {Object} props
 * @param {Object} props.subscription - Objet représentant l’abonnement.
 * @param {Object} props.user - Données utilisateur.
 * @param {string} props.date - Date formatée de souscription.
 */
export default function DownloadInvoiceButton({ subscription, user, date }) {
  const handleDownload = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const margin = 20;
    let y = margin;

    const img = new Image();
    img.src = logoPng;

    img.onload = () => {
      doc.addImage(img, "PNG", 150, 10, 40, 20);

      doc.setFontSize(16);
      doc.text("Facture d’abonnement", margin, y);
      y += 15;

      doc.setFontSize(12);
      doc.text(`Date de souscription : ${date ?? "Non disponible"}`, margin, y);
      y += 8;

      doc.text(`Numéro client : ${user?.customerId ?? "Inconnu"}`, margin, y);
      y += 8;

      doc.text(
        `Client : ${user?.firstname ?? ""} ${user?.lastname ?? ""}`,
        margin,
        y
      );
      y += 8;

      doc.text(
        `Produit : ${subscription?.productName ?? "Inconnu"}`,
        margin,
        y
      );
      y += 8;

      doc.text(`Montant payé : ${subscription?.amount} €`, margin, y);
      y += 8;

      const nom = user?.lastname?.replace(/\s+/g, "_") || "Nom";
      const prenom = user?.firstname?.replace(/\s+/g, "_") || "Prenom";
      const customerId = user?.customerId || "0000";
      const produit =
        subscription?.productName
          ?.replace(/\s+/g, "_")
          ?.replace(/[^\w_]/g, "") || "Produit";

      const filename = `facture-${nom}_${prenom}-${customerId}-${produit}.pdf`;

      doc.save(filename);
    };
  };

  return (
    <CTAButton
      label={
        <p>
          <DownloadIcon className="inline-block mr-2" />{" "}
          <span>Télécharger la facture PDF</span>
        </p>
      }
      handleClick={handleDownload}
      className="underline hover:text-gray-400"
      aria-label="Télécharger la facture PDF"
    />
  );
}

DownloadInvoiceButton.propTypes = {
  subscription: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
};
