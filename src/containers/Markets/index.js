import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    borderColor: 'gray',
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
  progress: {
    marginLeft: theme.spacing.unit * 2,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
  neutral: {
    color: 'black',
  }
});

class Markets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: 'indices',
      isLoading: false,
      orderBy: null,
      order: 'asc',
    };
  }

  componentDidMount() {
    new Promise((resolve, reject) => {
      this.setState({ isLoading: true });
      this.props.getMarketsWatcher(null, resolve, reject);
    })
    .catch(e => {
      console.log(e);
    })
    .finally(e => {
      this.setState({ isLoading: false });
      console.log(e);
    });

    new Promise((resolve, reject) => {
      this.setState({ isLoading: true });
      this.props.getMarketRowsWatcher({
        groupCode: this.state.selectedGroup,
      }, resolve, reject);
    })
    .catch(e => {
      console.log(e);
    })
    .finally(e => {
      this.setState({ isLoading: false });
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

  handleRequestSort = (property) => {
    const orderBy = property;
    let order = 'desc';
    const { selectedGroup } = this.state;
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy }, () => {
      new Promise((resolve, reject) => {
        this.props.getMarketRowsWatcher({
          groupCode: selectedGroup,
          sortabledatafield: orderBy,
          sortorder: order,
        }, resolve, reject);
      })
      .catch(e => {
        console.log('error while sorting----', e);
      })
      .finally(e => {
        this.setState({ isLoading: false });
        console.log(e);
      });
    });
  };


  onSelect = (event) => {
    this.setState({ selectedGroup: event.target.value, isLoading: true }, () => {
      new Promise((resolve, reject) => {
        this.props.getMarketRowsWatcher({
          groupCode: event.target.value,
        }, resolve, reject);  
      })
      .catch(e => {
        console.log('error----', e);
      })
      .finally(e => {
        this.setState({ isLoading: false });
        console.log(e);
      });
    });
    
  }

  render() {
    const { classes, markets: { markets, market_rows } } = this.props;
    const { selectedGroup, isLoading, orderBy, order } = this.state;
    console.log('props---', this.props);
    return (
      <div className={classes.root}>
        <div className={classes.row}>
          {
            markets && markets.result && markets.result.menu && <GroupDropdown 
              items={markets.result.menu}
              onSelect={(selectedGroup) => this.onSelect(selectedGroup)}
              selectedGroup={selectedGroup}
            />
          }
          {
            isLoading && <CircularProgress className={classes.progress} size={20} />
          }
        </div>
        
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {
                market_rows && market_rows.columns.map(item => (
                  <TableCell key={item.code}>
                    <Tooltip
                      title="Sort"
                      placement={'bottom-end'}
                      enterDelay={300}
                    >
                      <TableSortLabel
                        active={orderBy === item.code}
                        direction={order}
                        onClick={() => this.handleRequestSort(item.code)}
                      >
                      {item.name}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          {
            market_rows && <TableBody>
            {market_rows.rows.map((row, id) => (
              <TableRow key={id}>
                {
                  market_rows.columns.map(item => {
                    const values = row.chart_data.map(x => x.value);
                    const options = {
                      title: {
                        text: null,
                      },
                      series: [{
                        data: values,
                      }],
                      xAxis: {
                        title: {
                            text: null
                        },
                        labels: {enabled: false },
                        gridLineWidth: 0,
                      },
                      yAxis: {
                          labels: {enabled: false },
                          gridLineWidth: 0,
                          title: {
                              text: '',
                              align: 'high'
                          }
                      },
                      legend: {
                        enabled: false,
                      },
                      chart: {
                        height: 100,
                        type: 'line',
                        backgroundColor: 'transparent',
                      },
                      credits: {
                        enabled: false
                      },
                    };

                    const numeric = item.format && item.format.type === 'number' && item.green_red_white;
                    const direction = item.format && item.format.type === 'direction';

                    const style = ((numeric && row[`${item.code}`] > 0) || (direction && row[`${item.code}`] === 'UP')) ? classes.positive : (((numeric && row[`${item.code}`] < 0) || (direction && row[`${item.code}`] === 'DOWN')) ? classes.negative : classes.neutral)
                    
                    return <TableCell component="td" scope="row" key={item.code} style={{ borderLeft: 1, borderLeftStyle: 'solid', borderColor: 'gray' }}>
                      {item.code !== 'chart_data' ? (
                        item.code !== 'symbol_value' ? <span className={style}>{row[`${item.code}`]}</span> : <a href='#'>{row[`${item.code}`]}</a>
                      ) :                         
                        <div style={{ width: 300 }}>
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                          />
                        </div>}
                    </TableCell>;
                  })
                }
                </TableRow>
              ))}
            </TableBody>
          }
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