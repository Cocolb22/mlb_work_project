import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/create-survey">Créer un Questionnaire</Link></li>
        <li><Link to="/create-question">Créer une Question</Link></li>
        <li><Link to="/add-questions-to-survey">Ajouter des Questions à un Questionnaire</Link></li>
        <li><Link to="/surveys">Liste des Questionnaires</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
