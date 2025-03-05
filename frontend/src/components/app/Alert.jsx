import { Alert } from "@chakra-ui/react"

export function ErrorAlert({ message }) {
  return (
    <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Title>{message}</Alert.Title>
    </Alert.Root>
  )
}
