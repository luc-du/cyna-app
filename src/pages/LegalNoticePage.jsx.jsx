import LegalNotice from "@components/Legal/LegalNotice";

import { Helmet } from "react-helmet-async";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Politique de confidentialité | CYNA</title>
        <meta
          name="description"
          content="Prenez connaissance de notre politique de confidentialité concernant l’utilisation de vos données personnelles chez CYNA."
        />
      </Helmet>
      <LegalNotice />
    </>
  );
};

export default PrivacyPolicyPage;
