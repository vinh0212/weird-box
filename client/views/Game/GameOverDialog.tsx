import { useAtom } from "jotai";
import { memo, useEffect, useState } from "react";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../shared/constants";
import { routeAtom, soundAtom } from "../../atoms";
import Dialog from "../../components/Dialog";
import { ROUTE } from "../../constants";
import socket from "../../services/socket";

const GameOverDialog = (): JSX.Element => {
  const [, changeRoute] = useAtom(routeAtom);
  const [sound] = useAtom(soundAtom);
  const [shouldShow, show] = useState(false);
  const [shouldVictory, victory] = useState(false);

  const backToHub = () => {
    socket.emit(CLIENT_EVENT_NAME.LeaveGame);
    changeRoute(ROUTE.Hub);
  };

  useEffect(() => {
    socket.once(SERVER_EVENT_NAME.GameOver, (id: string) => {
      show(true);
      console.log(id, socket.id);
      victory(id === socket.id);
      id === socket.id ? sound?.play("Victory") : sound?.play("Defeat");
    });
  }, []);

  return (
    <Dialog
      show={shouldShow}
      title={shouldVictory ? "victory" : "defeated"}
      yesMessage="Continue"
      onYes={backToHub}
      color={shouldVictory ? "#ece236" : "#122c4f"}
    >
      {shouldVictory ? <p>You are the Winner!</p> : <p>Better luck next time!</p>}
    </Dialog>
  );
};

export default memo(GameOverDialog);
