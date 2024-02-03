import React, { useCallback, useEffect } from "react";
import { useInterval } from "../hooks/use-interval";
import { secondsToMinutes,secondsToTime } from "../utils/timeFormat";
import { Button } from "./button";
import { Timer } from "./timer";
import { Image } from "./image";
import tomatoSleep from '../assets/tomato_sleep.gif'
import tomatoWork from '../assets/tomato_work.gif'

const workingAudio = require('../assets/sound_work.mp3')
const restingAudio = require('../assets/sound_rest.mp3')

const audioStartWorking = new Audio(workingAudio)
const audioStartResting = new Audio(restingAudio)

interface Props {
    defaultPomodoroTime: number
    shortRestTime: number
    longRestTime: number
    cycles: number
}

export function PomodoroTimer(props: Props):JSX.Element{

    const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTime)
    const [timeCounting, setTimeCounting] = React.useState(false)
    const [working, setWorking] = React.useState(false)
    const [resting, setResting] = React.useState(false)
    const [cyclesQtdManager,setCyclesQtdManager] = React.useState(new Array (props.cycles-1).fill(true))
    const [completedCycles, setCompletedCycles] = React.useState(0)
    const [fullWorkingTime,setFullWorkingTime] = React.useState(0)
    const [numberOfPomodoros, setNumberOfPomodoros] = React.useState(0)

    useInterval(()=>{
        setMainTime(mainTime-1)
        if(working) setFullWorkingTime(fullWorkingTime+1)
    }, timeCounting? 1000 : null)

    const configureWork = useCallback(() =>{
        setTimeCounting(true)
        setWorking(true)
        setResting(false)
        setMainTime(props.defaultPomodoroTime)
        audioStartWorking.volume = 0.02
        audioStartWorking.play()
    },[setTimeCounting,setWorking,setResting,setMainTime,props.defaultPomodoroTime])

    const configureRest = useCallback((long:boolean) =>{
        setTimeCounting(true)
        setWorking(false)
        setResting(true)
        audioStartResting.volume=0.8
        audioStartResting.play()

        if(long){
            setMainTime(props.longRestTime)
        }else{
            setMainTime(props.shortRestTime)
        }
    },[setTimeCounting,setWorking,setResting,setMainTime,props.longRestTime,props.shortRestTime])

    useEffect(()=>{
        if(working) document.body.classList.add('working')
        if(resting) document.body.classList.remove('working')
        audioStartResting.pause()

        if (mainTime>0) return;

        if(working && cyclesQtdManager.length>0){
            configureRest(false)
            cyclesQtdManager.pop()
        } else if(working && cyclesQtdManager.length<=0){
            configureRest(true)
            setCyclesQtdManager(new Array(props.cycles-1).fill(true))
            setCompletedCycles(completedCycles+1)
        }
        if(working){setNumberOfPomodoros(numberOfPomodoros+1)}
        if(resting){configureWork()}
    },[working,resting,mainTime,configureRest,configureWork,cyclesQtdManager,numberOfPomodoros,props.cycles,completedCycles])

    useEffect(()=>{
        audioStartWorking.pause()
    },[resting])

    return (
        <div className="maxContainer">
        <Image imageSource={working && !resting ? tomatoWork : tomatoSleep} imageAlt={working && !resting ? 'tomatoWork' : 'tomatoSleep'}></Image>
        <div className="pomodoro">
            <h2>You are: {working? 'Working' : 'Resting'}</h2>
            <Timer mainTime={mainTime}></Timer>
            <div className="controls">
                <Button onClick={()=> configureWork()} text="Work"></Button>
                <Button onClick={()=> configureRest(false)} text="Rest"></Button>
                <Button ClassName={!working && !resting ? 'hidden' : ''} onClick={()=> setTimeCounting(!timeCounting)} text={timeCounting ? 'Pause' : 'Play'}></Button>
            </div>
            <div className="details"></div>
            <p>Ciclos concluídos: {completedCycles}</p>
            <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
            <p>Numero de pomodoros: {numberOfPomodoros}</p>
        </div>
        </div>
    )
}