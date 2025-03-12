export async function chatClient(user_message, onMessageUpdate) {
    let backEndPort = "37777";

    try {
        const response = await fetch(`http://localhost:${backEndPort}/validateLogic`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: user_message }),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        // 스트림 데이터 읽기
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let result = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            // 데이터 해독 및 업데이트
            let chunk = decoder.decode(value, { stream: true });

            

            /**
             * 청크들을 합쳐 문자열로 만드는 부분.
             * 청크는 다음과 같은 형태들을 띌 수 있으며 -> 뒤에 처리 방법을 기제함
             * 
             * data:a  -> 문자 추가
             * 
             * data:   -> 띄어쓰기 추가
             * 
             * 
             * 다음과 같은 형태는 청크의 크기가 바뀌면 이상작동 할 수 있음
             * 
             * a       -> 이전에 추가된 띄어쓰기 제거 후 (문자열 마지막 한칸 제거) 문자 추가
             *            (반드시 data: 가 먼저 나옴 (현재 청크 크기에선))
             * 
             * (빈칸)  -> 무시
             * 
             * 
             * 
             */

            chunk = chunk.trim();
            //console.log(chunk)

            if (chunk.startsWith("data:")) { // data: 태그에 달려온 경우
                chunk = chunk.substring(5)
                if (chunk == "") {
                    chunk = " ";
                }
            }
            else { // data: 태그에 달려오지 않은경우
                if (chunk != "") {
                    result = result.slice(0, -1);
                }
            }

            result += chunk;
            /////////////////////////////


            onMessageUpdate(result); // 실시간으로 UI 업데이트
        }

        return result;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

// export async function chatClient(user_message) {
//     let backEndPort = "37777";

//     try {
//         // POST 요청 보내기
//         const response = await fetch(`http://localhost:${backEndPort}/validateLogic`, {
//             method: "POST", // 요청 방법을 POST로 설정
//             headers: {
//                 "Content-Type": "application/json", // JSON 형식의 데이터 전송
//             },

//             // ASP.NET = Message, Spring = message
//             body: JSON.stringify({ message: user_message }), // { Message: messageContent } 형식으로 전송
//         });

//         if (!response.ok) throw new Error("Network response was not ok");

//         const data = await response.json(); // JSON 형식으로 변환
//         console.log(data);
//         return data; // 받은 데이터를 그대로 반환

//     } catch (error) {
//         console.error("Error:", error);
//         return null; // 에러 발생 시 null 반환
//     }
// }