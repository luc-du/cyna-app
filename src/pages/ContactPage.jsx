import Contact from "@components/Contact/Contact";
import { Helmet } from "react-helmet-async";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact | CYNA</title>
        <meta
          name="description"
          content="Une question, un besoin ? Contactez l'équipe CYNA pour en savoir plus sur nos solutions cybersécurité."
        />
      </Helmet>
      <Contact />
    </>
  );
};

export default ContactPage;
