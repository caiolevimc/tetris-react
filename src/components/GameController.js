import "./GameController.css"

import { Action, actionForKey, actionIsDrop } from '../business/Input'
import { playerController } from "../business/PlayerController"

import { useInterval } from "../hooks/useInterval";
import { useDropTime } from "../hooks/useDropTime";


const GameController = ({ 
    board, 
    gameStats, 
    player, 
    setGameOver, 
    setPlayer,
}) => {

    const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
        gameStats
    })

    useInterval(() => {
        handleInput({ action: Action.SlowDrop })
    }, dropTime)

    const onKeyUp = ({ code }) => {
        const action = actionForKey(code)
        
        actionIsDrop(action) && resumeDropTime()        
    }   
    const onKeyDown = ({ code }) => {
        const action = actionForKey(code) 
        if(action === Action.Pause){
            // if(dropTime){
            //     pauseDropTime()
            // } else {
            //     resumeDropTime()
            // }
            dropTime ? pauseDropTime() : resumeDropTime()
        } else if (action === Action.Quit){
            setGameOver(true)
        } else {
            actionIsDrop(action) && pauseDropTime()
            handleInput({ action })
        }
    }
        
    const handleInput = ({ action }) => {
        playerController({
            action,
            board,
            player,
            setPlayer,
            setGameOver
        })
    }

    return (
        <input 
            className="GameController"
            type="text"
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            autoFocus
            readOnly
        />
    )
}

export default GameController