<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\RegistrationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('students', [StudentController::class,'index']);
Route::get('students/show/{id}', [StudentController::class,'show']);
Route::post('students/add', [StudentController::class,'create']);
Route::post('students/delete', [StudentController::class,'destroy']);
Route::post('students/update', [StudentController::class,'update']);

Route::get('courses', [CourseController::class,'index']);
Route::get('courses/show/{id}', [CourseController::class,'show']);
Route::post('courses/add', [CourseController::class,'create']);
Route::post('courses/delete', [CourseController::class,'destroy']);
Route::post('courses/update', [CourseController::class,'update']);

Route::get('registrations', [RegistrationController::class,'index']);
Route::get('registrations/show/{id}', [RegistrationController::class,'show']);
Route::post('registrations/add', [RegistrationController::class,'create']);
Route::post('registrations/delete', [RegistrationController::class,'destroy']);
Route::post('registrations/update', [RegistrationController::class,'update']);