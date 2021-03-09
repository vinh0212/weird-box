import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { TransitionStatus } from "react-transition-group/Transition";
import COLOR from "../../../../constants/COLOR";
import SIZE from "../../../../constants/SIZE";
import { centerizeStyle, gridStyle, pixelBorderStyle } from "../../../../styles";
import { shadeColor } from "../../../../utils/color";
import { ChargePointBarState } from "./types";

type ChargePointNodeProps = {
  transitionState: TransitionStatus;
  barState: ChargePointBarState;
  delay: number;
};

const nodeBorderColor = "#2e1710";

const bouncingKeyframes = keyframes`
  0%, 100% {
    transform: translateX(calc(-50% - 4px));
  }

  10%, 80% {
    transform: translate(calc(-50% - 4px), 6px);
  }

  30% {
    transform: translate(calc(-50% - 4px), 18px);
  }
  
  60%, 90% {
    transform: translate(calc(-50% - 4px), -12px);
  }

  70% {
    transform: translate(calc(-50% - 4px), -24px)
  }
`;

const emptyNode = css`
  background-color: ${nodeBorderColor};
  box-shadow: inset 0px 8px 0px 0px #a79995;
`;

const chargeNode = (barState: ChargePointBarState) => css`
  background-color: ${COLOR[barState]};
  box-shadow: inset 0px -8px 0px 0px ${shadeColor(COLOR[barState], 30)};
`;

const chargePointNodeTransition = ({ transitionState, barState, delay }: ChargePointNodeProps) => {
  switch (transitionState) {
    case "entering":
      return css`
        ${chargeNode(barState)};
        transition-delay: ${delay}s;
      `;
    case "entered":
      return css`
        ${chargeNode(barState)};
        transition-delay: 0s;
      `;
    case "exiting":
      return css`
        ${emptyNode};
        transition-delay: ${delay}s;
      `;
    default:
      return css`
        ${emptyNode};
        transition-delay: 0s;
      `;
  }
};

export const ChargePointNode = styled.div<ChargePointNodeProps>`
  transition: background-color 0.2s, box-shadow 0.2s;
  background-color: ${nodeBorderColor};
  box-shadow: inset 0px 8px 0px 0px #a79995;
  ${chargePointNodeTransition}
`;

export const chargePointBarDealAnimation = css`
  animation: ${bouncingKeyframes} ${10 / 12}s steps(1);
`;

export const StyledChargePointBar = styled.div`
  ${gridStyle};
  ${centerizeStyle};
  ${pixelBorderStyle(4, ["#ad9587"])};
  width: 105px;
  height: 20px;
  grid-template-columns: repeat(10, 1fr);
  top: calc(50% - ${SIZE.BoxOfCard / 2}px);
  transform: translateX(calc(-50% - 4px));
  border: 4px solid ${nodeBorderColor};
  background-color: ${nodeBorderColor};
`;
