<?php


namespace App\Repository;

use App\Model\Ingredient;
use App\Model\Pizza;
use App\Repository\Dto\IngredientData;
use App\Repository\Dto\IngredientDataCollection;
use App\Repository\Dto\PizzaData;
use App\Repository\Dto\PizzaDataCollection;

class EloquentPizzaRepository implements PizzaRepositoryInterface
{

    public function all() : PizzaDataCollection
    {
        $pizzas = Pizza::with("ingredients")->get();
        $pizzaCollection = new PizzaDataCollection();

        $pizzas->each(function (Pizza $pizza) use ($pizzaCollection) {
            $pizzaCollection->add(
                (new PizzaData())
                ->setId($pizza->id)
                ->setName($pizza->name)
                ->setDescription($pizza->description)
                ->setPriceUsd($pizza->price_usd)
                ->setImageUrl($pizza->getFullImagePath())
                ->setIngredientsCollection(
                    $this->makeIngredientsCollection($pizza)
                )
            );
        });

        return $pizzaCollection;
    }

    protected function makeIngredientsCollection(Pizza $pizza)
    {
        $ingredientsCollection = new IngredientDataCollection();
        $pizza->getRelation("ingredients")->each(
            function (Ingredient $ingredient) use ($ingredientsCollection) {
                $ingredientsCollection->add(
                    (new IngredientData())
                        ->setId($ingredient->id)
                        ->setName($ingredient->name)
                );
            }
        );
        return $ingredientsCollection;
    }
}
