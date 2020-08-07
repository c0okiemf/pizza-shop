<?php


namespace App\Repository;


use App\Repository\Dto\PizzaDataCollection;

interface PizzaRepositoryInterface
{
    public function all() : PizzaDataCollection;
}
