import React, { Component } from "react";

import PropTypes from "prop-types";

import {
  Paper,
  withStyles,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Dialog,
  Chip,
  Avatar,
  DialogContent,
  CardContent
} from "@material-ui/core";

import { MIN_HEIGHT_600, CARD_IMAGE_HEIGHT, CARD_MAX_WIDTH } from "../../utils/Constants";
import { GoldSackIcon, VictoryIcon, DrawIcon, DeathIcon } from "../icons/OverviewIcons";

import { createCardData } from "../DataCreation";

import CompanyTroopCard from "./CompanyTroopCard";

const styles = theme => ({
  card: {
    maxWidth: CARD_MAX_WIDTH * 1.5
  },
  cardContent: {
    padding: theme.spacing.unit * 2
  },
  companyTitle: {
    margin: theme.spacing.unit * 2,
    fontWeight: 400,
    color: theme.palette.primary.light
  },
  media: {
    height: CARD_IMAGE_HEIGHT
  },
  chip: {
    textTransform: "capitalize",
    margin: theme.spacing.unit * 0.5,
    fontSize: 10
  },
  statusAvatar: {
    marginTop: theme.spacing.unit,
    fontSize: 16,
    color: theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.background.paper,
    backgroundColor: theme.palette.type === "dark" ? theme.palette.background.default : theme.palette.secondary.main
  },
  goldAvatar: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.dark
  },
  drawAvatar: {
    color: theme.palette.type === "dark" ? theme.palette.text.secondary : theme.palette.background.paper
  },
  victoryAvatar: {
    backgroundColor: "#43A047",
    color: theme.palette.type === "dark" ? theme.palette.text.secondary : theme.palette.background.paper
  },
  lossAvatar: {
    backgroundColor: "#BF360C",
    color: theme.palette.type === "dark" ? theme.palette.text.secondary : theme.palette.background.paper
  },
  victoryPaper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.type === "dark" ? theme.palette.background.default : theme.palette.background.default
  },
  victoryPanelIcons: {
    color: theme.palette.type === "dark" ? theme.palette.text.secondary : "black"
  }
});

class CompanyCard extends Component {
  state = {
    injuredOpen: false,
    injured: undefined
  };

  handleInjuredClick = injured => {
    this.setState({ injuredOpen: true });
    this.setState({ injured: injured });
  };

  handleInjuredClose = () => {
    this.setState({ injuredOpen: false });
  };

  renderInjuredCard(company) {
    const injuredIndex = company.access_map[this.state.injured];
    const { userTroop, baseTroop } = createCardData(company.troops[injuredIndex], true, company.faction_access_name, this.props.armies);

    return <CompanyTroopCard forPreview injured={company.injured} userTroop={userTroop} baseTroop={baseTroop} />;
  }

  render() {
    const { company, classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={require("./../../assets/images/" + company.image_path)}
            title={company.company_access_name}
          />
        </CardActionArea>
        <CardContent className={classes.cardContent}>
          <Grid container direction="column" alignItems="stretch" spacing={8}>
            <Grid item>
              <Typography variant="h4" className={classes.companyTitle}>
                {company.company_name}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="space-evenly">
                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <Typography color="textSecondary" variant="button">
                        Company Rating
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">
                        <Avatar className={classes.statusAvatar}>{company.company_rating}</Avatar>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <Typography color="textSecondary" variant="button">
                        Effective Rating
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">
                        <Avatar className={classes.statusAvatar}>{company.effective_rating}</Avatar>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Paper className={classes.victoryPaper}>
                <Grid container direction="row" justify="space-evenly" spacing={8}>
                  <Grid item>
                    <Grid container direction="column" alignItems="center" spacing={8}>
                      <Grid item>
                        <VictoryIcon className={classes.victoryPanelIcons} />
                      </Grid>
                      <Grid item>
                        <Chip avatar={<Avatar className={classes.victoryAvatar}>V</Avatar>} label={company.victories} />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" alignItems="center" spacing={8}>
                      <Grid item>
                        <DrawIcon className={classes.victoryPanelIcons} />
                      </Grid>
                      <Grid item>
                        <Chip avatar={<Avatar className={classes.drawAvatar}>D</Avatar>} label={company.draws} />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" alignItems="center" spacing={8}>
                      <Grid item>
                        <DeathIcon className={classes.victoryPanelIcons} />
                      </Grid>
                      <Grid item>
                        <Chip avatar={<Avatar className={classes.lossAvatar}>L</Avatar>} label={company.losses} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Grid container direction="row">
                <Grid item>
                  <Chip
                    avatar={
                      <Avatar className={classes.goldAvatar}>
                        <GoldSackIcon />
                      </Avatar>
                    }
                    label={company.gold + " Gold"}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="button">Injured</Typography>
                </Grid>
                <Grid item>
                  {company.injured.map((injured, index) => (
                    <Chip
                      clickable={window.matchMedia(MIN_HEIGHT_600).matches}
                      onClick={() => this.handleInjuredClick(injured)}
                      key={index}
                      label={injured.replace(/_/g, " ")}
                      className={classes.chip}
                    />
                  ))}
                  {window.matchMedia(MIN_HEIGHT_600).matches && (
                    <Dialog open={this.state.injuredOpen} keepMounted onClose={this.handleInjuredClose}>
                      <DialogContent style={{ padding: 0, margin: "0 auto" }}>
                        {this.state.injured !== undefined && this.renderInjuredCard(company)}
                      </DialogContent>
                    </Dialog>
                  )}
                  {/* <MediaQuery query="(min-height: 600px)" /> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

CompanyCard.propTypes = {
  classes: PropTypes.object.isRequired,
  armies: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired
};

export default withStyles(styles)(CompanyCard);
