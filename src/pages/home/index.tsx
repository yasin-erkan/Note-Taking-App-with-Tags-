import {FC, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Alert, Button, Grid2 as Grid, Stack, Typography} from '@mui/material';
import PageContainer from '../../styled/page-container';
import {Link} from 'react-router-dom';
import Filter from '../../components/filter';
import NoteCard from '../../components/card/note-card';
import {Note} from '../../types';

interface NotesState {
  notes: Note[];
}

const Home: FC = () => {
  const notes = useSelector((store: RootState) => store.notes.notes);
  const [title, setTitle] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  /*
   * Filtering is optimized with useMemo.
   
   * 1) The note title must include the text searched in the first input.
   note.title.toLowerCase().includes(title.toLowerCase() 
   &&
   * 2) Each of the tags selected in the second input must match at least one of the note's tags.
   selectedTags.every((sTag) => note.tags.includes(sTag))
   */

  const filteredNotes = useMemo(() => {
    if (!notes) return []; // Handle case when notes is undefined
    return notes.filter(
      note =>
        note.title.toLowerCase().includes(title.toLowerCase()) &&
        selectedTags.every(sTag => note.tags.includes(sTag)),
    );
  }, [notes, title, selectedTags]);

  return (
    <PageContainer>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" gap={1}>
          <img src="/logo.png" width={50} />
          <Typography variant="h4">Notes</Typography>
        </Stack>

        <Button component={Link} to="/create" variant="contained">
          Create
        </Button>
      </Stack>

      <Filter setTitle={setTitle} setSelectedTags={setSelectedTags} />

      <Grid container spacing={2} mt={4}>
        {filteredNotes.length === 0 ? (
          <Grid size={12}>
            <Alert severity="warning">No Notes Found</Alert>
          </Grid>
        ) : (
          filteredNotes.map((note: Note) => (
            <Grid size={{xs: 12, md: 6, lg: 4}} key={note.id}>
              <NoteCard key={note.id} note={note} />
            </Grid>
          ))
        )}
      </Grid>
    </PageContainer>
  );
};

export default Home;
