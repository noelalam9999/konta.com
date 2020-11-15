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

  return (
    <AppBar position='static' color='inherit' style={{ maxWidth: '1800px'  }}>    
        <TreeView
        className={classes.root}
        defaultSelected={['1']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon/>}
        defaultEndIcon={<div style={{ width: 24 }} />}
        >
        <StyledTreeItem nodeId="1" labelText="Gadgets" >
            <StyledTreeItem
            nodeId="5"
            labelText="Mobiles"
            color="#1a73e8"
            bgColor="#e8f0fe"
            />
            <StyledTreeItem
            nodeId="6"
            labelText="Laptops"
            color="#1a73e8"
            bgColor="#e8f0fe"
            />
            </StyledTreeItem>
        <StyledTreeItem nodeId="2" labelText="Cloth" >
            <StyledTreeItem
                nodeId="7"
                labelText="Denim Jeans"
                color="#1a73e8"
                bgColor="#e8f0fe"
                />
                <StyledTreeItem
                nodeId="8"
                labelText="Armani"
                color="#1a73e8"
                bgColor="#e8f0fe"
                />
                <StyledTreeItem
                nodeId="9"
                labelText="Levis"
                color="#1a73e8"
                bgColor="#e8f0fe"
                />
                <StyledTreeItem
                nodeId="10"
                labelText="Le Reve"
                color="#1a73e8"
                bgColor="#e8f0fe"
                />
            </StyledTreeItem>
        <StyledTreeItem nodeId="3" labelText="Utilities" >
            <StyledTreeItem
            nodeId="11"
            labelText="Washing machine"
            color="#1a73e8"
            bgColor="#e8f0fe"
            />
            <StyledTreeItem
            nodeId="12"
            labelText="Sarif melamine"
            color="#1a73e8"
            bgColor="#e8f0fe"
            />
            <StyledTreeItem
            nodeId="13"
            labelText="RLF plastic"
            color="#1a73e8"
            bgColor="#e8f0fe"
            />
            <StyledTreeItem
            nodeId="14"
            labelText="Utensils"
            color="#1a73e8"
            bgColor="#e8f0fe"
            />
        </StyledTreeItem>
        <StyledTreeItem nodeId="4" labelText="Medicine" >
            <StyledTreeItem
                nodeId="15"
                labelText="GlaxoSmith"
                color="#1a73e8"
                bgColor="#e8f0fe"
                />
                <StyledTreeItem
                nodeId="16"
                labelText="Square"
                color="#1a73e8"
                bgColor="#e8f0fe"
                />
                <StyledTreeItem
                nodeId="17"
                labelText="Beximco"
                color="#1a73e8"
                bgColor="#e8f0fe"
                />
            </StyledTreeItem>
        </TreeView>
    </AppBar>
  );
}