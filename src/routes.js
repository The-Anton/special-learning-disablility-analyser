import { Navigate, useRoutes, useNavigate } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import Report from "./pages/report/Report";
import TestOnboarding from "./pages/test/TestOnboarding.js";
import SpeechTest from "./components/test/Speaking/SpeechTest.js";
import NotFound from './pages/Page404';

import TestMaker from "./components/testmaker/TestMaker";
import Upload from "./utils/azurefileupload/App.js";

import TEST_SPEAKING from './data/TEST_SPEAKING';
import TEST_LISTENING from './data/TEST_LISTENING';
import TEST_ISHIHARA from './data/TEST_ISHIHARA';
import TEST_HANDWRITING from "./data/TEST_HANDWRITING";
import {TEST_DYSCALCULIA }from './data/TEST_DYSCALCULIA';
import TEST_UPLOADS from "./data/TEST_UPLOADS";

import Listening from './components/test/Listening/Listening';
import Colorblind from './components/test/Colorblind/Colorblind';
import Handwriting from './components/test/Handwriting/Handwriting';
import Speaking from './components/test/Speaking/speech-to-text';
import Dyscalculia from './components/test/Dyscalculia/Dyscalculia';
import UploadFiles from "./components/test/uploads/Uploadfiles";

// import Profile from "./pages/profile/Profile";
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import GetReport from "./pages/GetReport";

// ----------------------------------------------------------------------

export default function Router(props) {

  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout open={true} />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: "app", element: <DashboardApp /> },
        // {
        //   path: "user/:id",
        //   element: <Profile /> ,
        // },
        { path: "test/new", element: <TestOnboarding />},
        { path: "test/speech", element: <TestMaker details={TEST_SPEAKING.details} questions={TEST_SPEAKING.questions} testComponent={SpeechTest}/>   },
        { path: "test/color-blindness", element: <TestMaker details={TEST_ISHIHARA.details} questions={TEST_ISHIHARA.questions} testComponent={Colorblind}/> },
        { path: "test/writing", element: <TestMaker details={TEST_HANDWRITING.details} questions={TEST_HANDWRITING.questions} testComponent={Handwriting}/> },
        { path: "test/listening", element: <TestMaker details={TEST_LISTENING.details} questions={TEST_LISTENING.questions.easy} testComponent={Listening}/> },
        { path: "test/dyscalculia", element: <TestMaker details={TEST_DYSCALCULIA.details} questions={TEST_DYSCALCULIA.questions} testComponent={Dyscalculia}/> },
        { path: "test/uploads", element: <TestMaker details={TEST_UPLOADS.details} questions={TEST_UPLOADS.questions} testComponent={UploadFiles}/> },
        { path: "upload", element: <Upload />  },
        { path: "report", element: <Report />  },
        { path: "fetch-report", element: <GetReport />  },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/test/new"/> },
      ],
    },
  ]);
}
