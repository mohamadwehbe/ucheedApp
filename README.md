# ucheedApp

This App is composed of two directories : Laravel and ReactApp

# The steps to lunch the app:

1. Go to the Laravel directory : cd Laravel
2. edit the .env file : setup your own database
3. from the terminal install everything for laravel: composer install
4. migrate your database using : php artisan migrate --seed
5. generate a key : php artisan key:generate (in case the .env file doesn't have an APP_KEY=)
6. start the backend server : php artisan serve
7. open new terminal and make sure you are in the ucheedApp directory not Laravel
8. from The ucheedApp directory go the ReactApp directory : cd ReactApp
9. from the terminal install everything for react : npm install
10. start the server : npm start

# Notice

1. you need to follow the steps : step by step
2. the application starts from the frontend(react)
3. it starts by the registration page
4. if yo need to add edit or delete a student go to the student page
5. if yo need to add edit or delete a course go to the course page
6. if yo need to add edit or delete a registration go to the registration page
7. after making sure that you have stdents and courses yo can register from the registration page
