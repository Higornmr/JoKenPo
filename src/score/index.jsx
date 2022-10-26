import { Typography, Flex } from "../styeles";

export const Score = ({ userName, scorePlayer, scoreComputer }) => {
  userName = userName.length > 12 ? `${userName.slice(0, 8)}...` : userName;

  return (
    <Flex direction="column">
      <Typography size="32px" fontWeight="400" lineHeight="48px">
        Placar
      </Typography>

      <Flex justify="space-between">
        <Flex direction="column" gap="2px">
          <Typography>{userName}</Typography>
          <Typography>{scorePlayer}</Typography>
        </Flex>

        <Typography>X</Typography>

        <Flex direction="column" gap="2px">
          <Typography>Computador</Typography>
          <Typography>{scoreComputer}</Typography>
        </Flex>
      </Flex>
    </Flex>
  );
};
