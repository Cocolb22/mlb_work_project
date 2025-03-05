import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api"; // Import de l'instance Axios

const Surveys = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    api.get("/api/v1/surveys")
      .then((response) => {
        setSurveys(response.data); // Axios met les données directement dans `.data`
        console.log("Questionnaires récupérés :", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des questionnaires :", error);
      });
  }, []);

  return (
    <div>
      <h1>Liste des questionnaires</h1>
      <ul>
        {surveys.map((q) => (
          <li key={q.id}>
            <Link to={`/survey/${q.id}`}>{q.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Surveys;
