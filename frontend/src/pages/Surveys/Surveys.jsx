import React, { Fragment,useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import { Container, Flex, Text, Button } from "@chakra-ui/react"
import ProgressBar from "../../components/app/ProgressBar"
import FieldInput from "../../components/app/FieldInput"
import { ErrorAlert } from "../../components/app/Alert"

export default function Surveys() {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userInfo, setUserInfo] = useState({ first_name: null, last_name: null, email: null });
  const [showUserForm, setShowUserForm] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await api.get(`/api/v1/surveys/${id}`);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Erreur de chargement des questions :", error.response?.data || error);
      }
    }
    fetchQuestions();
  }, [id]);


  const closeModal = () => {
    if (userInfo.first_name && userInfo.last_name && userInfo.email) {
      setShowUserForm(false);
    } else {
      setShowAlert(true);
    }
  };

  const submitAnswers = useCallback(async (userInfo, finalAnswers) => {
    try {
      const response = await api.post("/api/v1/user_answers", {
        user: {
          ...userInfo
        },
        answers: Object.keys(finalAnswers).map(questionId => ({
          question_id: questionId,
          answer_id: finalAnswers[questionId],
        }))
      })
      setProfile(response.data.profile);
    } catch (error) {
      console.error("Erreur d'envoi des réponses :", error);
    }
  }, []);

  const handleAnswerSelection = useCallback((questionId, answerId) => {
    setAnswers(prevAnswers => {
      const updatedAnswers = { ...prevAnswers, [questionId]: answerId };
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        submitAnswers(userInfo, updatedAnswers);
      }
      return updatedAnswers;
    });
  }, [userInfo, currentQuestionIndex, questions.length, submitAnswers]);


  const onPreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  return (
    <Container maxWidth={'75vw'}>
        {showUserForm && (
          <>
            <Text textStyle='xl' fontWeight="bold" textAlign="center" mb={4}>Informations utilisateur</Text>
            <Flex gap="4" direction="column" justifyContent="center" alignItems="center" width="50%" margin="auto">
              <FieldInput
                label="Prénom"
                required
                errorText="Le prénom est requis"
                onChange={e => setUserInfo({ ...userInfo, first_name: e.target.value })}
              />
              <FieldInput
                label="Nom"
                required
                errorText="Le nom est requis"
                onChange={e => setUserInfo({ ...userInfo, last_name: e.target.value })}
              />
              <FieldInput
                label="Email"
                required
                errorText="L'email est requis"
                onChange={e => setUserInfo({ ...userInfo, email: e.target.value })}
                />
                {showAlert && (
                  <ErrorAlert message="Veuillez remplir tous les champs" />
                )}
              <Button onClick={closeModal} colorPalette="blue">Commencer le questionnaire</Button>
            </Flex>
          </>
        )}

        {questions.length === 0 && !showUserForm && (
          <p>Chargement...</p>
        )}

        {questions.length > 0 && !showUserForm && !profile && (
          <>
            <ProgressBar questionsIndex={currentQuestionIndex + 1} totalQuestions={questions.length} />
            <Text textStyle='xl' fontWeight="bold" textAlign="center" mb={4}>{questions[currentQuestionIndex].content}</Text>
            <Flex gap="4" direction="column" justifyContent="center" alignItems="center" margin="auto">
              {questions[currentQuestionIndex].answers
                .sort(() => Math.random() - 0.5)
                .map(answer => (
                  <Button
                    key={answer.id}
                    onClick={() => handleAnswerSelection(questions[currentQuestionIndex].id, answer.id)}
                    colorPalette="blue"
                    variant="subtle"
                    size="xl"
                  >
                    {answer.content}
                  </Button>
                ))
              }
              {currentQuestionIndex > 0 && (
                <Button onClick={onPreviousQuestion} margin={8} colorPalette="gray" variant="subtle">Précédent</Button>
              )}
            </Flex>
          </>
        )}
        {profile && (
          <>
            <Text textStyle='xl' fontWeight="bold" textAlign="center" mb={4}>Votre profil est : {profile}</Text>
          </>
        )}
    </Container>
  );
};
