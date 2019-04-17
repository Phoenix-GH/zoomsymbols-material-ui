import React from 'react';
import PropTypes from 'prop-types';

import { Select, MenuItem, FormControl } from '@material-ui/core';

function GroupDropdown(props) {
  const { onSelect, selectedGroup, items } = props;
  
  return (
    <FormControl>
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