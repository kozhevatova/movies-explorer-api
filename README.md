# movies-explorer-api

#### Api дипломного проекта.

Публичный IP: 178.154.210.79

[Ссылка на api, размещенный в Яндекс.Облаке](https://api.annakin.diploma.students.nomoredomains.monster)

##### Роуты
- POST /signup - создаёт пользователя с переданными в теле email, password и name
- POST /signin - проверяет переданные в теле почту и пароль и возвращает JWT
- GET /users/me - возвращает информацию о пользователе (email и имя)
- PATCH /users/me - обновляет информацию о пользователе (email и имя)
- GET /movies - возвращает все сохранённые пользователем фильмы
- POST /movies - создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail 
- DELETE /movies/movieId - удаляет сохранённый фильм по _id
