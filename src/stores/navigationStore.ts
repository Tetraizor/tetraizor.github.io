import { defineStore } from "pinia";
import NavigationPage, { getPageByName, pages } from "@/types/NavigationPage";

let switchPage: (page: NavigationPage) => void;

export function switchPageInit(toCall: (page: NavigationPage) => void): void {
  switchPage = toCall;
}

export const useNavigationStore = defineStore("navigation", {
  state: () => ({
    page: getPageByName("about") as NavigationPage,
    canTransitionStack: 0 as number,
  }),
  actions: {
    changePage(page: NavigationPage) {
      if (page.redirect !== undefined && page.redirect !== "") {
        this.changePage(getPageByName(page.redirect));
        return;
      }

      this.page = page;
      switchPage(page);
    },
    changePageByName(name: string) {
      this.changePage(getPageByName(name));
    },
    increaseTransitionStack() {
      this.canTransitionStack++;
    },
    decreaseTransitionStack() {
      this.canTransitionStack--;
    },
  },
  getters: {
    canTransition(): boolean {
      return this.canTransitionStack === 0;
    },
    currentPage(): NavigationPage {
      return this.page;
    },
    currentPageName(): string {
      return this.page?.name;
    },
  },
});
