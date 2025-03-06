import { Button, Center } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  const onClick = () => {
    navigate("/surveys/1");
  }

  return (
    <Center>
      <Button onClick={onClick} colorPalette="blue">Commencer l'évaluation</Button>
    </Center>
  );
};
