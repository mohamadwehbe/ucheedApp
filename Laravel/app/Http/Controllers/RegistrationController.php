<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Registration;
use App\Models\Course;
use App\Models\Student;
use Illuminate\Support\Facades\DB;

class RegistrationController extends Controller
{
    public function index()
    {
        $registrations = DB::table('registrations')
            ->join('students', 'registrations.student_id', '=', 'students.id')
            ->join('courses', 'registrations.course_id', '=', 'courses.id')
            ->select('registrations.id','registrations.created_at','students.firstName','students.fatherName',
                     'students.lastName','courses.code','courses.name')
            ->get();
        return $registrations;
    }

    public function create(Request $req)
    {
        $student = Student::find($req->input('student'));
        $course = Course::find($req->input('course'));
        $registration = new Registration();
        $registration->course_id = $course->id;
        $registration->student_id = $student->id;
        $registration->save();
        return response()->json(['message' => 'created successfuly']);
    }

    public function show($id)
    {
        $registration = Registration::find($id);
        $course = Course::find($registration->course_id);
        $student = Student::find($registration->student_id);
        return response()->json([
            'course' => $course,
            'student' => $student,
            'registration' => $registration
        ]);
    }

    public function update(Request $req)
    {
        $registration = Registration::find($req->input('id'));
        $student = Student::find($req->input('student'));
        $course = Course::find($req->input('course'));
        $registration->course_id = $course->id;
        $registration->student_id = $student->id;
        $registration->save();
        return $registration;
    }

    public function destroy(Request $req)
    {
        $registration = Registration::find($req->input('id'));
        $registration->delete();
        return response()->json(['message' => 'deleted successfuly']);
    }
}
