import { Socket } from "socket.io";
import { Chess } from "chess.js";
class Game {
  public playerWhite: Socket;
  public playerBlack: Socket;
  private board: Chess;
  private moveCount: number;
  constructor(playerWhite: Socket, playerBlack: Socket) {
    this.playerWhite = playerWhite;
    this.playerBlack = playerBlack;
    this.board = new Chess();
    this.moveCount = 0;
    //----initialize game
    this.initializePlayers();
  }
  private sendMessage(socket: Socket, type: MessageType, payload: any): void {
    socket.send(JSON.stringify({ type, payload }));
  }
}

export { Game };
