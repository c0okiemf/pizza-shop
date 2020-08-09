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

    public function toArray() : array
    {
        return (isset($this->pizzaDataObjects))
            ? array_map(function (PizzaData $pizzaData) {
                return $pizzaData->toArray();
            }, $this->pizzaDataObjects)
            : [];
    }

    public function getIds() : array
    {
        return array_map(function (PizzaData $pizzaData) {
            return $pizzaData->getId();
        }, $this->pizzaDataObjects);
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
