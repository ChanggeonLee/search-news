import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 140,
  },
}));

export default function NewsCard(props) {
  const classes = useStyles();
  const {title, url, img} = props;

  return (
    <Card className={classes.root}>
      <CardActionArea 
        onClick={() => {
          window.location.href = url;
        }}>
        <CardMedia
          className={classes.media}
          image={img}
          title="news img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {url}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
