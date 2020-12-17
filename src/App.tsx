import React from 'react';
import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

import AppBar from './AppBar';
import BottomBox from './BottomBox';
import ChatInput from './ChatInput';
import HideOnScroll from './HideOnScroll';
import SignIn from './SignIn';
import Message from './Message';

interface MessageDoc {
  uid?: string;
  photoURL?: string;
  displayName?: string;
  message?: string;
  createdAt?: firebase.firestore.Timestamp;
}

const App = () => {
  const messagesRef = (
    firebase.firestore().collection('messages') as
    firebase.firestore.CollectionReference<MessageDoc>
  );
  const query = messagesRef.orderBy('createdAt').limitToLast(100);

  const [ user, loading ] = useAuthState(firebase.auth());
  const [ messagesSnapshot ] = useCollection(query);

  const handleSignOut = () => { firebase.auth().signOut(); };
  const handleNewMessage = async (message: string) => {
    const { uid, photoURL, displayName } = user;
    const doc = {
      message, uid, photoURL, displayName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    } as MessageDoc;
    await messagesRef.add(doc);
  };

  // Filter messages to only those with message, displayName, uid and createdAt set.
  const messageDocs = (
    messagesSnapshot ? messagesSnapshot.docs : []
  ).filter((doc: firebase.firestore.QueryDocumentSnapshot<MessageDoc>) => {
    const { message, displayName, uid, createdAt } = doc.data();
    return !!message && !!displayName && !!uid && !!createdAt;
  });

  return <>
    <CssBaseline />
    <HideOnScroll>
      <AppBar user={user} onSignOut={handleSignOut}>
        <Toolbar>
          <Typography variant="h6">Experimental app</Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
    <Toolbar />
    {
      loading && (
        <Box textAlign="center" my={4}>
          <CircularProgress />
        </Box>
      )
    }
    {
      !loading && (!user || user.isAnonymous) && (
        <Container>
          <Box my={2}><SignIn /></Box>
        </Container>
      )
    }
    {
      !loading && user && !user.isAnonymous && (
        <>
          <Container>
            <Box my={2}>
              {
                messageDocs.map((
                  doc: firebase.firestore.QueryDocumentSnapshot<MessageDoc>
                ) => {
                  const { message } = doc.data();
                  if(!message) { return null; }
                  return <Message
                    key={doc.id}
                    message={message}
                  />;
                })
              }
            </Box>
          </Container>
          <Toolbar />
          <BottomBox>
            <Paper>
              <Container>
                <ChatInput onNewMessage={handleNewMessage}/>
              </Container>
            </Paper>
          </BottomBox>
        </>
      )
    }
  </>;
}

export default App;
