import torch
import numpy as np
import cv2
from torchvision import transforms
from PIL import Image
import base64
from io import BytesIO


# Transform dùng cho GradCAM
grad_transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize(
        [0.485, 0.456, 0.406],
        [0.229, 0.224, 0.225]
    )
])

def generate_gradcam(model, image: Image.Image, device="cpu"):
    # -----------------------
    # BẬT GRAD CHO LAYER4 TẠM THỜI
    # -----------------------
    trainable_layers = []
    for p in model.layer4.parameters():
        trainable_layers.append((p, p.requires_grad))
        p.requires_grad = True
    # -----------------------

    activations = None
    gradients = None
    target_layer = model.layer4[-1].conv2

    def forward_hook(module, input, output):
        nonlocal activations
        activations = output

    def backward_hook(module, grad_input, grad_output):
        nonlocal gradients
        gradients = grad_output[0]

    fwd = target_layer.register_forward_hook(forward_hook)
    bwd = target_layer.register_backward_hook(backward_hook)

    model.eval()

    img_tensor = grad_transform(image).unsqueeze(0).to(device)

    # FORWARD
    out = model(img_tensor)
    pred_class = out.argmax()

    # BACKWARD
    model.zero_grad()
    out[0, pred_class].backward()

    # ACTIVATION & GRAD
    grad = gradients.detach().cpu().numpy()
    act = activations.detach().cpu().numpy()

    weights = np.mean(grad, axis=(2, 3))[0]

    cam = np.zeros(act.shape[2:], dtype=np.float32)
    for i, w in enumerate(weights):
        cam += w * act[0, i]

    cam = np.maximum(cam, 0)
    cam = cv2.resize(cam, (224, 224))
    cam = cam / (cam.max() + 1e-8)

    # TẠO HEATMAP
    heatmap_np = (cam * 255).astype(np.uint8)
    heatmap = cv2.applyColorMap(heatmap_np, cv2.COLORMAP_JET)

    original = np.array(image.resize((224, 224)))
    original = cv2.cvtColor(original, cv2.COLOR_RGB2BGR)

    overlay = heatmap * 0.4 + original * 0.6
    overlay = overlay.astype(np.uint8)

    # ENCODE
    _, buffer = cv2.imencode(".jpg", overlay)
    heatmap_b64 = base64.b64encode(buffer).decode()

    # -----------------------
    # KHÔI PHỤC requires_grad VỀ MẶC ĐỊNH
    # -----------------------
    for (p, old_req) in trainable_layers:
        p.requires_grad = old_req
    # -----------------------

    fwd.remove()
    bwd.remove()

    return heatmap_b64, int(pred_class)
