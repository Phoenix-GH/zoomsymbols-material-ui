import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Divider, IconButton, Drawer } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { ChevronRight } from '@material-ui/icons';
import FeatherIcon from 'feather-icons-react';

import DrawerItem from './navigation/DrawerItem';
import { getMenuWatcher } from '../store/actionCreators/menu';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class NaviationDrawer extends React.Component {

  componentDidMount() {
    new Promise((resolve, reject) => {
      this.props.getMenuWatcher(resolve, reject);
    }).catch(e => {
      console.log(e);
    });
  }

  render () {
    const { classes, menu: { menu }, open } = this.props;
    const groups = menu && menu.result && [...new Set(menu.result.map(x => x.group_name))];

    return (
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.props.handleDrawerClose}>
            <ChevronRight />
          </IconButton>
        </div>
        {
          groups && groups.map(item => (
            <DrawerItem
              key={item}
              title={item}
              items={menu.result.filter(x => x.group_name === item)}
              icon={<FeatherIcon icon={menu.result.find(x => x.group_name === item).icon} />}
            />
          ))
        }
        <Divider />
      </Drawer>
    );
  }
}

const mapStateToProps = ({ menu }) => ({
  menu,
});

const mapDispatchToProps = dispatch => bindActionCreators({ getMenuWatcher }, dispatch);

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(NaviationDrawer));
