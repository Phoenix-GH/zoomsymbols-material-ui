import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { GroupDropdown } from '../../components';
import { getMarketsWatcher, getMarketRowsWatcher } from '../../store/actionCreators/markets';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%'
  },
  button: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  submitButton: {
    margin: theme.spacing.unit,
  },
  table: {
    marginTop: 10,
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: 3 * theme.spacing.unit,
    width: 200,
  },
  header: {
    height: 100,
    display: 'flex',
    alignItems: 'baseline',
  },
});

class Markets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markets: 'business',
      selectedGroup: 'indices',
    };
  }

  componentDidMount() {
    new Promise((resolve, reject) => {
      this.props.getMarketsWatcher();
      this.props.getMarketRowsWatcher({
        groupCode: this.state.selectedGroup,
      });
    }).catch(e => {
      console.log(e);
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.session) {
      return {  
        markets: props.markets,
      };
    }
    return null;
  }

  onSelect = (event) => {
    console.log('selectedGroup-----', event.target.value);
    this.setState({ selectedGroup: event.target.value }, () => {
      this.props.getMarketRowsWatcher({
        groupCode: event.target.value,
      });
    });
  }

  render() {
    const { classes, markets: { markets, market_rows } } = this.props;
    const { selectedGroup } = this.state;

    return (
      <div className={classes.root}>
        {
          markets && markets.result && markets.result.menu && <GroupDropdown 
            items={markets.result.menu}
            onSelect={(selectedGroup) => this.onSelect(selectedGroup)}
            selectedGroup={selectedGroup}
          />
        }
        
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {
                market_rows && market_rows.columns.map(item => (
                  <TableCell key={item.code}>{item.name}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {market_rows && market_rows.rows.map((row, id) => (
              <TableRow key={row.id}>
              {
                market_rows.columns.map(item => (
                  <TableCell component="td" scope="row" key={item.code}>
                    {item.code !== 'chart_data' ? row[`${item.code}`] : ''}
                  </TableCell>
                ))
              }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Markets.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ markets }) => ({
  markets,
});

const mapDispatchToProps = dispatch => bindActionCreators({ getMarketsWatcher, getMarketRowsWatcher }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Markets));