<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    public function index()
    {
        $students = DB::table('students')
            ->select('students.id','students.code','students.firstName',
                     'students.fatherName', 'students.lastName','students.phone',
                     'students.email','students.dateOfBirth','students.created_at')
            ->get();
        return $students;
    }

    public function create(Request $req)
    {
        $student=new Student();
        $student->code=$req->input('code');
        $student->firstName=$req->input('firstName');
        $student->fatherName=$req->input('fatherName');
        $student->lastName=$req->input('lastName');
        $student->phone=$req->input('phone');
        $student->email=$req->input('email');
        $student->password=Crypt::encryptString($req->input('password'));
        $student->dateOfBirth=$req->input('dateOfBirth');
        $student->save();
        return response()->json(['message' => 'created successfuly']);
    }

    public function show($id)
    {
        $student = Student::find($id);
        $student->password = Crypt::decryptString($student->password);
        return $student;
    }

    public function update(Request $req)
    {
        $student = Student::find($req->input('id'));
        $student->code = $req->input('code');
        $student->firstName = $req->input('firstName');
        $student->fatherName = $req->input('fatherName');
        $student->lastName = $req->input('lastName');
        $student->phone = $req->input('phone');
        $student->email = $req->input('email');
        $student->password = $req->input('password');
        $student->dateOfBirth = $req->input('dateOfBirth');
        $student->save();
        return $student;
    }

    public function destroy(Request $req)
    {
        $student = Student::find($req->input('id'));
        $student->delete();
        return response()->json(['message' => 'deleted successfuly']);
    }
}
