# app.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from PIL import Image
import io
import torch

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# TODO: load model thật của bạn
model = torch.load("model.pth", map_location="cpu")
model.eval()

class PredictionResponse(BaseModel):
    has_pneumonia: bool
    probability: float

def preprocess_image(image_bytes: bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    # TODO: transform giống lúc train (resize, normalize,...)
    # return tensor shape [1,3,H,W]
    return tensor

def predict(image_bytes: bytes) -> PredictionResponse:
    x = preprocess_image(image_bytes)
    with torch.no_grad():
        logits = model(x)
        prob = torch.sigmoid(logits)[0].item()
    has_pneumonia = prob >= 0.5
    return PredictionResponse(has_pneumonia=has_pneumonia,
                              probability=prob)

@app.post("/predict", response_model=PredictionResponse)
async def predict_endpoint(file: UploadFile = File(...)):
    image_bytes = await file.read()
    result = predict(image_bytes)
    return result

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
