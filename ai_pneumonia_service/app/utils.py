from torchvision import transforms
from PIL import Image
import io
import torch
import clip
import numpy as np


transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        [0.485, 0.456, 0.406],
        [0.229, 0.224, 0.225]
    )
])

def transform_image(image_bytes, device):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    tensor = transform(img).unsqueeze(0).to(device)
    return tensor


# cHECK ANH DAU VAO
def is_valid_image(image_bytes):
    """Kiểm tra xem file có phải ảnh không."""
    try:
        Image.open(io.BytesIO(image_bytes))
        return True
    except:
        return False

def is_xray_like(img: Image.Image):
    """
    Kiểm tra xem ảnh có giống X-ray:
    - ảnh xám
    - histogram có độ phân tán đủ lớn
    """
    gray = img.convert("L")
    hist = np.array(gray.histogram())
    return hist.std() > 20   # nhỏ quá là ảnh trắng/đen hoặc ảnh vô nghĩa


# device = "cuda" if torch.cuda.is_available() else "cpu"
# model, preprocess = clip.load("ViT-B/32", device=device)

# def check_xray_clip(img):
#     image = preprocess(img).unsqueeze(0).to(device)

#     text = clip.tokenize([
#         "a chest X-ray image",
#         "a normal color photograph",
#         "an image of an animal",
#         "a random picture"
#     ]).to(device)

#     with torch.no_grad():
#         image_features = model.encode_image(image)
#         text_features = model.encode_text(text)

#         logits = (image_features @ text_features.T).softmax(dim=1)

#     prob_xray = logits[0][0].item()
#     return prob_xray > 0.6