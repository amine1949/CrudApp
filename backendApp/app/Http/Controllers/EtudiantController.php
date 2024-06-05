<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;

class EtudiantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $etudiant = Etudiant::all();
        return $etudiant;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required',
            'age' => 'required',
            'email' => 'required'
        ]);

        $etudiant = Etudiant::create($request->all());
        return response()->json([
            'status' => 'success',
            'data' => $etudiant,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Etudiant::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Etudiant $etudiant)
    {


    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Etudiant $etudiant, $id)
    {
        $etudiant = Etudiant::find($id);

        $request->validate([
            'full_name' => 'required',
            'age' => 'required',
            'email' => 'required'
        ]);

        $etudiant->update($request->all());
        return response()->json([
            'status' => 'success',
            'data' => $etudiant,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Etudiant $etudiant, $id)
    {
        $etudiant = Etudiant::find($id)->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Etudiant deleted successfully',
        ]);
    }

    public function restore(Etudiant $etudiant, $id)
    {
        $etudiant = Etudiant::onlyTrashed()->find($id);


        return response()->json([
            'status' => 'success',
            'message' => 'Post restored successfully',
            'data' => $etudiant,
        ]);
    }
}
