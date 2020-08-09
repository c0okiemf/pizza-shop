<?php


namespace App\Repository;


use App\Repository\Dto\OrderData;
use App\Repository\Dto\OrderDataCollection;

interface OrderRepositoryInterface
{
    public function place(OrderData $orderData) : void;

    public function showPlacedByUser(int $userId) : OrderDataCollection;
}
