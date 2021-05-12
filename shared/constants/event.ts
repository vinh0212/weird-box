export type ReservedEvent = "disconnect" | "disconnecting" | "error";

export enum SERVER_EVENT_NAME {
  Notify = "notify",
  UpdateGameMatchingStatus = "update game matcher status",
  GetGameSettings = "get game settings",
  GetPlayerList = "get player list",
  NewGame = "new game",
  GetCards = "get cards",
  CardPlayed = "card played",
  ChargePointChanged = "charge point changed",
  Overcharged = "overcharged",
  PlayerEliminated = "player eliminated",
  GameOver = "game over",
  NewTurn = "new turn",
  HitPointChanged = "hit point changed",
  TakeSpell = "take spell",
  ActivatePassive = "activate passive",
  GetRoomInfo = "get room info",
  FriendJoined = "friend joined",
  FriendLeft = "friend left",
  OwnerChanged = "owner changed",
}

export enum CLIENT_EVENT_NAME {
  Rename = "rename",
  FindGame = "find game",
  CancelFindGame = "cancel find game",
  ReadyConfirm = "ready confirm",
  PlayCard = "play card",
  LeaveGame = "leave game",
  CreateRoom = "create room",
  JoinRoom = "join room",
  LeaveRoom = "leave room",
  TransferOwnership = "transfer ownership",
}
