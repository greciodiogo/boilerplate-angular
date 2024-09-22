export interface Style {
  background: string;
  color: string;
  hover_background?: string;
  hover_color?: string;
}

export interface Nav {
  background: string;
  color: string;
  navItem: Style;
  navLink: Style;
  navLinkActive?: Style;
  icon?: Style;
}
export interface Theme {
  header: Style;
  footer: Style;
  sidebar: Style;
  nav: Nav;
}


export const loadtheme = (name): string => {
  const apps = [
    {
      name: 'MOVICEL',
      style: 'theme/movicel.component.css',
    },
    {
      name: 'AT',
      style: 'theme/at.component.css',
    },
  ];
  return apps.find((app) => app.name === name).style;
};
