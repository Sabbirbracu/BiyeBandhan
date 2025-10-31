import { db } from "@/lib/firebase";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { useEffect } from "react";

interface ChatMessage {
  id: string;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at: string;
}

export function useChatListener(
  chatId: string | null,
  onMessagesUpdate: (messages: ChatMessage[]) => void
) {
  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, `chats/${chatId}/messages`),
      orderBy("created_at")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages: ChatMessage[] = snapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          return {
            id: doc.id,
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            message: data.message,
            created_at: data.created_at,
          };
        }
      );
      onMessagesUpdate(messages);
    });

    return () => unsubscribe();
  }, [chatId, onMessagesUpdate]);
}
