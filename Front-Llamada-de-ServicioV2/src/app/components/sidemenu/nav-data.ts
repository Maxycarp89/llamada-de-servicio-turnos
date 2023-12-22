export const navBarData = [
    {
        routelink: 'guide',
        icon: 'fa-solid fa-book',
        label: "Guía básica",
        show: 'Guia'
    },
    {
        routelink: 'dashboard',
        icon: 'fas fa-chart-pie',
        label: 'Metricas',
        show: "Dashboard",
        subsections: [
            {
                routelink: 'dashboard-motos',
                icon: 'fas fa-check-circle',
                label: 'Motos',
                show: 'Motos'
            },
            {
                routelink: 'dashboard-moto-interno',
                icon: 'fas fa-tools',
                label: 'Interno',
                show: 'Motos',
            },
            {
                routelink: 'dashboard-bike',
                icon: 'fa-solid fa-bicycle',
                label: 'Bikes',
                show: 'Bikes'
            },
            {
                routelink: 'dashboard-garantia',
                icon: 'fas fa-certificate',
                label: 'Garantía',
                show: 'Motos', // 6
            }
        ]
    },
    {
        routelink: '#',
        icon: 'fas fa-motorcycle',
        label: 'Motos',
        show: 'Motos',
        subsections: [
            {
                routelink: 'motos',
                icon: 'fas fa-check-circle',
                label: 'Motos',
                show: "Motos"
            },
            {
                routelink: 'motos-interno',
                icon: 'fas fa-tools',
                label: 'Interno',
                show: "Motos"
            },
            {
                routelink: 'garantia-motos',
                icon: "fas fa-certificate",
                label: "Garantía",
                show: "Motos"
            }
        ]
    },
    {
        routelink: 'hogar',
        icon: 'fas fa-home',
        label: 'Hogar',
        show: 'Hogar'
    },
    {
        routelink: 'bikes',
        icon: 'fa-solid fa-bicycle',
        label: 'Bikes',
        show: "Bikes"
    },
    {
        routelink: 'turnos',
        icon: 'fa-solid fa-calendar-check',
        label: 'turnos'
    },
];