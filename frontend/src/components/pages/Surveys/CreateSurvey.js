import { useState } from "react";
import api from "../../utils/api";

const CreateSurvey = () => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await api.post("/api/v1/surveys", {
        name,
      });
      console.log("Questionnaire créé:", response.data);
      // Réinitialiser le formulaire après soumission
      setName("");
    } catch (error) {
      console.error("Erreur lors de la création du questionnaire:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Créer un Questionnaire</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom du questionnaire</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "Créer le Questionnaire"}
        </button>
      </form>
    </div>
  );
};

export default CreateSurvey;
