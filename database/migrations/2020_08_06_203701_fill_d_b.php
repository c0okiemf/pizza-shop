<?php

use App\Model\Ingredient;
use App\Model\Pizza;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class FillDB extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $ingredients = [
            "Pineapple", "Caramel Sauce", "Cheese Sauce", "Mozzarella", "Pepperoni", "Tomatoes", "Bacon", "Beef",
            "Mushrooms", "Bell Pepper", "Chicken", "Onion", "Pork", "Sausage", "Carbonara Sauce", "Parmesan",
            "Roquefort", "Cheddar"
        ];
        DB::table('ingredients')->insert(
            array_map(function ($el) {
                return [
                    "name" => $el
                ];
            }, $ingredients)
        );

        $pizzas = [
            ["Pineapely",          "The most pineapple pizza you've ever tried!",  20, "Pineapely.jpg"],
            ["Pepperoni",          "Aah, classic...",                              15, "Pepperoni.jpg"],
            ["Margherita Plus",    "Fresh tomatoes with cheese.",                  13, "MargheritaPlus.jpg"],
            ["Reactive's Special", "This is THE pizza.",                           25, "ReactivesSpecial.jpg"],
            ["Margherita",         "If you like cheese with bread, there you go.", 12, "Margherita.jpg"],
            ["Homely",             "Tastes like home.",                            20, "Homely.jpg"],
            ["Hawaiian",           "Basically like Pineapely, but with meat.",     20, "Hawaiian.jpg"],
            ["4 Cheeses",          "If you like cheese, we got you covered",       20, "4Cheeses.jpg"],
        ];
        DB::table('pizzas')->insert(
            array_map(function ($el) {
                return [
                    "name" => $el[0],
                    "description" => $el[1],
                    "price_usd" => $el[2],
                    "image_name" => $el[3],
                ];
            }, $pizzas)
        );

        $pinapelyIngredients = Pizza::whereName("Pineapely")->first()->ingredients();
        foreach (["Pineapple", "Caramel Sauce", "Cheese Sauce", "Mozzarella"] as $ingredientName) {
            $pinapelyIngredients->attach(Ingredient::whereName($ingredientName)->first()->id);
        }

        $pepperoniIngredients = Pizza::whereName("Pepperoni")->first()->ingredients();
        foreach (["Pepperoni", "Mozzarella"] as $ingredientName) {
            $pepperoniIngredients->attach(Ingredient::whereName($ingredientName)->first()->id);
        }

        $margheritaPlusIngredients = Pizza::whereName("Margherita Plus")->first()->ingredients();
        foreach (["Tomatoes", "Mozzarella"] as $ingredientName) {
            $margheritaPlusIngredients->attach(Ingredient::whereName($ingredientName)->first()->id);
        }

        $reactivesSpecialIngredients = Pizza::whereName("Reactive's Special")->first()->ingredients();
        foreach (
            ["Bacon", "Beef", "Mushrooms", "Bell Pepper", "Chicken", "Onion", "Pork", "Mozzarella"] as $ingredientName
        ) {
            $reactivesSpecialIngredients->attach(Ingredient::whereName($ingredientName)->first()->id);
        }

        $margheritaIngredients = Pizza::whereName("Margherita")->first()->ingredients();
        $margheritaIngredients->attach(Ingredient::whereName("Mozzarella")->first()->id);

        $homelyIngredients = Pizza::whereName("Homely")->first()->ingredients();
        foreach (["Sausage", "Tomatoes", "Cheese Sauce", "Mozzarella"] as $ingredientName) {
            $homelyIngredients->attach(Ingredient::whereName($ingredientName)->first()->id);
        }

        $hawaiianIngredients = Pizza::whereName("Hawaiian")->first()->ingredients();
        foreach (["Pineapple", "Sausage", "Mozzarella"] as $ingredientName) {
            $hawaiianIngredients->attach(Ingredient::whereName($ingredientName)->first()->id);
        }

        $fourCheesesIngredients = Pizza::whereName("4 Cheeses")->first()->ingredients();
        foreach (["Roquefort", "Cheddar", "Parmesan", "Mozzarella"] as $ingredientName) {
            $fourCheesesIngredients->attach(Ingredient::whereName($ingredientName)->first()->id);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('pizzas_ingredients')->truncate();
        DB::table('ingredients')->truncate();
        DB::table('pizzas')->truncate();
    }
}
