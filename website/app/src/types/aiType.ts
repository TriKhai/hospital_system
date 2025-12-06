export interface PredictionResult {
  predicted_class: string;
  confidence: number;
  probabilities: Record<string, number>;
}

// export interface AiResponse extends ResponseData<PredictionResult> {}
