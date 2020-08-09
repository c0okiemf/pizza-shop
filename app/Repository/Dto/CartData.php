<?php


namespace App\Repository\Dto;


class CartData
{
    private int $id;
    private float $deliveryCost;
    private string $currencyCode;

    private PizzaDataCollection $pizzaDataCollection;

    /**
     * @return string
     */
    public function getCurrencyCode(): string
    {
        return $this->currencyCode;
    }

    /**
     * @param string $currencyCode
     * @return CartData
     */
    public function setCurrencyCode(string $currencyCode): CartData
    {
        $this->currencyCode = $currencyCode;
        return $this;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return CartData
     */
    public function setId(int $id): CartData
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return float
     */
    public function getDeliveryCost(): float
    {
        return $this->deliveryCost;
    }

    /**
     * @param float $deliveryCost
     * @return CartData
     */
    public function setDeliveryCost(float $deliveryCost): CartData
    {
        $this->deliveryCost = $deliveryCost;
        return $this;
    }

    /**
     * @return PizzaDataCollection
     */
    public function getPizzaDataCollection(): PizzaDataCollection
    {
        return $this->pizzaDataCollection;
    }

    /**
     * @param PizzaDataCollection $pizzaDataCollection
     * @return CartData
     */
    public function setPizzaDataCollection(PizzaDataCollection $pizzaDataCollection): CartData
    {
        $this->pizzaDataCollection = $pizzaDataCollection;
        return $this;
    }

    public function toArray() : array
    {
        return [
            "id" => $this->getId(),
            "delivery_cost" => $this->getDeliveryCost(),
            "currency_code" => $this->getCurrencyCode(),
            "pizzas" => $this->getPizzaDataCollection()->toArray()
        ];
    }
}
