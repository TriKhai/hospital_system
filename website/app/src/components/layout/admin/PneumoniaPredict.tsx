import React, { useState, type ChangeEvent } from "react";
import aiService from "../../../services/aiApi";

// Kiểu dữ liệu cho AI prediction
interface PredictionResult {
  predicted_class: string;
  confidence: number;
  probabilities: Record<string, number>;
}

const PneumoniaPredict: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult(null);
      setError(null);

      // Tạo URL preview ảnh
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handlePredict = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    try {
      setLoading(true);
      const prediction = await aiService.predict(file);
      setResult(prediction);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* Left: Input + Button + Result */}
      <div>
        <h2>AI Pneumonia Prediction</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handlePredict} disabled={loading} style={{ marginLeft: "10px" }}>
          {loading ? "Predicting..." : "Predict"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {result && (
          <div style={{ marginTop: "20px" }}>
            <h3>Prediction Result:</h3>
            <p><strong>Class:</strong> {result.predicted_class}</p>
            <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
            <h4>Probabilities:</h4>
            <ul>
              {Object.entries(result.probabilities).map(([key, value]) => (
                <li key={key}>{key}: {(value * 100).toFixed(2)}%</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right: Preview Image */}
      <div>
        {previewUrl ? (
          <div>
            <h3>Preview:</h3>
            <img
              src={previewUrl}
              alt="Preview"
              style={{ width: "300px", height: "auto", border: "1px solid #ccc", borderRadius: "5px" }}
            />
          </div>
        ) : (
          <p>No image selected</p>
        )}
      </div>
    </div>
  );
};

export default PneumoniaPredict;
