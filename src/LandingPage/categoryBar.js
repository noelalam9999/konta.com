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
import SubCatagoryView from './subcategorybar';
import { Link } from "react-router-dom";
const LATEST_SUGGESTIONS = gql`
query MyQuery {
    products(distinct_on: category) {
      Product_picture_link
      category
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

export default function CatagoryView() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(LATEST_SUGGESTIONS);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
  return (
    <AppBar position='static' color='inherit' style={{ maxWidth: '1800px'  }}>    
        <TreeView
        className={classes.root}
        defaultSelected={['1']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon/>}
        defaultEndIcon={<div style={{ width: 24 }} />}
        >

{data.products.slice(0,8).map((product,index) => (
<>
<StyledTreeItem nodeId="1" labelText={product.category} >
          {/* <Link to={"/category_search/" + product.category}><SubCatagoryView category={product.category}/></Link> */}
         <SubCatagoryView category={product.category}/>
         </StyledTreeItem>
</>

))}
       
      
        </TreeView>
    </AppBar>
  );
}