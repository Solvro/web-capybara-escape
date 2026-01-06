import jsonLines from "./textLines.json";

export class SpeechBubble {
  private positive: string[];
  private neutral: string[];
  private negative: string[];

  constructor() {
    this.loadLinesFromJson();
  }

  loadLinesFromJson() {
    try {
      this.positive = jsonLines.positive;
      this.neutral = jsonLines.neutral;
      this.negative = jsonLines.negative;
    } catch (error) {
      throw `Error loading text lines: ${error}`;
    }
  }

  pickRandomLine(lineType: "positive" | "neutral" | "negative") {
    switch (lineType) {
      case "positive": {
        console.log(
          this.positive.at(Math.floor(Math.random() * this.positive.length))
        );
        break;
      }
      case "neutral": {
        console.log(
          this.neutral.at(Math.floor(Math.random() * this.neutral.length))
        );
        break;
      }
      case "negative": {
        console.log(
          this.negative.at(Math.floor(Math.random() * this.negative.length))
        );
        break;
      }
    }
  }
}
