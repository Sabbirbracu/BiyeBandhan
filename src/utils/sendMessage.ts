// sendMessage.ts
import { db } from "@/lib/firebase";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";

interface SendMessageParams {
  receiverId: number;
  message: string;
  currentUserId: number;
}

interface SendMessageResponse {
  success: boolean;
  chatId?: string;
}

interface FirestoreMessage {
  chat_id: string;
  sender_id: number;
  receiver_id: number;
  message: string;
  status: string;
  created_at: Date;
  mysql_id: number;
}

export async function sendMessage({
  receiverId,
  message,
  currentUserId,
}: SendMessageParams): Promise<SendMessageResponse> {
  try {
    // 1️⃣ Hit Laravel API
    const res = await axios.post("/api/chat/send", {
      receiver_id: receiverId,
      message,
    });

    const { chat_id, data } = res.data;

    // 2️⃣ Write message to Firestore (real-time layer)
    const firestoreMessage: FirestoreMessage = {
      chat_id: data.chat_id,
      sender_id: data.sender_id,
      receiver_id: data.receiver_id,
      message: data.message,
      status: data.status,
      created_at: new Date(data.created_at),
      mysql_id: data.id,
    };

    await addDoc(collection(db, `chats/${chat_id}/messages`), firestoreMessage);

    return { success: true, chatId: chat_id };
  } catch (error) {
    console.error("Message sending failed:", error);
    return { success: false };
  }
}
