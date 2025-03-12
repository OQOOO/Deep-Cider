# PyTorch + CUDA 기반 이미지
FROM pytorch/pytorch:2.0.1-cuda11.7-cudnn8-runtime

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 패키지 설치 (pip 업데이트 포함)
RUN apt-get update && apt-get install -y \
    && pip install --no-cache-dir --upgrade pip

# Python 패키지 설치 (FastAPI, transformers만 설치)
RUN pip install --no-cache-dir \
    transformers \
    fastapi \
    uvicorn \
    pydantic \
    asyncio

# 모델 다운로드 및 캐싱 (distilgpt2 사용)
#RUN python -c "from transformers import pipeline; pipeline('text-generation', model='distilgpt2')"
RUN python -c "from transformers import pipeline; pipeline('text-generation', model='deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B')"

# 애플리케이션 코드 복사
COPY app.py /app/app.py

# 컨테이너 실행 시 FastAPI 서버 실행
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "5000"]
