<?php


namespace App\Repository;


use App\Repository\Dto\AddressData;
use App\Repository\Dto\AddressDataCollection;

interface AddressRepositoryInterface
{
    public function add(AddressData $addressData) : AddressData;

    public function showByUser(int $userId) : AddressDataCollection;
}
