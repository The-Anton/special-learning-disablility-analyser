import React from "react";
// material
import {
  Container,
} from "@mui/material";
// components
import Page from "../components/Page";
import "react-notifications/lib/notifications.css";
import swal from 'sweetalert';
//   AppTasks,
//   TopSellers,
//   TopSellerOfTheWeek,
//   TopSellerOfTheDay,
//   AppNewsUpdate,
//   TotalUsers,
//   AppOrderTimeline,
//   AppCurrentVisits,
//   AppWebsiteVisits,
//   AppTrafficBySite,
//   AppCurrentSubject,
//   AppConversionRates
// } from '../components/_dashboard/app';


// ----------------------------------------------------------------------
//User file content
// import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// material
import {
  Card,
  Table,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
// import Label from '../components/Label';
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
//
import { useNavigate } from "react-router";

export default function DashboardApp() {

  const navigate = useNavigate();


  return (
    <Page title="Dashboard | MithranBuddy">
      <Container maxWidth="xl" style={{marginTop:"72px !important"}}>

      </Container>
    </Page>
  );
}
