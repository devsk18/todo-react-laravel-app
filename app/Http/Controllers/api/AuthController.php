<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\ApiResponseController;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends ApiResponseController
{

    public function register(RegisterUserRequest $request) {

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            $data = [
                'user' => $user,
                'token' => $user->createToken('API TOKEN')->plainTextToken
            ];

            return $this->sendResponse($data, 'User registered successfully', 201);

        } catch (\Throwable $th) {

            return $this->sendError('User cannot be registered', $th, 500);
        }


    }


    public function login(LoginUserRequest $request) {

        try {
            if(!Auth::attempt($request->only(['email','password']))){
                return $this->sendError('Invalid Credentials', 401);
            }

            $user = User::where('email',$request->email)->first();

            $data = [
                'user' => $user,
                'token' => $user->createToken('API TOKEN')->plainTextToken
            ];

            return $this->sendResponse($data, 'User logged in successfully');

        } catch (\Throwable $th) {

            return $this->sendError('User cannot be logged in', $th, 500);
        }

    }

}
