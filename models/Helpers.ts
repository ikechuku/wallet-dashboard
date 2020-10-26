export interface DashBoardState {
  selected: string;
  transactions: any;
  message: string;
  isLoading: boolean;
  errors: any;
  isDrawerOpen: boolean;
}

export interface RouteGuards {
  Component: any;
  pageProps?: any;
}
