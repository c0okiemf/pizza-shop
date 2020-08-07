<?php


namespace App\Repository\Dto;


class OrderData
{
    private AddressData $address;
    private int $userId;

    /**
     * @var PizzaDataCollection
     */
    private PizzaDataCollection $pizzas;

    /**
     * @return AddressData
     */
    public function getAddress(): AddressData
    {
        return $this->address;
    }

    /**
     * @param AddressData $address
     * @return OrderData
     */
    public function setAddress(AddressData $address): OrderData
    {
        $this->address = $address;
        return $this;
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
     * @return OrderData
     */
    public function setUserId(int $userId): OrderData
    {
        $this->userId = $userId;
        return $this;
    }

    /**
     * @return PizzaDataCollection
     */
    public function getPizzas(): PizzaDataCollection
    {
        return $this->pizzas;
    }

    /**
     * @param PizzaDataCollection $pizzas
     * @return OrderData
     */
    public function setPizzas(PizzaDataCollection $pizzas): OrderData
    {
        $this->pizzas = $pizzas;
        return $this;
    }
}
