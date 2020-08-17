export const adminRoutes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>Sidebar</div>,
    main: () => <h2>Dashboard</h2>,
  },
  {
    path: "/dish",
    sidebar: () => <div>Sidebar</div>,
    main: () => <h2>Dish contol panel</h2>,
  },
  {
    path: "/order",
    sidebar: () => <div>Sidebar</div>,
    main: () => <h2>Order contol panel</h2>,
  },
];
