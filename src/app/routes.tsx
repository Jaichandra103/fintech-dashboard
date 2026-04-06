import { createBrowserRouter } from "react-router";
import { Layout } from "./Layout";
import { DashboardHome } from "./pages/DashboardHome";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { HelpPage } from "./pages/HelpPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: DashboardHome },
      { path: "analytics", Component: AnalyticsPage },
      { path: "transactions", Component: TransactionsPage },
      { path: "reports", Component: ReportsPage },
      { path: "settings", Component: SettingsPage },
      { path: "help", Component: HelpPage },
    ],
  },
]);