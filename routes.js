import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import { DataUsage, WorkSharp } from "@material-ui/icons";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    layout: "/admin",
  },
  {
    path: "/table-list",
    name: "Documentos",
    icon: LibraryBooks,
    layout: "/admin",
  },
  {
    path: "/table-list",
    name: "Contatos",
    icon: BubbleChart,
    layout: "/admin",
  },
  {
    path: "/table-list",
    name: "Prospecção",
    icon: DataUsage,
    layout: "/admin",
  },
  {
    path: "/table-list",
    name: "Workflow",
    icon: WorkSharp,
    layout: "/admin",
  },
];

export default dashboardRoutes;
