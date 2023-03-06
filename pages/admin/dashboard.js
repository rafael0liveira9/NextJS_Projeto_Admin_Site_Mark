import React from "react";

import ChartistGraph from "react-chartist";

import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import { Brush, GroupSharp, Link, Notes, RssFeed } from "@material-ui/icons";

import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";

import Admin from "layouts/Admin.js";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import SEO from "../../components/Seo/SEO";

function Dashboard() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <SEO title={"Dashboard"}></SEO>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="dark" stats icon>
              <CardIcon color="primary">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Site - Site One Page</p>
              <h3 className={classes.cardTitle}>20% Concluído</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Ultima Atualização a 10 horas...
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="dark" stats icon>
              <CardIcon color="primary">
                <Brush></Brush>
              </CardIcon>
              <p className={classes.cardCategory}>Logo - Logo Customizada</p>
              <h3 className={classes.cardTitle}>Em Preparação</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Ultima Atualização a 2 horas...
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <RssFeed></RssFeed>
              </CardIcon>
              <p className={classes.cardCategory}>Blog</p>
              <h3 className={classes.cardTitle}>Não Contratado</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Link />
                Clique aqui e aproveite o plano!
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Notes></Notes>
              </CardIcon>
              <p className={classes.cardCategory}>Conteúdo Redacional</p>
              <h3 className={classes.cardTitle}>Não Contratado</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Link />
                Clique aqui e aproveite o plano!
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <GroupSharp></GroupSharp>
              </CardIcon>
              <p className={classes.cardCategory}>Mídias Sociais</p>
              <h3 className={classes.cardTitle}>Não Contratado</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Link />
                Clique aqui e aproveite o plano!
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

Dashboard.layout = Admin;

export default Dashboard;
