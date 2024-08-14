class SocketManager {
  private static instance: SocketManager;
  // <key---user-id, value---socket-id>
  private online: Map<string, string>;
  constructor() {
    this.online = new Map();
  }
  // export a singleton
  public static getInstance() {
    if (!this.instance) {
      this.instance = new SocketManager();
    }
    return this.instance;
  }
  // if user online
  public userOnline(id: string): boolean {
    return this.online.has(id);
  }
  public getUserSocket(id: string) {
    if (this.userOnline(id)) {
      return this.online.get(id);
    }
  }
  // connect user
  public connectUser(id: string, socket: string): void {
    if (this.online.has(id)) {
      // user already-present
    } else {
      this.online.set(id, socket);
    }
  }
  // disconnect-user
  public disconnectSocket(socket: string) {
    for (const [user_id, socket_id] of this.online) {
      if (socket_id === socket) {
        this.online.delete(user_id);
        break;
      }
    }
  }
  // get all online users
  public getAllOnlineusers() {
    return Array.from(this.online.entries());
  }
}

const SocketManagerInstance = SocketManager.getInstance();
export { SocketManagerInstance };
