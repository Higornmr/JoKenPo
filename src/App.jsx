import { useEffect } from "react";
import { useState } from "react";
import { ActionsGame } from "./components/actions-game";
import { Button } from "./components/button";
import { Input } from "./components/input";
import { Modal } from "./components/modal";
import { Score } from "./score";
import * as C from "./styeles/index";

const messages = {
  rules: {
    title: "Regras",
    message:
      'Jo ken pô, é um jogo em que as pessoas jogam com as mãos, escolhendo entre pedra (mão fechada), papel (mão espalmada) e tesoura (dois dedos a frente). O jogo é similar ao "par ou ímpar", porém com uma variável a mais. E funciona assim: Cada jogador escolhe uma opção. A tesoura corta o papel, mas quebra com a pedra; o papel embrulha a pedra, mas é cortado pela tesoura e a pedra quebra a tesoura e é embrulhada pelo papel. O desafio aqui é vencer o computador 10 vezes! Faça a sua escolha e boa sorte!',
  },
  user: {
    title: "Usuário",
    message: "Preencha um nome para o jogador",
  },
  computerWin: {
    title: "Que Pena !",
    message: "Não foi dessa vez, tente novamente !",
  },
  playerWin: {
    title: "Parabéns !",
    message: "Você venceu !",
  },
};

const valueTypeEnum = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const actions = [
  {
    value: 1,
    label: "👊",
    description: "Rock",
  },
  {
    value: 2,
    label: "🖐",
    description: "Paper",
  },
  {
    value: 3,
    label: "✌",
    description: "Scissors",
  },
];

function App() {
  const [titleModal, setTitleModal] = useState("");
  const [messageModal, setMessageModal] = useState("");
  const [open, setOpen] = useState(false);
  const [textGame, setTextGame] = useState("Iniciar jogo !");
  const [scorePlayerValue, setScorePlayerValue] = useState(0);
  const [scoreComputerValue, setScoreComputerValue] = useState(0);
  const [userAction, setUserAction] = useState("❓");
  const [computerAction, setComputerAction] = useState("❓");
  const [userName, setUserName] = useState("Jogador");
  const [playGame, setPlayGame] = useState(false);
  const SCORE_TO_WIN = 10;

  const handleOpenModal = (type) => {
    if (!type) {
      setOpen(false);
      setTitleModal("");
      setMessageModal("");
      return;
    }
    setTitleModal(messages?.[type]?.title);
    setMessageModal(messages?.[type]?.message);
    setOpen(true);
  };

  const randomActionCumputer = () => {
    const number = Math.floor(Math.random() * actions.length);
    return actions[number];
  };

  const handleClick = (value) => {
    setUserAction(value.label);
    const actionComputer = randomActionCumputer();
    setComputerAction(actionComputer.label);
    checkWinner(value.value, actionComputer.value);
  };

  const checkWinner = (playerValue, computerValue) => {
    const playerRockWin =
      playerValue == valueTypeEnum.ROCK &&
      computerValue == valueTypeEnum.SCISSORS;

    const playerPaperWin =
      playerValue == valueTypeEnum.PAPER && computerValue == valueTypeEnum.ROCK;

    const playerScissorskWin =
      playerValue == valueTypeEnum.SCISSORS &&
      computerValue == valueTypeEnum.PAPER;

    const drawerResult = playerValue == computerValue;
    const playerWin = playerRockWin || playerPaperWin || playerScissorskWin;

    if (drawerResult) return setTextGame("Empate 🙄 Jogue novamente !");
    if (playerWin) {
      setScorePlayerValue((state) => state + 1);
      return setTextGame("Vítoria 😎 Jogue novamente !");
    }
    setScoreComputerValue((state) => state + 1);
    return setTextGame("Derrota 😮 Jogue novamente !");
  };

  const handleUserName = (value) => {
    if (!value) return;
    setUserName("Jogador");
    setUserName(value);
  };

  const startGame = () => {
    if (userName === "Jogador") {
      handleOpenModal("user");
      return;
    }
    if (playGame) return resetValues();
    setPlayGame(true);
  };

  const resetValues = () => {
    setTextGame("Iniciar o jogo");
    setPlayGame(false);
    setScorePlayerValue(0);
    setScoreComputerValue(0);
    setUserAction("❓");
    setComputerAction("❓");
  };

  useEffect(() => {
    const checkVictory = () => {
      const playerWin = scorePlayerValue == SCORE_TO_WIN;
      const computerWin = scoreComputerValue == SCORE_TO_WIN;
      if (playerWin) return handleOpenModal("playerWin");
      if (computerWin) return handleOpenModal("computerWin");
    };

    checkVictory();
  }, [scorePlayerValue, scoreComputerValue]);

  return (
    <C.Container>
      <C.Flex direction="column">
        <C.Typography fontWeight="400" sizi="32px" LineHeight="48px">
          Jo Ken Pô
        </C.Typography>
        <Input
          placeholder="Digite o nome do jogador"
          onChange={(value) => handleUserName(value)}
        />
        <Button onClick={startGame}>{playGame ? "Parar" : "Iniciar"}</Button>
        <Score
          userName={userName}
          scorePlayer={scorePlayerValue}
          scoreComputer={scoreComputerValue}
        />

        <C.Spacer margin="10px" />

        <C.Flex justify="space-around">
          <C.Typography sizi="32px">{userAction}</C.Typography>

          <C.Typography sizi="32px">{computerAction}</C.Typography>
        </C.Flex>

        <C.Flex direction="column" gap="0">
          <C.Typography>{textGame}</C.Typography>

          <C.Rules onClick={() => handleOpenModal("rules")}>Regras</C.Rules>
        </C.Flex>

        <ActionsGame
          actions={actions}
          onClick={(value) => handleClick(value)}
          disabled={!playGame}
        />

        <Modal
          open={open}
          titleModal={titleModal}
          messageModal={messageModal}
          handleOpenModal={() => handleOpenModal(null)}
        />
      </C.Flex>
    </C.Container>
  );
}

export default App;
