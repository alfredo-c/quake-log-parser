export enum LineType {
  START,
  PLAYER,
  KILL,
  OTHER,
}

export class GameLine {
  lineType: LineType;
  lineText: string;

  private readonly START_GAME_PATTERN = 'InitGame';
  private readonly PLAYER_NAME_PATTERN = 'ClientUserinfoChanged';
  private readonly KILL_PATTERN = 'Kill:';

  constructor(line: string) {
    this.lineText = line;
    this.setLineType();
  }

  setLineType() {
    if (this.lineText.match(new RegExp(this.START_GAME_PATTERN))) {
      this.lineType = LineType.START;
    } else if (this.lineText.match(new RegExp(this.PLAYER_NAME_PATTERN))) {
      this.lineType = LineType.PLAYER;
    } else if (this.lineText.match(new RegExp(this.KILL_PATTERN))) {
      this.lineType = LineType.KILL;
    } else {
      this.lineType = LineType.OTHER;
    }
  }
}
