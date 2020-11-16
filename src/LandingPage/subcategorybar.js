import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { auto } from '@popperjs/core';
import { useLazyQuery, gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";

const LATEST_SUGGESTIONS = gql`
query MyQuery($match:String){
    products(distinct_on: subcategories, where: {category: {_eq: $match}}) {
    
      subcategories
    }
  }
  
  
`



const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: '`var(--tree-view-bg-color, ${theme.palette.grey[400]})`',
      color: 'var(--tree-view-color)',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    height: '60px',
    width: '140px',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelText: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'inherit',
    flexGrow: 1,
    marginTop: '10px',
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: color, bgColor, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: auto,
    flexGrow: 1,
    width: auto,
    fontSize: '20px',
    display: 'flex',
    flexDirection: 'row',
  },
});

export default function SubCatagoryView(props) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(LATEST_SUGGESTIONS,{
    variables: { match: props.category}
  });
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
  return (
      <>
    
{data.products.slice(0,4).map((product,index) => (
    
    <StyledTreeItem
    nodeId="5"
    labelText={product.subcategories}
    color="#1a73e8"
    bgColor="#e8f0fe"
    />  
))}
      </>
    
  );
}