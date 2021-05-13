# Readme

#### Description

Aplicación de gestión de clientes y trabajadores para un negocio de servicios. 

--------------------------------------

#### Backlog

- Implement cloudinary to upload avatar for clients.
- Add promotions.

------------------------------------------------------------------



#### User stories

- 404: shows a page that doesn't exist.

- Login: user can login to the app.

- Logout: user can logout of the app.

- Add a client: admin. can add a new client.

- Edit a client: user can edit it's own profile information.

- Add a worker: admin. can add a new worker.

- Edit a worker: worker can edit it's own profile information.

- Create a service: admin. can create a service.

- Edit service: admin. can edit a service.

- Delete: admin. can delete service, worker or client.

- View client list: admin. can see a list of all Clients.

- View worker list: admin. can see a list of all Workers.

- View service list: user can see a list of all Services.

- Search client: filters clients by name or surname.

- Search worker: filters workers by name or surname.

- Search service: filter services by name.

- Search reservation: filter reservation by a range of date.

- View client details: admin. can see the details of a client (antiguity and birthdate).

- Send promotions: admin. can send promotions to clients.

  

-------------------------------------------------------



### Frontend

#### React Router Routes (React APP)

| Path                | Component       | Permissions                     | Behavior                                                     |
| ------------------- | --------------- | ------------------------------- | ------------------------------------------------------------ |
| /login              | LoginPage       | anon only  <AnonRoute>          | Login form, link to signup, navigate to homepage after login |
| /services           | HomePage        | user only  <PrivateRoute>       | Home page with all the services.                             |
| /services/:id       | ServiceDetail   | user only  <PrivateRoute>       | Views details of a service.                                  |
| /services/:id       | ServiceDetail   | admin only <PrivateRoute>       | Edit a service.                                              |
| /profile/:id        | Profile         | user only <PrivateRoute>        | View profile list.                                           |
| /profile/:id        | Profile         | user only <PrivateRoute>        | Edit a user profile.                                         |
| /createClient       | CreateClient    | admin only <PrivateRoute>       | Create a client.                                             |
| /createWorker       | CreateWorker    | admin only <PrivateRoute>       | Create a worker.                                             |
| /createService      | CreateService   | admin only <PrivateRoute>       | Create a service.                                            |
| /viewClients        | ClientList      | admin only <PrivateRoute>       | View of all clients.                                         |
| /viewWorkers        | WorkerList      | admin only <PrivateRoute>       | View of all workers.                                         |
| /viewReservations   | ReservationList | worker and admin<PrivateRoute>  | View of all reservations to do.                              |
| /handleReservations | Reservations    | worker and admin <PrivateRoute> | View reservations                                            |
| /viewServices       | ServiceList     | user only <PrivateRoute>        | View of all services.                                        |
| /contact            | Contact         | user only <PrivateRoute>        | View contact details.                                        |



#### Components

- LoginPage.
- HomePage.
- ServiceDetail.
- Profile.
- CreateClient.
- CreateWorker.
- CreateService.
- ClientList.
- WorkerList.
- ServiceList.
- Navbar.
- Contact



#### Services

- Auth Service

  - auth.login(user).
  - auth.create(user).
  - auth.logout().
  - isLoggedIn().

- Service service

  - service.list().
  - service.detail(id).
  - service.create(id).
  - service.delete(id).

- Client service

  - client.list().
  - client.detail().
  - client.create(id).
  - client.delete(id).
  - client.reserveService(id).

- Worker service

  - worker.list().

  - worker.detail().

  - worker.create.(id)

  - worker.delete(id).

  - worker.todo(id).

  - worker.done(id).

    

-----------------------------------------------------------------



### Backend

#### Service Model

```javascript
{
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: Nameequired: true},
    price: {type: Number, required: true},
    reserves: [{type: ObjectId}]
    
}
```

#### Reserve model 

```javascript
{
	client_id: {type: String, required: true},
    worker_id: {type: String, required: true},
    reservation_date:
	status: {type: String, enum ["done", "todo"]
}
```



#### Worker Model

```javascript
{
    worker_number: { type: Number, required: true},
 	name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone_number: {type: Number, required: true },
    role: { type: String, enum ["Admin", "Worker"]},
    todo_services: [],
    done_services: []
}
```



#### Client Model

```javascript
{
    client_number: { type: Number, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    client_antiquity: {type: Date, default: Date},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    birthdate: {type: Number, required: true},
    phone_number: {type: Number, required: true },
    service_reserve: [],
    promotions: [],
    (avatar: {type: String, required: true})
}
```



-----------------------------------------------



#### API Endpoints (backend routes)

| Method | URL                        | Request Body                                                 | Success Status | Error Status | Description                                                  |
| ------ | -------------------------- | ------------------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------ |
| GET    | /auth/login                | {email, password}                                            | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session. |
| POST   | /auth/logout               |                                                              | 204            | 400          | Logs out the user.                                           |
| POST   | /auth/create-client        | {name, client_antiguity, email, password, age, phone_number, birth_date, service_reserve, promotions} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session. |
| POST   | /auth/create-worker        | {name, email, phone_number, password}                        | 201            | 404          | Checks if fields not empty (422) and worker not exists (409), then create user with encrypted password, and store user in session. |
| POST   | /api/create-service        | {name, image, description, price, workers}                   | 201            | 404          | Checks if fields not empty (422) and service not exists (409), then create user with encrypted password, and store user in session. |
| POST   | /api/services/add-service  | {name, image, description, price, worker}                    | 201            | 404          | Adds a service to client reservation list.                   |
| POST   | /api/services/done-service | {name, image, description, price, worker}                    | 201            | 404          | Adds a service to worker done list.                          |
| POST   | /api/services/todo-service | {name, image, description, price, worker}                    | 201            | 404          | Adds a service to worker todo list.                          |
| GET    | /auth/profile              | Saved session                                                | 200            | 404          | Check if user is logged in and return profile page.          |
| PUT    | /auth/profile/:id          | {email, password, phone_number}                              | 200            | 400          | Edit user info.                                              |
| GET    | /api/services              |                                                              |                | 400          | Show all services.                                           |
| GET    | /api/services/:id          | {id}                                                         |                | 400          | Show details of service                                      |
| PUT    | /api/services/:id          | {name, image, description, price, worker}                    | 200            | 400          | Edit a service.                                              |
| GET    | /api/clients               |                                                              |                | 400          | Show all clients.                                            |
| GET    | /api/workers               |                                                              |                | 400          | Show all workers.                                            |
|        |                            |                                                              |                |              |                                                              |
|        |                            |                                                              |                |              |                                                              |
|        |                            |                                                              |                |              |                                                              |
|        |                            |                                                              |                |              |                                                              |