import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

export const createAgent = async (
  agentData: any
) => {
  try {
    const mobile = String(
      agentData.mobile || ""
    ).trim();

    // Check for duplicate mobile number
    const snapshot = await getDocs(
      collection(db, "agents")
    );

    const existingAgent =
      snapshot.docs.find(
        (docItem) =>
          String(
            docItem.data().mobile || ""
          ).trim() === mobile
      );

    if (existingAgent) {
      throw new Error(
        "An agent with this mobile number already exists."
      );
    }

    const docRef = await addDoc(
      collection(db, "agents"),
      {
        ...agentData,
        mobile,
      }
    );

    return docRef.id;
  } catch (error) {
    console.log(
      "Create Agent Error:",
      error
    );

    throw error;
  }
};

export const fetchAgents = async () => {
  try {
    const snapshot = await getDocs(
      collection(db, "agents")
    );

    const agents: any[] = [];

    snapshot.forEach((docItem) => {
      agents.push({
        firestoreId: docItem.id,
        ...docItem.data(),
      });
    });

    return agents;
  } catch (error) {
    console.log(
      "Fetch Agents Error:",
      error
    );

    return [];
  }
};

export const updateAgent = async (
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
    console.log(
      "Update Agent Error:",
      error
    );

    throw error;
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
      console.log(
        "Toggle Agent Error:",
        error
      );

      throw error;
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