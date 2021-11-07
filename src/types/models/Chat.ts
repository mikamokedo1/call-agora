export interface Message {
  created_at: string;
  created_by: string;
  id: number;
  media?: string[];
  roomId: string;
  text: string;
  type: string;
  channel: string;
}

export interface Chat {
  inputComposer: string;
}
