import torch
import torch.nn as nn
import torchvision.models as models

def load_model(weights_path):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    base_model = models.resnet18(weights=models.ResNet18_Weights.IMAGENET1K_V1)

    # freeze backbone
    for param in base_model.parameters():
        param.requires_grad = False

    in_features = base_model.fc.in_features

    base_model.fc = nn.Sequential(
        nn.Linear(in_features, 256),
        nn.ReLU(),
        nn.Dropout(0.3),
        nn.Linear(256, 128),
        nn.ReLU(),
        nn.Dropout(0.2),
        nn.Linear(128, 2)
    )

    base_model.load_state_dict(torch.load(weights_path, map_location=device))
    base_model.eval()
    base_model.to(device)

    labels = ["NORMAL", "PNEUMONIA"]

    return base_model, labels, device


def predict_image(model, input_tensor, labels):
    with torch.no_grad():
        output = model(input_tensor)
        probs = torch.softmax(output, dim=1)[0]

    idx = int(torch.argmax(probs))
    return labels[idx], probs.cpu().numpy().tolist()
