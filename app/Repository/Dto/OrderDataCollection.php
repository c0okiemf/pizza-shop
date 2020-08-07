<?php


namespace App\Repository\Dto;


use Closure;

class OrderDataCollection
{
    private array $orderDataObjects;

    public function add(OrderData $orderData) : void
    {
        $this->orderDataObjects[] = $orderData;
    }

    public function toArray(): array
    {
        return (isset($this->orderDataObjects))
            ? array_map(function (OrderData $orderData) {
                return [
                    "address_id" => $orderData->getAddressId(),
                    "pizzas_ids" => $orderData->getPizzasIds()
                ];
            }, $this->orderDataObjects)
            : [];
    }

    public function each(Closure $callback) : void
    {
        foreach ($this->orderDataObjects as $i => $orderData) {
            $callback($orderData, $i);
        }
    }
}
