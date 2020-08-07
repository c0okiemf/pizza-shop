<?php


namespace App\Repository;


use App\Repository\Dto\OrderData;
use App\Repository\Dto\OrderDataCollection;

class EloquentOrderRepository implements OrderRepositoryInterface
{

    public function place(OrderData $orderData): void
    {

    }

    public function showPlacedByUser(OrderData $orderData): OrderDataCollection
    {
        // TODO: Implement showPlacedByUser() method.
    }
}
