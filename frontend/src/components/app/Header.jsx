import { Container, Text } from "@chakra-ui/react"

export default function Header() {
  return (
    <Container padding={12} >
      <Text textStyle="3xl" fontWeight="bold" textAlign="center" mb={4}>Évaluation de votre profil de risque</Text>
      <Text textStyle="lg" textAlign="center">Découvrez votre profil de risque en répondant à quelques questions</Text>
    </Container>
  );
};
