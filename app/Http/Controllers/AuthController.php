<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Model\User;
use App\Repository\Dto\UserData;
use App\Repository\EloquentUserRepository;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(RegisterRequest $request, EloquentUserRepository $userRepository, UserData $userData)
    {
        $createdUserData = $userRepository->create(
            $userData
            ->setName($request->name)
            ->setEmail($request->email)
            ->setPassword($request->password)
        );

        $credentials = $this->makeCredentials($createdUserData);
        if (!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized Access, please confirm credentials or verify your email'
            ], 401);

        $tokenResult = $this->authorizeUser($request);

        return response()->json([
            "success" => true,
            "id" => $createdUserData->getId(),
            "name" => $createdUserData->getName(),
            "email" => $createdUserData->getEmail(),
            "access_token" => $tokenResult->accessToken,
            "token_type" => 'Bearer',
            "expires_at" => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateString()
        ], 201);
    }

    public function login(LoginRequest $request, EloquentUserRepository $userRepository, UserData $userData)
    {
        $credentials = $this->makeCredentials(
            $userData
            ->setEmail($request->email)
            ->setPassword($request->password)
        );

        if (!Auth::attempt($credentials))
            return response()->json([
                "message" => "Unauthorized Access, please confirm credentials or verify your email"
            ], 401);

        $user = $request->user();
        $tokenResult = $this->authorizeUser($request);

        return response()->json([
            "success" => true,
            "id" => $user->id,
            "name" => $user->name,
            "email" => $user->email,
            "access_token" => $tokenResult->accessToken,
            "token_type" => 'Bearer',
            "expires_at" => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    protected function makeCredentials(UserData $userDto)
    {
        return [
            "email" => $userDto->getEmail(),
            "password" => $userDto->getPassword()
        ];
    }

    protected function authorizeUser(Request $request)
    {
        $user = $request->user();
        $tokenResult = $user->createToken("Access Token");
        $token = $tokenResult->token;
        if ($request->remember_me) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }
        $token->save();
        return $tokenResult;
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
}
