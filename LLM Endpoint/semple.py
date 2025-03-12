from transformers import pipeline


# 'distilgpt2' 모델로 파이프라인 생성
pipe = pipeline("text-generation", model="distilgpt2", device=0)

# 사용자 메시지 입력
messages = [
    {"role": "user", "content": "한국어 할줄 알아?"}
]

# 모델로 텍스트 생성
output = pipe(messages[0]['content'], max_length=50, num_return_sequences=1)

# 출력 결과 확인
print(output)