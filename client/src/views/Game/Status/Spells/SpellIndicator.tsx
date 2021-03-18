import { css } from "@emotion/react";
import { memo, useEffect, useRef, useState } from "react";
import { SpellInfo } from "../../../../../../shared/src/@types";
import spriteLookup from "../../../../utils/spriteLookup";
import { spellIndicatorBadge, spellTriggerAnimation } from "./styles";

const SpellIndicator = ({ duration, name, power }: SpellInfo): JSX.Element => {
  const [triggered, setTriggered] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) firstRender.current = false;
    else setTriggered(true);
  }, [duration, power]);

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <img
        onTransitionEnd={() => setTriggered(false)}
        src={spriteLookup[name]}
        css={[
          css`
            transition: transform 0.2s ease;
          `,
          triggered && spellTriggerAnimation,
        ]}
      />

      <div css={spellIndicatorBadge}>{power}</div>
    </div>
  );
};

export default memo(SpellIndicator);
