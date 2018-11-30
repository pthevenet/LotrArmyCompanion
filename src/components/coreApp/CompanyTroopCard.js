import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

import UnitCharacteristics from "./UnitCharacteristics";

import { CARD_IMAGE_HEIGHT, CARD_MAX_WIDTH, LIEUTNANT, SERGEANT } from "../../utils/Constants";

import { LieutnantIcon, SergeantIcon, WargearIcon } from "./../icons/CardIcons";
import { Grid, Grow, Avatar, IconButton, Tooltip, Chip } from "@material-ui/core";

import { calculatePoints } from "./../../utils/ArmyCalculations.js";

const styles = theme => ({
  card: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      maxWidth: CARD_MAX_WIDTH
    }
  },
  media: {
    height: CARD_IMAGE_HEIGHT
  },
  icons: {
    padding: theme.spacing.unit * 0.8,
    marginRight: theme.spacing.unit,
    cursor: "initial",
    defaultColor: "black"
  },
  statusAvatar: {
    marginTop: theme.spacing.unit,
    fontSize: 16,
    color: theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.background.paper,
    backgroundColor: theme.palette.type === "dark" ? theme.palette.background.default : theme.palette.primary.light
  },
  chipRoot: {
    marginTop: theme.spacing.unit * 0.5,
    marginBottom: theme.spacing.unit,
    display: "flex"
    // flexWrap: "no-wrap"
  },
  chip: {
    textTransform: "capitalize",
    margin: theme.spacing.unit * 0.5,
    fontSize: 10
  }
});

function CompanyTroopCard(props) {
  const { baseTroop, userTroop, classes, theme } = props;

  return (
    <Grow in={true}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media} image={userTroop.image_path} title={userTroop.name} />
        </CardActionArea>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {userTroop.troop_type === LIEUTNANT && (
              <Tooltip placement="top" title="Lieutnant">
                <IconButton className={classes.icons}>
                  <LieutnantIcon />
                </IconButton>
              </Tooltip>
            )}
            {userTroop.troop_type === SERGEANT && (
              <Tooltip placement="top" title="Sergeant">
                <IconButton className={classes.icons}>
                  <SergeantIcon />
                </IconButton>
              </Tooltip>
            )}
            {userTroop.troop_type !== LIEUTNANT && userTroop.troop_type !== SERGEANT && (
              <Tooltip placement="top" title="Warrior">
                <IconButton className={classes.icons}>
                  <WargearIcon />
                </IconButton>
              </Tooltip>
            )}
            {userTroop.display_name}
          </Typography>

          <Grid container justify="space-evenly">
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography color="textSecondary" variant="button">
                    Points
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    <Avatar className={classes.statusAvatar}>{calculatePoints(baseTroop, userTroop)}</Avatar>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography color="textSecondary" variant="button">
                    Experience
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    <Avatar className={classes.statusAvatar}>{userTroop.experience}</Avatar>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Hidden xsDown={true}>
            <UnitCharacteristics improvs={userTroop.improvements} characs={baseTroop.characteristics} />
          </Hidden>

          <Typography color="textPrimary" variant="button">
            Wargear
          </Typography>
          <div className={classes.chipRoot}>
            {userTroop.wargear
              .filter(weapon => baseTroop.base_wargear.indexOf(weapon) !== -1)
              .map((weapon, index) => (
                <Chip key={index} label={weapon.replace(/_/g, " ")} className={classes.chip} />
              ))}
            {userTroop.wargear
              .filter(weapon => !(baseTroop.base_wargear.indexOf(weapon) !== -1))
              .map((weapon, index) => (
                <Chip key={index} label={weapon.replace(/_/g, " ")} className={classes.chip} />
              ))}
          </div>

          <Typography color="textPrimary" variant="button">
            Description
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {baseTroop.description}
          </Typography>
        </CardContent>

        <CardActions>
          <Button variant="outlined" size="small">
            Promote
          </Button>
        </CardActions>
      </Card>
    </Grow>
  );
}

CompanyTroopCard.propTypes = {
  classes: PropTypes.object.isRequired,
  userTroop: PropTypes.object.isRequired,
  baseTroop: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CompanyTroopCard);
