// src/pages/CreateQuestion.js
import { useState } from "react";
import api from "../../utils/api";

const CreateQuestion = () => {
  const [questionText, setQuestionText] = useState("");
  const [answerType, setAnswerType] = useState("text"); // Exemple : "text", "multiple_choice"
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await api.post("/api/v1/questions", {
        text: questionText,
        answer_type: answerType,
      });
      console.log("Question créée:", response.data);
      setQuestionText("");
      setAnswerType("text");
    } catch (error) {
      console.error("Erreur lors de la création de la question:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Créer une Question</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="questionText">Texte de la question</label>
          <input
            type="text"
            id="questionText"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="answerType">Type de réponse</label>
          <select
            id="answerType"
            value={answerType}
            onChange={(e) => setAnswerType(e.target.value)}
            required
          >
            <option value="text">Texte</option>
            <option value="multiple_choice">Choix multiple</option>
          </select>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "Créer la Question"}
        </button>
      </form>
    </div>
  );
};

export default CreateQuestion;
