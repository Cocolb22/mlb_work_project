import { Center, Progress, HStack } from "@chakra-ui/react"
import { useMemo } from "react"

export default function ProgressBar({questionsIndex, totalQuestions}) {
  const progress = useMemo(() => (questionsIndex / totalQuestions) * 100, [questionsIndex, totalQuestions]);

  return (
    <Center marginBottom={12}>
      <Progress.Root size="lg" width="100%" value={progress} colorPalette="blue">
      <HStack gap="5">
        <Progress.Track flex="1">
          <Progress.Range />
        </Progress.Track>
        <Progress.ValueText>Question {questionsIndex}/{totalQuestions}</Progress.ValueText>
      </HStack>
      </Progress.Root>
    </Center>
  );
};
