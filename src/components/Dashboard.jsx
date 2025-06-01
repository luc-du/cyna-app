import { useAuthEffect } from "../hooks/useAuthEffect";
import { useAutoLogout } from "../hooks/useAutoLogout";

const Dashboard = () => {
  useAuthEffect();
  useAutoLogout();

  return (
    <main
      className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-6"
      aria-label="Tableau de bord"
    >
      <section className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Tableau de bord</h1>
        <p className="text-center text-gray-700">
          Bienvenue dans votre espace utilisateur.
        </p>
        {/* TODO: widgets ou infos dynamiques ici */}
      </section>
    </main>
  );
};

export default Dashboard;
