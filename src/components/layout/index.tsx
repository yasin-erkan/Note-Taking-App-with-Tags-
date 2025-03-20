import {FC} from 'react';
import {useSelector} from 'react-redux';
import {Navigate, Outlet, useParams} from 'react-router-dom';
import {RootState} from '../../redux/store';

const Layout: FC = () => {
  // Subscribe to store
  const {notes} = useSelector((store: RootState) => store.notes);

  // Get id parameter from url
  const {id} = useParams();

  // Find note by id from notes array
  const note = notes.find(note => note.id === id);

  // If note not found, redirect to homepage
  if (!note) {
    return <Navigate to="/" />;
  }

  // If note is found, send it as a prop to layout element
  return <Outlet context={note} />;
};

export default Layout;
