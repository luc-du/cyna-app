import PropTypes from "prop-types";

/**
 * Affiche une section individuelle des paramètres avec un titre et un contenu custom.
 * @param {string} title - Titre de la section
 * @param {React.ReactNode} children - Contenu de la section
 */
const AccountSettingsSection = ({ title, children }) => {
  return (
    <section className="border border-slate-200 rounded-xl p-4 space-y-2">
      <h3 className="text-md font-semibold text-gray-800">{title}</h3>
      <div>{children}</div>
    </section>
  );
};

AccountSettingsSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AccountSettingsSection;
