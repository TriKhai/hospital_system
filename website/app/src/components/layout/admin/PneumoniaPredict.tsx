import React, { useState, type ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faCloudUploadAlt,
  faFileUpload,
  faFileImage,
  faBrain,
  faSpinner,
  faExclamationCircle,
  faChartLine,
  faCheckCircle,
  faPercentage,
  faListUl,
  faLungs,
  faImage,
  faImages,
  faCog,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
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
  const [gradcamUrl, setGradcamUrl] = useState<string | null>(null);
  const [gradcamLoading, setGradcamLoading] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult(null);
      setError(null);
      setGradcamUrl(null);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handlePredict = async () => {
    if (!file) {
      setError("Please select an image first!");
      return;
    }

    try {
      setLoading(true);
      setGradcamLoading(true);
      setError(null);

      // Gọi API dự đoán
      const predictionRes = await aiService.predict(file);
      setResult(predictionRes);

      // Gọi API GradCAM ngay sau khi predict thành công
      const gradcamRes = await aiService.gradcam(file);
      setGradcamUrl("data:image/jpeg;base64," + gradcamRes.gradcam_image_base64);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setLoading(false);
      setGradcamLoading(false);
    }
  };

  const isPneumonia = result?.predicted_class.toLowerCase().includes('pneumonia');

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <FontAwesomeIcon icon={faHeartbeat} className="text-4xl text-[#0E8DA1]" />
            <h1 className="text-3xl font-bold text-gray-800">AI Pneumonia Detection</h1>
          </div>
        </div> */}

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Scrollable */}
          <div className="space-y-6 lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto lg:pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {/* Upload Card */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faCloudUploadAlt} className="text-[#0E8DA1]" />
                Upload X-Ray Image
              </h2>
              
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-25 transition-all mb-4">
                <div className="flex flex-col items-center justify-center">
                  <FontAwesomeIcon icon={faFileUpload} className="text-4xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 font-medium">Click to upload X-ray image</p>
                  <p className="text-xs text-purple-500 mt-1">PNG, JPG or JPEG (MAX. 10MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>

              {file && (
                <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FontAwesomeIcon icon={faFileImage} className="text-[#0E8DA1] flex-shrink-0" />
                    <span className="text-sm text-gray-700 truncate">{file.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{(file.size / 1024).toFixed(1)} KB</span>
                </div>
              )}

              <button
                onClick={handlePredict}
                disabled={!file || loading}
                className="w-full bg-[#0E8DA1] text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faBrain} />
                    Analyze Image
                  </>
                )}
              </button>

              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                  <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </div>

            {/* Results Card */}
            {result && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                  <FontAwesomeIcon icon={faChartLine} className="text-[#0E8DA1]" />
                  Analysis Results
                </h2>
                
                {/* Diagnosis Box */}
                <div className="mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Diagnosis</span>
                    <FontAwesomeIcon 
                      icon={faCheckCircle} 
                      className={`text-2xl ${isPneumonia ? 'text-red-500' : 'text-green-500'}`}
                    />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{result.predicted_class}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <FontAwesomeIcon icon={faPercentage} className="text-xs" />
                    Confidence: <span className="font-semibold text-gray-900">{(result.confidence * 100).toFixed(1)}%</span>
                  </p>
                </div>

                {/* Detailed Probabilities */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FontAwesomeIcon icon={faListUl} />
                    Detailed Probabilities
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(result.probabilities)
                      .sort(([, a], [, b]) => b - a)
                      .map(([key, value]) => (
                        <div key={key}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-800 flex items-center gap-2">
                              <FontAwesomeIcon icon={faLungs} className="text-[#0E8DA1]" />
                              {key}
                            </span>
                            <span className="text-sm font-bold text-[#0E8DA1]">
                              {(value * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div
                              className="h-full bg-[#0E8DA1] rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${value * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Images Side by Side */}
          <div className="lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto lg:pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="bg-white rounded-2xl shadow-md p-6">
              {previewUrl ? (
                <div className="space-y-6">
                  {/* Original Image */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FontAwesomeIcon icon={faImage} className="text-[#0E8DA1]" />
                      Original Image
                    </h2>
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="X-ray preview"
                        className="w-full h-auto rounded-xl"
                        style={{ maxHeight: '400px', objectFit: 'contain' }}
                      />
                      {loading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                          <div className="text-center">
                            <FontAwesomeIcon icon={faCog} spin className="text-5xl text-white mb-3" />
                            <p className="text-white font-medium">Analyzing image...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* GradCAM Heatmap */}
                  {gradcamUrl && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <FontAwesomeIcon icon={faFire} className="text-purple-600" />
                        GradCAM Heatmap
                      </h2>
                      {gradcamLoading ? (
                        <div className="flex items-center justify-center bg-gray-50 rounded-xl" style={{ minHeight: '350px' }}>
                          <div className="text-center">
                            <FontAwesomeIcon icon={faSpinner} spin className="text-5xl text-purple-600 mb-3" />
                            <p className="text-gray-600 font-medium">Generating heatmap...</p>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={gradcamUrl}
                          alt="GradCAM result"
                          className="w-full h-auto rounded-xl"
                          style={{ maxHeight: "400px", objectFit: "contain" }}
                        />
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FontAwesomeIcon icon={faImage} className="text-[#0E8DA1]" />
                    Image Preview
                  </h2>
                  <div className="flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300" style={{ minHeight: '400px' }}>
                    <div className="text-center">
                      <FontAwesomeIcon icon={faImages} className="text-6xl text-gray-300 mb-3" />
                      <p className="text-gray-500 font-medium">No image selected</p>
                      <p className="text-sm text-gray-400 mt-2">Upload an X-ray to see preview</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default PneumoniaPredict;