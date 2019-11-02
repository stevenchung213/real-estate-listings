import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FlexCaptionContainer } from "./PropertyDetailsEntry.styled";
// import { EntryContainer } from './PropertyDetailsEntry.styled';

const useStyles = makeStyles({
  card: {
    width: 240,
  },
  media: {
    height: 140,
  },
});

const PropertyDetailsEntry = (props) => {
  const { listing } = props;
  const {
    agents, beneficiary, city, current_phone, estimated_value, mailing_city,
    mailing_zip, notice_date, notice_number, open_bid, original_loan_amount, owner_address,
    owner_name, property_address, sales_date, schedule_date, status, trustee_id,
    trustee_name, zip, _id,
  } = listing;
  const classes = useStyles();

  console.log(props);
  return (
    <Card
      className={classes.card}
      raised
      style={
        {
          backgroundColor: status === 'hotlead' ? '#AFEFAD' : status === 'contacted' ? '#fdc47d' : 'white',
        }
      }
      onClick={()=>{console.log('clicked on property card')}}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title={notice_number}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle2" component="h6" noWrap>
            {property_address}
          </Typography>
          <FlexCaptionContainer>
            <Typography variant="caption" color="textSecondary" component="p" noWrap>
              {notice_number}
            </Typography>
            <Typography variant="caption" color="textSecondary" component="p" noWrap>
              {sales_date}
            </Typography>
          </FlexCaptionContainer>
          <Typography variant="caption" color="textSecondary" component="p" noWrap>
            {owner_name}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="p" noWrap>
            {trustee_name}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/*<CardActions>*/}
      {/*  <Button size="small" color="primary">*/}
      {/*    Share*/}
      {/*  </Button>*/}
      {/*  <Button size="small" color="primary">*/}
      {/*    Learn More*/}
      {/*  </Button>*/}
      {/*</CardActions>*/}
    </Card>
  );
};

// const PropertyDetailsEntry = (props) => {
//   const { listing, headers } = props;
//   let content;
//   if (headers) {
//     content = Object.keys(listing).map(field => (
//       <div>
//         {field}
//       </div>
//     ));
//   } else {
//     content = Object.values(listing).map(value => (
//       <div>
//         {value}
//       </div>
//     ));
//   }
//   return (
//     <EntryContainer className="property-details-entry-container">
//       {content}
//     </EntryContainer>
//   );
// };

export default PropertyDetailsEntry;
