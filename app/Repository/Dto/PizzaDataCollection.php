<?php


namespace App\Repository\Dto;


use Closure;

class PizzaDataCollection
{
    private array $pizzaDataObjects;

    public function add(PizzaData $pizzaData) : void
    {
        $this->pizzaDataObjects[] = $pizzaData;
    }

    public function toArray(): array
    {
        return (isset($this->pizzaDataObjects))
            ? array_map(function (PizzaData $pizzaData) {
                return [
                    "id" => $pizzaData->getId(),
                    "name" => $pizzaData->getName(),
                    "description" => $pizzaData->getDescription(),
                    "price_usd" => $pizzaData->getPriceUsd(),
                    "price_eur" => $pizzaData->getPriceEur(),
                    "ingredients" => $pizzaData->getIngredientsCollection()->toArray()
                ];
            }, $this->pizzaDataObjects)
            : [];
    }

    public function each(Closure $callback) : void
    {
        foreach ($this->pizzaDataObjects as $i => $pizzaData) {
            $callback($pizzaData, $i);
        }
    }

    public function pluckPriceUsd() : array
    {
        return array_map(function (PizzaData $pizzaData) {
            return $pizzaData->getPriceUsd();
        }, $this->pizzaDataObjects);
    }
}
