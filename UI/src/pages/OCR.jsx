import { React, useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CanvasComponent from '../components/CanvasComponent';
import ResponseBox from '../components/ResponseBox';

const OCR = () => {
    const [file, setFile] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [OCRResponse, setOCRResponse] = useState(null);
    const [OCRData, setOCRData] = useState(null);
    const [OCRText, setOCRText] = useState(null);
    const [uploadCount, setUploadCount] = useState(0);

    // 파일 선택
    const handleFileChange = (event) => {
        setUploadCount(0);
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        // 이미지를 src로 변환해서 변수에 할당함 (시각화 위해 필요)
        if (selectedFile) {
            console.log("excuting selected file trigger")
            const reader = new FileReader();

            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    // 서버에 전송 및 결과 받아오기
    const handleUpload = async () => { 

        if (!file || uploadCount > 0) {
            console.log("파일 업데이트 안됨");
            return;
        }
        setUploadCount(uploadCount + 1);

        console.log("uploadCount", uploadCount);

        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await fetch("http://localhost:37777/ocr", {
                method: "POST",
                body: formData
            });
            const data = await response.json();  // Promise 해제 후 저장
            setOCRResponse(data);
        } catch (error) {
            console.error("Error:", error);
        }
    } 

    /**
     * json 형식
     * {
     *  sucess: true,
     *  message: "성공",
     *  data: [
     *  {
     *   text: "안녕하세요",
     *   box: [[0, 0], [100, 0], [100, 100], [0, 100]]
     *  },
     *  {
     *   text: "반갑습니다",
     *   box: [[100, 0], [200, 0], [200, 100], [100, 100]]
     *  }
     * ]
     * 
     * 지금 검출된 글자가 없는경우 CanvasComponet와 여기 화면표시 로직에서 ?. 를 사용해 처리중임
     * 해당 부분은 추후 수정예정 (여기서 수정해서 넘겨주는 방식)
     */

    // OCR 응답에서 데이터 추출
    useEffect(() => {
        if (OCRResponse && OCRResponse?.data) {
            setOCRData(OCRResponse["data"]);
            console.log(OCRResponse["data"]);
        }
    }, [OCRResponse]);


    // OCR 데이터에서 텍스트 추출
    useEffect(() => {
        if (OCRData) {
            let text = "";
            OCRResponse["data"].forEach((data) => {
                text += data["text"] + " ";
            });
            setOCRText(text);
        }
    }, [OCRData]);

    // 버튼 눌러서 input 기능 실행
    const fileInputRef = useRef(null); // 파일 input을 참조하기 위한 useRef
    const triggerFileInput = () => {
        fileInputRef.current.click();
    }

    return (
        <div>
            <Box sx={{marginLeft:2}}>
                <h1>이미지에서 글자 추출</h1>
                <p>
                    이미지 속 글자를 복사 가능한 텍스트로 추출합니다.
                </p>

            </Box>
            <Button variant="outlined" 
                    onClick={triggerFileInput}
                    sx={{
                        m: 2
                    }}
            >파일 선택</Button>
            <input ref={fileInputRef} type="file" onChange={handleFileChange} style={{display:'none'}}/>

            <Button variant="outlined" 
                    onClick={handleUpload}
                    sx={{
                        m: 2,
                        ml: 0
                    }}
            >글자 추출</Button>

            
            {/* <p>{JSON.stringify(OCRResponse)}</p> */}
            <ResponseBox>{OCRText}</ResponseBox>

            <Box sx={{m:2}}> 
                {imageSrc && <CanvasComponent imageSrc={imageSrc} OCRData={OCRData} pointNum={4}/>}
            </Box>
        </div>

        
    )
};

export default OCR;