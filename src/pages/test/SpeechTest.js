import React from "react";
import MicRecorder from "mic-recorder-to-mp3"
import { useEffect, useState, useRef } from "react"
import { Oval } from "react-loader-spinner"
import axios from "axios"
// material
import {
    Card,
    Button,
    Table,
    Avatar,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
  } from "@mui/material";
import { styled } from '@mui/material/styles';
import {
  Container,
} from "@mui/material";
import { sizing } from '@mui/system';

// components
import swal from 'sweetalert';
import { Navigate } from "react-router-dom";

const APIKey = process.env.REACT_APP_API_KEY


// Set AssemblyAI Axios Header
const assemblyAI = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: APIKey,
    "content-type": "application/json",
    "transfer-encoding": "chunked",
  },
})

//styles
const TestContainer = styled('div')(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    padding: "8px",
}));

const QuestionTemplateContainer = styled('div')(({ theme }) => ({
    display: "flex",
    height: "30vh",
    padding: "8px",
}));

//conditional rendering
function loadQuestionTemplate() {
    const questionType = "";
    switch(questionType) {
        case 'MCQ':
            break;
        case 'speech-test':
            
            break;
        default:
    }
}

//utility functions
// function loadQuestion() {
//     return (props.question)? toString(props.question) : "This is a Sample Question"
// }

export default function SpeechTest() {
  const [isLoaded, setLoaded] = useState(false);

  // Mic-Recorder-To-MP3
  const recorder = useRef(null) //Recorder
  const audioPlayer = useRef(null) //Ref for the HTML Audio Tag
  const [blobURL, setBlobUrl] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [isRecording, setIsRecording] = useState(null)

  // States
  const [uploadURL, setUploadURL] = useState("")
  const [transcriptID, setTranscriptID] = useState("")
  const [transcriptData, setTranscriptData] = useState("")
  const [transcript, setTranscript] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    //Declares the recorder object and stores it inside of ref
    recorder.current = new MicRecorder({ bitRate: 128 })
  }, [])

  const startRecording = () => {
    // Check if recording isn't blocked by browser
    recorder.current.start().then(() => {
      setIsRecording(true)
    })
  }

  const stopRecording = () => {
    recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        })
        const newBlobUrl = URL.createObjectURL(blob)
        setBlobUrl(newBlobUrl)
        setIsRecording(false)
        setAudioFile(file)
      })
      .catch((e) => console.log(e))
  }



  // Upload the Audio File and retrieve the Upload URL
  useEffect(() => {
    if (audioFile) {
      assemblyAI
        .post("/upload", audioFile)
          .then((res) => {        console.log(res);
            setUploadURL(res.data.upload_url)})
        .catch((err) => console.error(err))
    }
  }, [audioFile])

  // Submit the Upload URL to AssemblyAI and retrieve the Transcript ID
  const submitTranscriptionHandler = () => {
    assemblyAI
      .post("/transcript", {
        audio_url: uploadURL,
      })
      .then((res) => {
        console.log(res);
        setTranscriptID(res.data.id)

        checkStatusHandler()
      })
      .catch((err) => console.error(err))
  }

  // Check the status of the Transcript
  const checkStatusHandler = async () => {
    setIsLoading(true)
    try {
      await assemblyAI.get(`/transcript/${transcriptID}`).then((res) => {
        setTranscriptData(res.data)
      })
    } catch (err) {
      console.error(err)
    }
  }

  // Periodically check the status of the Transcript
  useEffect(() => {
    const interval = setInterval(() => {
      if (transcriptData.status !== "completed" && isLoading) {
        checkStatusHandler()
      } else {
        setIsLoading(false)
        setTranscript(transcriptData.text)

        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  })



    return (
        <Container maxWidth="xl">
            <TestContainer >
                <QuestionTemplateContainer>
                    {(isLoaded)
                    ? (<div>Loaded</div>)
                    : (<div>Not Loaded</div>)
                    }
                </QuestionTemplateContainer>
                
                <div style={{display:"flex", flexDirection:"column"}}>
                    <div>
                      <button
                        className='btn btn-primary'
                        onClick={startRecording}
                        disabled={isRecording}
                      >
                        Record
                      </button>
                      <button
                        className='btn btn-warning'
                        onClick={stopRecording}
                        disabled={!isRecording}
                      >
                        Stop
                      </button>
                    </div>

                    <audio ref={audioPlayer} src={blobURL} controls='controls' />

                    <button
                      className='btn btn-secondary'
                      onClick={submitTranscriptionHandler}
                    >
                      Done
                    </button>

                    {isLoading ? (
                      <div>
                        <Oval
                          ariaLabel='loading-indicator'
                          height={100}
                          width={100}
                          strokeWidth={5}
                          color='red'
                          secondaryColor='yellow'
                        />
                        <p className='text-center'>Is loading....</p>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {!isLoading && transcript && (
                      <div className='w-2/3 lg:w-1/3 mockup-code'>
                        <p className='p-6'>{transcript}</p>
                      </div>
                    )}

                  
                </div>
                
                
            </TestContainer>
            <div style={{display:"flex"}}>
                    <Button onClick="/" size="large" variant="contained" style={{width: "100%"}}>
                        Next
                    </Button>
            </div>
        </Container>
    );
}
