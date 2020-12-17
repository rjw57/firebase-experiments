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
import Message from './Message';
import SignIn from './SignIn';
import TimeBar from './TimeBar';

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

  interface CleanedMessageDoc {
    id: string;
    message: string;
    uid: string;
    displayName: string;
    photoURL?: string;
    createdAt: firebase.firestore.Timestamp;
  }

  // Filter messages to only those with message, displayName, uid and createdAt set.
  const messageDocs: Array<CleanedMessageDoc> = (
    messagesSnapshot ? messagesSnapshot.docs : []
  ).filter((doc: firebase.firestore.QueryDocumentSnapshot<MessageDoc>) => {
    const { message, displayName, uid, createdAt } = doc.data();
    return !!message && !!displayName && !!uid && !!createdAt;
  }).map((doc: firebase.firestore.QueryDocumentSnapshot<MessageDoc>) => ({
    id: doc.id, ...doc.data()
  } as CleanedMessageDoc));

  // Group by messages when the difference is >thresholdMillis.
  const thresholdMillis = 10 * 60 * 1000;
  const groupedByTimestamp = messageDocs.reduce(
    (accumulator: Array<Array<CleanedMessageDoc>>, doc) => {
      if(!accumulator || accumulator.length === 0) { return [[doc]]; }
      const head = accumulator.slice(0, accumulator.length-1);
      const tail = accumulator[accumulator.length - 1];
      const t1 = tail[0].createdAt.toMillis();
      const t2 = doc.createdAt.toMillis();
      if(t2 - t1 < thresholdMillis) {
        return [...head, [...tail, doc]];
      } else {
        return [...head, tail, [doc]];
      }
    }, [] as Array<Array<CleanedMessageDoc>>
  );

  // For each group, group by uid.
  const groupedByTimestampAndUser = groupedByTimestamp.map(group => group.reduce(
    (accumulator: Array<Array<CleanedMessageDoc>>, doc) => {
      if(!accumulator || accumulator.length === 0) { return [[doc]]; }
      const head = accumulator.slice(0, accumulator.length-1);
      const tail = accumulator[accumulator.length - 1];
      if(tail[0].uid === doc.uid) {
        return [...head, [...tail, doc]];
      } else {
        return [...head, tail, [doc]]
      }
    }, [] as Array<Array<CleanedMessageDoc>>
  ));

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
                groupedByTimestampAndUser.map(timestampGroup => (
                  <div key={timestampGroup[0][0].createdAt.toMillis()}>
                    <TimeBar date={timestampGroup[0][0].createdAt.toDate()} />
                    {
                      timestampGroup.map((userGroup, index) => (
                        <div key={`${timestampGroup[0][0].createdAt.toMillis()}-${userGroup[0].uid}-${index}`}>
                          <div>{ userGroup[0].displayName }</div>
                          {
                            userGroup.map(({ id, message }) => (
                              <Message key={id} message={message} />
                            ))
                          }
                        </div>
                      ))
                    }
                  </div>
                ))
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
