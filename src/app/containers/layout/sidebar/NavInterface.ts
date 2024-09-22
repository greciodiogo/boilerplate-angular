export interface NavInterface {
  title: string;
  path: string;
  icon?: string;
  iconRight?: string;
  routerLinkActive?: string;
  permissionActiveRouterLink?: string;
  children?: NavInterface[];
}


