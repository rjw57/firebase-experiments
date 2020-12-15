/*
 * FirebaseContext allows accessing global firebase objects such as the default
 * auth provider and current user.
 */
import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import firebaseConfig from './firebaseConfig';

export interface IFirebaseContext {
  authProvider: firebase.auth.GoogleAuthProvider;

  /**
   * user is null if we're still waiting for sign in state change. Once sign in
   * state has changed, the user may be anonymous. Use the isAnonymous property
   * to check.
   */
  user: firebase.User | null;
}

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const authProvider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();
authProvider.addScope('profile');
authProvider.setCustomParameters({hd: 'cam.ac.uk', prompt: 'select_account'});

const initiaiContextValue: IFirebaseContext = {
  authProvider, user: firebase.auth().currentUser
};

export const FirebaseContext = React.createContext(initiaiContextValue);

export const FirebaseProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<firebase.User | null>(null);
  firebase.auth().onAuthStateChanged(setUser)

  return <FirebaseContext.Provider value={{...initiaiContextValue, user}}>
    { children }
  </FirebaseContext.Provider>;
}

export default FirebaseContext;
