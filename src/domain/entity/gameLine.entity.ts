import { LineType } from '../../domain/enum/line-type.enum';

export class GameLine {
  lineText: string;
  lineType: LineType;
  playerName: string;
  playerKill: string;
  playerKilled: string;

  private readonly START_GAME_PATTERN = 'InitGame';
  private readonly PLAYER_NAME_PATTERN = 'ClientUserinfoChanged';
  private readonly KILL_PATTERN = 'Kill:';

  private readonly PLAYER_NAME_START_PATTERN = ' n';
  private readonly PLAYER_NAME_END_PATTERN = 'model';

  private readonly KILL_NAME_START_PATTERN = ': ';
  private readonly KILL_NAME_END_PATTERN = ' killed';

  private readonly KILLED_NAME_START_PATTERN = 'killed ';
  private readonly KILLED_NAME_END_PATTERN = ' by ';

  constructor(line: string) {
    this.lineText = line;
    this.setLineType();
    this.setPlayerName();
    this.setPlayerKill();
    this.setPlayerKilled();
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

  setPlayerName() {
    if (LineType.PLAYER === this.lineType) {
      const startIdx =
        this.lineText.indexOf(this.PLAYER_NAME_START_PATTERN) +
        this.PLAYER_NAME_START_PATTERN.length;
      const endIdx = this.lineText.indexOf(this.PLAYER_NAME_END_PATTERN);
      this.playerName = this.lineText
        .substring(startIdx + 1, endIdx - 5)
        .trim();
    }
  }

  setPlayerKill() {
    if (LineType.KILL === this.lineType) {
      let startIdx = this.lineText.indexOf(this.KILL_NAME_START_PATTERN, 1);
      startIdx =
        this.lineText.indexOf(this.KILL_NAME_START_PATTERN, startIdx + 1) +
        this.KILL_NAME_START_PATTERN.length;
      const endIdx = this.lineText.indexOf(this.KILL_NAME_END_PATTERN);
      this.playerKill = this.lineText.substring(startIdx, endIdx).trim();
    }
  }

  setPlayerKilled() {
    if (LineType.KILL === this.lineType) {
      const startIdx =
        this.lineText.indexOf(this.KILLED_NAME_START_PATTERN, 2) +
        this.KILLED_NAME_START_PATTERN.length;
      const endIdx = this.lineText.indexOf(this.KILLED_NAME_END_PATTERN);
      this.playerKilled = this.lineText.substring(startIdx, endIdx).trim();
    }
  }
}
