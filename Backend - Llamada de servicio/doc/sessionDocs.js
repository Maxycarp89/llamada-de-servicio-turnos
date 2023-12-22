/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login
 *     description: Login del usuario para que el mismo ingrese a la aplicación.
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          UserName:
 *                              type: string
 *                              example: "mizamorano"
 *                          Password:
 *                              type: string
 *                              example: "2021"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      date:
 *                          type: string
 *                          example: Fri, 30 Jun 2023 13:30:21 GMT
 *                      server:
 *                          type: string
 *                          example: Apache/2.4.48 (Unix)
 *                      content-type:
 *                          type: string
 *                          example: application/json;odata=minimalmetadata;charset=utf-8
 *                      vary:
 *                          type: string
 *                          example: Accept-Encoding
 *                      set-cookie:
 *                          type: array
 *                          items:
 *                              type: string
 *                              example: ["B1SESSION=4344c552-174a-11ee-8000-00505697fdf9;HttpOnly;;Secure;SameSite=None", "ROUTEID=.node3; path=/;Secure;SameSite=None"]
 *                      connection:
 *                          type: string
 *                          example: close
 *                      transfer-encoding:
 *                          type: string
 *                          example: chunked
 *       300:
 *         description: FALLO
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      error:
 *                          type: string
 *                          example: Fallo al iniciar sesión
 *       401:
 *         description: NO AUTORIZADO
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      error:
 *                          type: string
 *                          example: Iniciar sesión y guardar el toquen para obtener respuesta
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Información del usuario
 *     description: Obtener la información del usuario por nombre del usuario.
 *     parameters:
 *          - name: user
 *            in: query
 *            description: Usuario del que se desee obtener información
 *            required: true
 *            schema:
 *              type: string
 *              example: mizamorano
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: NO AUTORIZADO
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      error:
 *                          type: string
 *                          example: Iniciar sesión y guardar el toquen para obtener respuesta
 */
