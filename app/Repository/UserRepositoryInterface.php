<?php


namespace App\Repository;


use App\Repository\Dto\UserData;

interface UserRepositoryInterface
{
    public function create(UserData $userData) : UserData;

    public function show(int $id) : UserData;
}
