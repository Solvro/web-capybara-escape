import jsonLines from "./textLines.json";

export class SpeechBubble {
  private static instance: SpeechBubble;
  private lineTypeMap: Map<string, string[]>;

  private constructor() {
    this.loadLinesFromJson();
  }

  private loadLinesFromJson() {
    try {
      this.lineTypeMap = new Map<string, string[]>([
        ["positive", jsonLines.positive],
        ["neutral", jsonLines.neutral],
        ["negative", jsonLines.negative],
      ]);
    } catch (error) {
      throw `Error loading text lines: ${error}`;
    }
  }

  pickRandomLine(lineType: "positive" | "neutral" | "negative") {
    return this.lineTypeMap.get(lineType).at(Math.floor(Math.random() * this.lineTypeMap.get(lineType).length));
  }

  static getInstance(){
    if(!SpeechBubble.instance){
      SpeechBubble.instance = new SpeechBubble();
    }
    return SpeechBubble.instance;
  }
}
