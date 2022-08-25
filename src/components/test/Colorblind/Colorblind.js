import React, {useEffect, useState, useRef} from 'react'
import {
    Card,
    Button,
    Stack,
    TextField,
    IconButton,
    InputAdornment,
    MenuItem,
  } from "@mui/material";
import { styled } from '@mui/material/styles';
// import speakerIcon from '../../assets/icon_audio.png'
import styles from './Colorblind.module.css'

const Colorblind = (props) => {
    const [questionStatus, setQuestionStatus] = useState(false);
    const inputRef = useRef(null);

    const handleAnswerCheck = () => {
        const inputText = inputRef.current.value
        const targetText = props.data.value
        alert(inputText == targetText);
        setQuestionStatus(inputText == targetText)
    }

    //fixed multiple rerendering issues
    // useEffect(()=>{
    //     const id = setTimeout(()=>{
    //         handlePlayAudio();
    //         console.log("hero")
    //     },300);
    //     console.log("heroo")

    //     return () => clearTimeout(id)
    // },[props.data])

    return (
        <article className={styles.container}>
            <section>
                <img className={styles.ishihara_image} src={props.data.image} alt="speaker icon"/>
            </section>
            <section className={styles.answer_section}>
                <h3>Answer:</h3>
                <TextField type="number" ref={inputRef}/>
                <Button onClick={handleAnswerCheck} title="Check Answer"/>
            </section>
            <section className="next_btn_container">
                <Button title="Submit" onClick={props.onSubmit} variant="contained" size='large'>
                    Next
                </Button>
            </section>
        </article>
    )
}

export default Colorblind