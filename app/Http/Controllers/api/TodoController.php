<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\ApiResponseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\TodoRequest;
use App\Http\Resources\TodoResource;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoController extends ApiResponseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Todo::where('user_id',auth()->user()->id)->get();
        
        //check condition for no data and return a msge 
        count($data) == 0 ? $msg = "No data available" : $msg = "Data found";

        return $this->sendResponse(TodoResource::collection($data), $msg);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TodoRequest $request)
    {
        try {
            $todo = new Todo();

            $todo->user_id = auth()->user()->id;
            $todo->title = $request->title;
            $todo->description = $request->description;
            
            $todo->save(); 

            return $this->sendResponse(new TodoResource($todo),'Todo created successfully');

        } catch (\Throwable $th) {
            return $this->sendError('Todo creating failed', $th, 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $todo = Todo::findOrFail($id);

            if($todo->user_id != auth()->user()->id) {
                return $this->sendError('Unauthorized request', [], 401);
            }

            return $this->sendResponse(new TodoResource($todo),'Todo found successfully');

        } catch (\Throwable $th) {
            return $this->sendError('Couldn\'t find todo', $th, 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(TodoRequest $request, $id)
    {
        try {
            $todo = Todo::findOrFail($id);

            $todo->title = $request->title;
            $todo->description = $request->description;
            $todo->status = $request->status;

            $todo->save();

            return $this->sendResponse(new TodoResource($todo),'Todo updated successfully');

        } catch (\Throwable $th) {
            return $this->sendError('Todo updating failed', $th, 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $todo = Todo::findOrFail($id);

            if($todo->user_id != auth()->user()->id) {
                return $this->sendError('Unauthorized request', [], 401);
            }

            $todo->delete();

            return $this->sendResponse(new TodoResource($todo),'Todo deleted successfully');

        } catch (\Throwable $th) {
            return $this->sendError('Todo deleting failed', $th, 500);
        }
    }
}
