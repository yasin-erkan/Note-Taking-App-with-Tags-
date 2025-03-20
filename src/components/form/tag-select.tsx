import {Autocomplete, TextField} from '@mui/material';
import {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addTag} from '../../redux/slices/tagsSlice';
import {RootState} from '../../redux/store';

interface Props {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagSelect: FC<Props> = ({selectedTags, setSelectedTags}) => {
  const {tags} = useSelector((store: RootState) => store.tags);
  const dispatch = useDispatch();

  return (
    <Autocomplete
      multiple
      freeSolo
      options={tags}
      value={selectedTags}
      onChange={(_, inputTags: string[]) => {
        try {
          if (inputTags.length === 5) {
            return alert('Maximum number of tags reached');
          }

          if (inputTags[inputTags.length - 1]) {
            dispatch(addTag(inputTags[inputTags.length - 1]));
          }

          setSelectedTags(inputTags);
        } catch (error) {
          console.error('Error in tag selection:', error);
        }
      }}
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          label="Tags"
          placeholder="Add tag"
        />
      )}
    />
  );
};

export default TagSelect;
