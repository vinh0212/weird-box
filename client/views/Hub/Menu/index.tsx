import { useAtom } from "jotai";
import { useState } from "react";
import { animated } from "react-spring";
import { GameMatchingStatus } from "../../../../shared/@types";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../../shared/constants";
import { roomAtom } from "../../../atoms";
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import { useListenServerEvent, useRevealAnimation } from "../../../hooks";
import socket from "../../../services/socket";
import { centerizeContainerStyle, gridStyle } from "../../../styles";
import { optionMenuStyle } from "./styles";

const Menu = (): JSX.Element => {
  const [room] = useAtom(roomAtom);
  const [isMatching, matching] = useState(false);
  const transitions = useRevealAnimation(isMatching);

  const findGame = () => {
    socket.emit(CLIENT_EVENT_NAME.FindGame);
  };

  const createRoom = () => {
    socket.emit(CLIENT_EVENT_NAME.CreateRoom);
  };

  useListenServerEvent(SERVER_EVENT_NAME.UpdateGameMatchingStatus, (status: GameMatchingStatus) =>
    matching(status !== "canceled")
  );

  return (
    <div css={optionMenuStyle}>
      {transitions.map(({ item, props }) =>
        item ? (
          <animated.div style={props} key="finding">
            <Loading text="Finding opponents..." />
          </animated.div>
        ) : (
          <animated.div style={props} css={[gridStyle, centerizeContainerStyle]} key="menu">
            {!room && (
              <>
                <Button onClick={createRoom}>Create room</Button>
              </>
            )}
            {(!room || (room && room.owner === socket.id)) && <Button onClick={findGame}>Find game</Button>}
            <Button>How to play</Button>
            <Button>About</Button>
          </animated.div>
        )
      )}
    </div>
  );
};

export default Menu;
