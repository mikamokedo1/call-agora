export interface Message {
  create_at: string;
  created_by: string;
  id: number;
  media?: string[];
  roomId: string;
  text: string;
  type: string;
}

export interface Chat {
  inputComposer: string;
}
