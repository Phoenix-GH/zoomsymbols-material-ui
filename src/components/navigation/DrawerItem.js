import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class DrawerItem extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes, title, items, icon } = this.props;

    return (
      <List
        component="nav"
        className={classes.root}
      >
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText inset primary={title} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          {
            items && items.map(item => (
              <ListItem button key={item.route}>
                <Link to={`/${item.route}`} className={classes.nested} id="nav-link">
                  <ListItemText>{item.title} </ListItemText>
                </Link>
              </ListItem>
            ))
          }
          </List>
          
        </Collapse>
      </List>
    );
  }
}

DrawerItem.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array,
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};
DrawerItem.defaultProps = {
  items: null,
}

export default withStyles(styles)(DrawerItem);
