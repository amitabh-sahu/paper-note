import Header from './components/header';
import AllNotes from './components/allNotes';
import TextField from './components/textField';
import SignIn from './components/signIn';
import NoMatch from './components/noMatch';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from './context';

function App() {
  const [{ user }] = useStateValue();

  return (
    <Box sx={{ p: 3, height: '100vh', display: 'grid', gridTemplateRows: 'max-content auto', gap: 3 }}>
      {!user ? (
        <SignIn />
      ) : (
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <AllNotes />
            </Route>
            <Route path="/add">
              <TextField />
            </Route>
            <Route path="/edit/:noteId">
              <TextField />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      )}
    </Box>
  );
}

export default App;