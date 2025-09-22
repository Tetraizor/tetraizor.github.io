import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

import { switchPageInit } from "./stores/navigationStore";

// Main Views
import MainView from "./views/MainView.vue";
import ConstructionView from "./views/ConstructionView.vue";

// "MainView" Children
import MeView from "./views/Main/MeView.vue";
import BlogView from "./views/Main/BlogView.vue";
import ProjectsView from "./views/Main/ProjectsView.vue";
import GamesView from "./views/Main/GamesView.vue";

// "MeView" Children
import NavigationPage from "./models/NavigationPage";
import PastView from "./views/Main/Me/PastView.vue";
import PresentView from "./views/Main/Me/PresentView.vue";
import FutureView from "./views/Main/Me/FutureView.vue";

// "BlogView" Children
import PostView from "./views/Main/Blog/PostView.vue";
import DefaultPostView from "./views/Main/Blog/DefaultPostView.vue";

// "GameView" Children
import GamesDbView from "./views/Main/Games/GamesDbView.vue";

// Default routes to be used when the page is suitable for public viewing.
const defaultRoutes = [
  {
    path: "/",
    component: MainView,
    children: [
      {
        path: "",
        name: "me",
        component: MeView,
        children: [
          {
            path: "/past",
            name: "past",
            component: PastView,
          },
          {
            path: "/",
            name: "present",
            component: PresentView,
          },
          {
            path: "/future",
            name: "future",
            component: FutureView,
          },
        ],
      },
      {
        path: "/blog",
        name: "blog",
        component: BlogView,
        children: [
          {
            path: "",
            name: "defaultPostView",
            component: DefaultPostView,
          },
          {
            path: ":slug",
            name: "post",
            component: PostView,
            props: true,
          },
        ],
      },
      {
        path: "/games",
        component: GamesView,
        children: [
          {
            path: "db",
            name: "db",
            component: GamesDbView,
            props: true,
          },
        ],
      },
      {
        path: "/projects",
        component: ProjectsView,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    redirect: "/",
  },
];

// Is used when the page is under construction.
const constructionRoutes = [
  {
    path: "/",
    name: "construction",
    component: ConstructionView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "constructionRedirect",
    redirect: "/",
  },
];

const router = createRouter({
  history:
    import.meta.env.PUBLIC_ENABLE_HASH_ROUTING == "true"
      ? createWebHashHistory()
      : createWebHistory(),
  routes:
    import.meta.env.PUBLIC_IS_UNDER_CONSTRUCTION == "true"
      ? constructionRoutes
      : defaultRoutes,
});

export function switchPage(page: NavigationPage): void {
  let currentPage: NavigationPage | null = page;
  let link = currentPage.route || "";

  while (currentPage !== null) {
    const parent = currentPage.getParent();

    if (parent !== undefined && parent !== null) {
      const parentRoute = parent.route;
      link = parentRoute + link;
    }

    currentPage = parent;
  }

  router.push({
    path: link,
  });
}

export default router;

switchPageInit(switchPage);
