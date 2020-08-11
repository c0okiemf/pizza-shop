<?php


namespace App\Repository\Dto;


use Closure;

class OrderDataCollection
{
    private int $userId;

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
                    "address" => $orderData->getAddress()->toArray(),
                    "cart" => $orderData->getCartData()->toArray(),
                    "created_at" => $orderData->getCreatedAt()
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

    /**
     * @return int
     */
    public function getUserId(): int
    {
        return $this->userId;
    }

    /**
     * @param int $userId
     * @return OrderDataCollection
     */
    public function setUserId(int $userId): OrderDataCollection
    {
        $this->userId = $userId;
        return $this;
    }
}
