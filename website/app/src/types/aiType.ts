export interface PredictionResult {
  predicted_class: string;
  confidence: number;
  probabilities: Record<string, number>;
}

// export interface AiResponse extends ResponseData<PredictionResult> {}

export interface GradcamResult {
  predicted_class: "PNEUMONIA" | "NORMAL" | string; 
  gradcam_image_base64: string; 
}
