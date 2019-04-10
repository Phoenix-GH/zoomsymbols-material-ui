import React from 'react';
import PropTypes from 'prop-types';

import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

function GroupDropdown(props) {
  const { onSelect, selectedGroup, items } = props;
  
  return (
    <FormControl>
      <InputLabel shrink htmlFor="age-label-placeholder">
        Group
      </InputLabel>

      <Select
        value={selectedGroup}
        onChange={onSelect}
        inputProps={{
          name: 'group_code',
          id: 'group_code',
        }}
      >
        {
          items.map(item => (
            <MenuItem value={item.group_code} key={item.group_code}>{item.group_title}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}

GroupDropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedGroup: PropTypes.string,
  items: PropTypes.array,
};

GroupDropdown.defaultProps = {
  selectedGroup: '',
  items: [],
};

export default GroupDropdown;