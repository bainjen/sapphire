import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/DialogueBox.scss";
import TypeWriter from "./TypeWriter";

import RunningGame from "./RunningGame";
import useMinigameHook from "../hooks/useMinigameHooks";
import { boulderCheck } from "../helpers/boulderCheck";

import ShiftingSands from "./ShiftingSands";
import { sandCheck } from "../helpers/sandCheck";
import useSandHook from "../hooks/useSandHook";

import GameOver from "./GameOver";
import { endCheck } from "../helpers/endCheck";
import Victory from "./Victory";

export default function DialogueBox(props) {
  const { running, runningMini } = useMinigameHook(props);
  const { sand, sandMini, arrowButtons, round } = useSandHook(props);
  const [attempts, setAttempts] = useState(0);

  // console.log("DialogBox: ", props);

  const endScene = () => {
    if (props.dialogue.next_dialogue_id === null) {
      return true;
    }
  };

  const getGame = (props) => {
    switch (props.dialogue[0].story) {
      case "RunningGame":
        return (
          boulderCheck(props, running) && (
            <RunningGame
              minigame={runningMini}
              percentage={running.runningPercent}
            />
          )
        );

      case "ShiftingSands":
        return (
          sandCheck(props, arrowButtons, round) && (
            <ShiftingSands
              minigame={sandMini}
              pattern={sand}
              pressed={arrowButtons}
              dialogue={props.dialogue}
              current={props.current}
              next={props.next}
              attempts={attempts}
              setAttempts={setAttempts}
            />
          )
        );

      default:
        return false;
    }
  };

  const getEndCheck = (props) => {
    switch (props.dialogue.story) {
      case "BoulderDeath":
        return endCheck(props) && <GameOver />;
      case "Victory":
        return endCheck(props) && <Victory />;
      case "No Gems":
        return endCheck(props) && <GameOver />;

      default:
        return false;
    }
  };

  if (props.dialogue.length && props.dialogue[0].label === "No gems") {
    const gemCheck = () => {
      if (
        (document.getElementById("badge1").style.opacity &&
          document.getElementById("badge2").style.opacity &&
          document.getElementById("badge3").style.opacity) === "1"
      ) {
        return true;
      }
      return false;
    };
    return (
      <>
        <div className="dialogue-box">
          <p>
            <TypeWriter
              message={props.dialogue[0].story}
              key={props.dialogue[0].story}
            />
            {/* {props.dialogue[0].story} */}
          </p>
          <div>
            {gemCheck() ? (
              <button
                onClick={() => props.current(props.next(props.dialogue[1]))}
                className="dialogue-buttons"
              >
                {props.dialogue[1].label}
              </button>
            ) : (
              <button
                onClick={() => props.current(props.next(props.dialogue[0]))}
                className="dialogue-buttons"
              >
                {props.dialogue[0].label}
              </button>
            )}
          </div>
        </div>
      </>
    );
  }

  //renders multiple choices if props.dialogue is an array
  if (props.dialogue.length) {
    return (
      <>
        {getGame(props) || (
          <div className="dialogue-box">
            <p>
              <TypeWriter
                message={props.dialogue[0].story}
                key={props.dialogue[0].story}
              />
              {/* {props.dialogue[0].story} */}
            </p>
            <div>
              {props.dialogue.map((choice, i) => (
                <button
                  key={i}
                  className="dialogue-buttons"
                  onClick={() => props.current(props.next(choice))}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </>
    );
  } else {
    //renders single path
    return (
      <>
        {getEndCheck(props) || (
          <div className="dialogue-box">
            <p>
              <TypeWriter
                message={props.dialogue.story}
                key={props.dialogue.story}
              />
              {/* {props.dialogue.story} */}
            </p>
            {endScene() ? (
              <Link
                className="link-map"
                to={`/scene/${Number(props.scene) + 1}`}
              >
                <button className="dialogue-buttons">Return to Map</button>
              </Link>
            ) : (
              <button
                className="dialogue-buttons"
                onClick={() => props.current(props.next(props.dialogue))}
              >
                {props.dialogue.label}
              </button>
            )}
          </div>
        )}
      </>
    );
  }
}
