<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Course;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    public function index()
    {
        $courses = DB::table('courses')
            ->select('courses.id','courses.code','courses.name')
            ->get();
        return $courses;
    }

    public function create(Request $req)
    {
        $course=new Course();
        $course->code=$req->input('code');
        $course->name=$req->input('name');
        $course->save();
        return response()->json(['message' => 'created successfuly']);
    }

    public function show($id)
    {
        $course = Course::find($id);
        return $course;
    }

    public function update(Request $req)
    {
        $course = Course::find($req->input('id'));
        $course->code = $req->input('code');
        $course->name = $req->input('name');
        $course->save();
        return $course;
    }

    public function destroy(Request $req)
    {
        $course = Course::find($req->input('id'));
        $course->delete();
        return response()->json(['message' => 'deleted successfuly']);
    }
}
