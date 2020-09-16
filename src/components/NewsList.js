import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NewsCard from './NewsCard';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3)
  },
}));

export default function NewsList(props) {
  const classes = useStyles();
  const { news } = props;

  let list;
  if(news){
    list = news.map((n) => 
      <NewsCard key={n._id} title={n._source.title} url={n._source.url} img={n._source.img} />
    );
  }
  
  return (
    <Grid container className={classes.root} spacing={2}>
      {list}      
    </Grid>
  );
}
