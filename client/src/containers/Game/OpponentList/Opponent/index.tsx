import React from "react";
import HitPointBar from "../../../../components/HitPointBar";
import SpellAnimation from "../../../../components/SpellAnimation";
import SpellList from "../../../../components/SpellList";
import { PlayerState } from "../../playerListReducer";
import "./Opponent.scss";

interface OpponentProps {
  info: PlayerState;
  maxHP: number;
}

const Opponent = ({ maxHP, info }: OpponentProps): JSX.Element => {
  return (
    <div className={`opponent ${info.isEliminated ? "-disabled" : ""}`}>
      <div className="opponent__name">{info.name}</div>
      <SpellList spells={Object.values(info.spells)} />
      <HitPointBar hp={info.hp} maxHP={maxHP} />
      <SpellAnimation spell={info.currentSpell} />
    </div>
  );
};

export default Opponent;
