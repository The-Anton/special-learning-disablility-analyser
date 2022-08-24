import React, {useEffect, useState, useRef} from 'react'
import {
    Button,
    TextField,
  } from "@mui/material";
import { styled } from '@mui/material/styles';
import speakerIcon from '../../../assets/icon_audio.png'
import styles from './Listening.module.css'

const Listening = (props) => {
    const inputRef = useRef(null);

    const handlePlayAudio = () => {
        const synth = window.speechSynthesis;
        const text = props.data.title
        const utterThis = new SpeechSynthesisUtterance(text);
        synth.speak(utterThis)
    }

    const handleAnswerCheck = () => {
        const inputText = inputRef.current.value?.toLowerCase()
        const targetText = props.data.answer.toLowerCase()
        return inputText === targetText
    }

    const handleSubmit = ()=>{
        props.saveData("questions", {
            [props.index]: {
                ...props.data,
                userResponse: inputRef.current.value?.toLowerCase(),
                isUserResponseValid: handleAnswerCheck()
            }
        })

        //clear text field
        console.log(inputRef.current.value)
        inputRef.current.value = ""

        props.onSubmit()
    }

    //fixed multiple rerendering issues
    useEffect(()=>{
        const id = setTimeout(()=>{
            handlePlayAudio();
        },300);

        return () => clearTimeout(id)
    },[props.data])

    return (
        <article className={styles.container}>
            <section>
                <Button onClick={handlePlayAudio}>
                    <img className={styles.speaker_icon} src={speakerIcon} alt="speaker icon"/>
                </Button>
            </section>
            <section className={styles.answer_section}>
                <h3>Answer:</h3>
                <TextField type="text" inputRef={inputRef}/>
            </section>
            <section className="next_btn_container">
                <Button title="Submit" onClick={handleSubmit} variant="contained" size='large'>
                    Next
                </Button>
            </section>
        </article>
    )
}

export default Listening