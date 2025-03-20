import {Button, Grid2 as Grid, Stack, TextField, styled} from '@mui/material';
import {FC, useState} from 'react';
import TagSelect from './tag-select';
import {Note, NoteData} from '../../types';
import {Link} from 'react-router-dom';

interface Props {
  note?: Note;
  handleSubmit: (data: NoteData) => void;
}

const Label = styled('label')({
  fontSize: '1rem',
});

const Form: FC<Props> = ({note, handleSubmit}) => {
  const [title, setTitle] = useState<string>(note?.title || '');
  const [markdown, setMarkdown] = useState<string>(note?.markdown || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(note?.tags || []);

  const handleForm = () => {
    if (!title || !markdown || !selectedTags.length) {
      return alert('Please fill in all fields.');
    }

    handleSubmit({title, markdown, tags: selectedTags});
  };

  return (
    <Stack spacing={7} sx={{mt: 5}}>
      {/* Top section */}
      <Grid container spacing={5}>
        <Grid size={6}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Grid>

        <Grid size={6}>
          <TagSelect
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </Grid>
      </Grid>

      {/* Markdown Area */}
      <Stack gap={2}>
        <Label>Content (supports markdown)</Label>

        <TextField
          fullWidth
          minRows={15}
          maxRows={50}
          multiline
          value={markdown}
          onChange={e => setMarkdown(e.target.value)}
        />
      </Stack>

      {/* Buttons */}
      <Stack direction="row" spacing={5} justifyContent="end">
        <Button
          component={Link}
          to={note ? `/note/${note.id}` : '..'}
          variant="contained"
          color="secondary"
          sx={{minWidth: '100px'}}>
          Back
        </Button>

        <Button
          onClick={handleForm}
          variant="contained"
          sx={{minWidth: '100px'}}>
          Save
        </Button>
      </Stack>
    </Stack>
  );
};

export default Form;
