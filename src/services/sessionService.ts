import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_KEY = "GROVIO_SESSION";

/*
====================================
Save Session
====================================
*/

export const saveSession = async (
  session: any
) => {

  try {

    await AsyncStorage.setItem(
      SESSION_KEY,
      JSON.stringify(session)
    );

    return true;

  } catch (error) {

    console.log(
      "Save Session Error:",
      error
    );

    return false;

  }

};

/*
====================================
Get Session
====================================
*/

export const getSession = async () => {

  try {

    const data =
      await AsyncStorage.getItem(
        SESSION_KEY
      );

    if (!data)
      return null;

    return JSON.parse(data);

  } catch (error) {

    console.log(
      "Get Session Error:",
      error
    );

    return null;

  }

};

/*
====================================
Clear Session
====================================
*/

export const clearSession = async () => {

  try {

    await AsyncStorage.removeItem(
      SESSION_KEY
    );

    return true;

  } catch (error) {

    console.log(
      "Clear Session Error:",
      error
    );

    return false;

  }

};