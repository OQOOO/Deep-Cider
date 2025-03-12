
import { React, useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import {chatClient} from '../client/chatClient.jsx';
import ResponseBox from '../components/ResponseBox.jsx';


function ValidateLogic() {
    // const inputRef = useRef(null);
    // const [LLMAnswer, setLLMAnswer] = useState(null);
    // const [viewData, setViewData] = useState("");

    // // LLM 으로 값 전달 후 -> 답변을 LLMAnswer 변수에 저장
    // const sendMessage = () => {
    //     chatClient(inputRef.current.value).then(setLLMAnswer);
    // };

    // // 화면에 결과값 표시하는 로직
    // useEffect(() => {
    //     if (LLMAnswer && LLMAnswer.output) {
    //         setViewData(LLMAnswer.output);
    //     }
    // }, [LLMAnswer]); // LLMAnswer 변경될 때마다 실행

    const inputRef = useRef(null);
    const [viewData, setViewData] = useState("");

    const sendMessage = () => {
        setViewData(""); // 기존 데이터 초기화
        chatClient(inputRef.current.value, setViewData); // onMessageUpdate로 실시간 업데이트
    };

    return (
        <div>
            <Box sx={{marginLeft:2}}>
                <h2>논리적 오류 찾기</h2>
                상대방의 말이 답답하게 느껴지는데, 정확한 이유를 모르겠나요? 시원하게 해결해 드립니다!
            </Box>
            <div>
                <TextField
                    id="standard-multiline-static"
                    label="대화 입력"
                    inputRef={inputRef}
                    multiline
                    rows={4}
                    sx={{ 
                        width: "700px",
                        m: 2 
                    }}
                    variant="standard"
                />
            </div>

            <Button variant="contained" onClick={sendMessage}
            sx={{ 
                m: 2 
            }}
            >send message</Button>

            <ResponseBox>{viewData}</ResponseBox>
            <ResponseBox>{viewData}</ResponseBox>


        </div>


    );
}

export default ValidateLogic;