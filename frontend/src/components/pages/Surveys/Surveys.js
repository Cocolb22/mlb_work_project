import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";

const Survey = () => {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  console.log("ID récupéré depuis l'URL :", id);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userInfo, setUserInfo] = useState({ first_name: "", last_name: "", email: "" });
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    api.get(`/api/v1/surveys/${id}`)
      .then(response => {
        console.log("réponse", response.data);
        setQuestions(response.data.questions); // Corrigé ici
      })
      .catch(error => console.error("Erreur de chargement des questions :", error.response?.data || error));
  }, [id]);

  const handleAnswerSelection = (questionId, answerId) => {
    setAnswers({ ...answers, [questionId]: answerId });
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitAnswers();
    }
  };

  const submitAnswers = () => {
    api.post("/api/v1/user_answers", {
      ...userInfo,
      answers: Object.keys(answers).map(questionId => ({
        question_id: questionId,
        answer_id: answers[questionId],
      }))
    })
    .then(response => alert(`Votre profil est : ${response.data.profile}`))
    .catch(error => console.error("Erreur d'envoi des réponses :", error));
  };

  if (!questions.length) return <p>Chargement...</p>;

  return (
    <>
      {showModal && (
        <div className="modal">
          <h2>Informations utilisateur</h2>
          <input type="text" placeholder="Prénom" onChange={e => setUserInfo({ ...userInfo, first_name: e.target.value })} />
          <input type="text" placeholder="Nom" onChange={e => setUserInfo({ ...userInfo, last_name: e.target.value })} />
          <input type="email" placeholder="Email" onChange={e => setUserInfo({ ...userInfo, email: e.target.value })} />
          <button onClick={() => setShowModal(false)}>Commencer le questionnaire</button>
        </div>
      )}

      {!showModal && (
        <div className="question-container">
          <h2>{questions[currentQuestionIndex].content}</h2>
          {questions[currentQuestionIndex].answers.map(answer => (
            <button key={answer.id} onClick={() => handleAnswerSelection(questions[currentQuestionIndex].id, answer.id)}>
              {answer.content}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Survey;
