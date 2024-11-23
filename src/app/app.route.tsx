import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "../interface/layout/layout";
import Onboarding from "../interface/onboarding/onboarding.page";
import UploadImage from "../components/upload-image/upload-image.component";
import { Stack } from "@mui/system";
import ShoppingList from "../interface/shopping-list/shopping-list.page";
import MealsPage from "../interface/dashboard/meals.page";

export const AppRoute: React.FC = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Onboarding />,
        },
        {
          path: "onboarding",
          element: <Onboarding />,
        },
        {
          path: "shopping-list/:id",
          element: <ShoppingList />,
        },
        {
          path: "dashboard/:id",
          element: <MealsPage/>, 
        },
        {
          path: "dashboard/:id/:day",
          element: <MealsPage/>,
        },
        {
          path: "upload",
          element: (
            <Stack width={350}>
              <UploadImage userId="1" dayOfTheWeek="monday"/>
            </Stack>
          ),
        },
      ],
    },
  ]);

  return <Suspense fallback={null}>{routes}</Suspense>;
};
