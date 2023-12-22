## 🚀 Estructura del Backend:

> <img width="200px" src="../readme-assets/backend.png">

<div style="height:50px"></div>

> <img width="200px" src="../readme-assets/controllers.png">

```
En la carpeta controllers guardo toda la lógica que se usa en las rutas:
✅ dashboardControllers: Las funciones que utilizo para manejar la información que renderizo en el home.
✅ motorbikeControllers: Las funciones que utilizo para manejar la busqueda de las motos dentro de la página de motos.
✅ priceControllers: Las funciones que utilizo para cambiar los precios.
✅ sessionControllers: Las funciones que utilizo para manejar el login del usuario y para que no se pierda el login.
```

<div style="height:50px"></div>

> <img width="200px" src="../readme-assets/routes.png">

```
En la carpeta de rutas guardo todas las rutas que renderizo. En cada una me importo su controller correspondiente (estos poseen el mismo nombre de las rutas):
✅ dashboardRoutes: Rutas que utilizo para el home.
✅ motorbikeRoutes: Rutas que utilizo para la busqueda y los relacionados a motos.
✅ priceRoutes: Rutas que utilizo para realizar los cambios de precios.
✅ userRuotes: Rutas que utilizo para manejar el login del proyecto.
```

<div style="height:50px"></div>

> <img width="200px" src="../readme-assets/utils-back.png">

```
En la carpeta utils me guardo el clientAxios solamente de momento.
```