import React, {useEffect, useState, useRef} from 'react'
import {
    Button,
    TextField,
  } from "@mui/material";
import { styled } from '@mui/material/styles';
import styles from './Colorblind.module.css'

const Colorblind = (props) => {
    const [questionStatus, setQuestionStatus] = useState(false);
    const inputRef = useRef(null);

    // console.log(props.data);

    const checkVision = (inputText, targetText) => {

        const org_data = props.data.vision
        inputText = Number(inputText)

        props.saveData("questions", {
            [props.index]: {
                ...props.data,
                userResponse: inputText,
                isUserResponseValid: {
                    RG: org_data.normalView === inputText ? false : org_data.colorBlind.RG === inputText,
                    protonopia: org_data.normalView === inputText ? false : org_data.colorBlind.protonopia === inputText,
                    deutonopia: org_data.normalView === inputText ? false : org_data.colorBlind.deutonopia === inputText,
                }
            }
        })

        props.onSubmit()
    }

    const handleAnswerCheck = () => {
        const inputText = inputRef.current.value
        const targetText = props.data.vision

        checkVision(inputText, targetText);

        inputRef.current.value = ""

        setQuestionStatus(inputText == targetText)
    }

    return (
        <article className={styles.container}>
            <section>
                <center style={{marginTop: "32px",marginBottom: "32px"}}> 
                    <img className={styles.ishihara_image} src={props.data.image} alt="ishihara image"/>    
                </center>
            </section>

            <section className={styles.answer_section}>
                <h3>Answer:</h3>
                <p className={styles.instruction}> <strong>Instruction:</strong> {props.data.instruction} </p>
                <TextField type="number" inputRef={inputRef}/>
                <br />

                <center style={{margin: "24px", paddingLeft:"auto", paddingRight:"auto"}}>
                    <Button
                        className='btn btn-secondary'
                        onClick={handleAnswerCheck}
                        variant="contained" style={{ paddingLeft:"auto", paddingRight:"auto"}}
                    >
                        Done
                    </Button>
                </center>
                {/* <Button className='btn btn-secondary' variant="contained" onClick={handleAnswerCheck} title="Check Answer"> Capture </Button> */}
            </section>
            <section className={styles.next_btn_container}>
                <Button title="Submit" onClick={props.onSubmit} variant="contained" size='large'>
                    Next
                </Button>
            </section>
        </article>
    )
}

export default Colorblind