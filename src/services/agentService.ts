import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

export const createAgent =
  async (agentData: any) => {
    try {
      const docRef =
        await addDoc(
          collection(db, "agents"),
          agentData
        );

      return docRef.id;
    } catch (error) {
      console.log(error);
    }
  };

export const fetchAgents =
  async () => {
    try {
      const snapshot =
        await getDocs(
          collection(db, "agents")
        );

      const agents: any[] = [];

      snapshot.forEach(
        (docItem) => {
          agents.push({
            firestoreId:
              docItem.id,
            ...docItem.data(),
          });
        }
      );

      return agents;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

export const updateAgent =
  async (
    firestoreId: string,
    agentData: any
  ) => {
    try {
      await updateDoc(
        doc(
          db,
          "agents",
          firestoreId
        ),
        agentData
      );
    } catch (error) {
      console.log(error);
    }
  };
export const toggleAgentStatus =
async (
firestoreId: string,
currentStatus: boolean
) => {
try {
await updateDoc(
doc(
db,
"agents",
firestoreId
),
{
active: !currentStatus,
}
);
} catch (error) {
console.log(error);
}
};
export const getAgentByMobile =
  async (mobile: string) => {

    const agents =
      await fetchAgents();

    return agents.find(
      (agent) =>
        String(agent.mobile) ===
        String(mobile)
    );
  };
