from fastapi import FastAPI, UploadFile, File
from app.model_pneumonia import load_model, predict_image
from app.utils import transform_image, is_valid_image, is_xray_like
from PIL import Image
import io


app = FastAPI()

# Load model 1 lần duy nhất
model, labels, device = load_model("model/pneumonia_resnet18.pth")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()

    # 1. kiểm tra file có phải ảnh
    if not is_valid_image(image_bytes):
        return {"error": "File không phải ảnh. Vui lòng chọn ảnh PNG/JPG hợp lệ."}

    
    img = Image.open(io.BytesIO(image_bytes))
    # 2. kiểm tra ảnh quá nhỏ
    if img.width < 200 or img.height < 200:
        return {"error": "Ảnh quá nhỏ, vui lòng dùng ảnh X-ray rõ nét ≥ 200px."}
    
    # 3. kiểm tra có phải ảnh X-ray
    if not is_xray_like(img):
        return {"error": "Ảnh không giống ảnh X-ray ngực. Vui lòng dùng ảnh đúng."}


    input_tensor = transform_image(image_bytes, device)

    pred_label, probs = predict_image(model, input_tensor, labels)
    confidence = float(max(probs))

    return {
        "predicted_class": pred_label,
        "confidence": confidence,
        "probabilities": {
            labels[0]: probs[0],
            labels[1]: probs[1]
        }
    }

@app.get("/")
def root():
    return {"message": "Pneumonia X-ray API is running!"}
