class Game {
  private static instance: Game;

  public static getInstance() {
    if (!this.instance) this.instance = new Game();
    return this.instance;
  }
}

const GameInstance = Game.getInstance();
export { GameInstance };
