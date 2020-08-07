<?php


namespace App\Repository\Dto;


use Closure;

class IngredientDataCollection
{
    private array $ingredientDataObjects;

    public function add(IngredientData $ingredientData) : void
    {
        $this->ingredientDataObjects[] = $ingredientData;
    }

    public function toArray() : array
    {
        return (isset($this->ingredientDataObjects))
            ? array_map(function (IngredientData $ingredientData) {
                return [
                    "id" => $ingredientData->getId(),
                    "name" => $ingredientData->getName(),
                ];
            }, $this->ingredientDataObjects)
            : [];
    }

    public function each(Closure $callback) : void
    {
        foreach ($this->ingredientDataObjects as $i => $ingredientData) {
            $callback($ingredientData, $i);
        }
    }
}
