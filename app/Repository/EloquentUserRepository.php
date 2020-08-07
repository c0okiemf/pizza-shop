<?php


namespace App\Repository;


use App\Model\User;
use App\Repository\Dto\UserData;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class EloquentUserRepository implements UserRepositoryInterface
{
    public function create(UserData $userData) : UserData
    {
        $user = new User();
        $user->name = $userData->getName();
        $user->email = $userData->getEmail();
        $user->password = Hash::make($userData->getPassword());
        $user->save();
        $userData->setId($user->id);
        return $userData;
    }

    public function show(int $id) : UserData
    {
        $user = User::find($id);
        return (new UserData())
            ->setId($user->id)
            ->setName($user->name)
            ->setEmail($user->email);
    }
}
