import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import { Container, Flex, Text, Button, Box } from "@chakra-ui/react";
import ProgressBar from "../../components/app/ProgressBar";
import FieldInput from "../../components/app/FieldInput";
import { ErrorAlert } from "../../components/app/Alert";
// PDF Download
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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
      });
      setProfile(response.data.profile);
      setUserInfo(response.data.user);
      setAnswers(response.data.answers);
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

  const exportToPDF = () => {
    const input = document.getElementById("pdf-content");

    html2canvas(input, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();

      const formattedDate = `${day}-${month}-${year}`;
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      const fileName = `${userInfo.first_name}_${userInfo.last_name}_${formattedDate}_resultat_profil.pdf`;
      pdf.save(fileName);
    });
  };

  const isAllQuestionsAnswered = Object.keys(answers).length === questions.length;

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
          {isAllQuestionsAnswered && profile && (
            <Flex justify="end" mb={4} mt={4}>
              <Button onClick={exportToPDF} colorPalette="blue">
                Télécharger en PDF
              </Button>
            </Flex>
          )}

          <div id="pdf-content">

          <Text textStyle='xl' fontWeight="bold" textAlign="center" mb={4} mt={4}>
            Résultat du questionnaire
          </Text>

          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={4} mb={4}>
            <Box textAlign="left" display="flex" flexDirection="column" alignItems="flex-start">
              <Box mb={2}>
                <Text as="strong">Prénom :</Text> {userInfo.first_name}
              </Box>
              <Box mb={2}>
                <Text as="strong">Nom :</Text> {userInfo.last_name}
              </Box>
              <Box mb={2}>
                <Text as="strong">Email :</Text> {userInfo.email}
              </Box>
            </Box>
          </Box>

            <Text textStyle='xl' fontWeight="bold" textAlign="center" mb={4} mt={4}>
              Votre profil est : {profile}
            </Text>

            <Text fontWeight="bold" mt={4} mb={4}>
              Réponses :
            </Text>
            <ul>
              {answers.map((answer, index) => (
                <li key={index} style={{ marginBottom: '1rem' }}>
                  <strong>{index + 1}. Question :</strong> {answer.question} <br />
                  <strong>Réponse :</strong> {answer.answer}
                </li>
              ))}
            </ul>
            <br />
          </div>
        </>
      )}
    </Container>
  );
};
