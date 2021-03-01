import { css } from "@emotion/react";
import { spriteStyle } from "./styles";

type SpriteProps = {
  size: [number, number];
  src: string;
  scale?: number;
  className?: string;
};

const Sprite = ({ size: [width, height], src, scale = 1, className }: SpriteProps): JSX.Element => {
  return (
    <div
      css={[
        spriteStyle,
        css`
          width: ${width * scale}px;
          height: ${height * scale}px;
          background-image: url(${src});
        `,
      ]}
      className={className}
    />
  );
};

export default Sprite;
export type { SpriteProps };
