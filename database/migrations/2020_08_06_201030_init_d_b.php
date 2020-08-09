<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InitDB extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("pizzas", function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("description", 1000);
            $table->string("image_name", 100);
            $table->decimal("price_usd", 8, 2);
        });
        Schema::create("ingredients", function (Blueprint $table) {
            $table->id();
            $table->string("name");
        });
        Schema::create("pizzas_ingredients", function (Blueprint $table) {
             $table->unsignedBigInteger("pizza_id");
             $table->unsignedBigInteger("ingredient_id");
             $table->foreign("pizza_id")->references("id")->on("pizzas");
             $table->foreign("ingredient_id")->references("id")->on("ingredients");
        });
        Schema::create("addresses", function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger("zip");
            $table->string("street_address");
            $table->unsignedInteger("apartment")->nullable();
            $table->unsignedBigInteger("user_id")->nullable();
            $table->foreign("user_id")->references("id")->on("users");
        });
        Schema::create("orders", function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id")->nullable();
            $table->unsignedBigInteger("address_id");
            $table->foreign("user_id")->references("id")->on("users");
            $table->foreign("address_id")->references("id")->on("addresses");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists("orders");
        Schema::dropIfExists("addresses");
        Schema::dropIfExists("pizzas_ingredients");
        Schema::dropIfExists("ingredients");
        Schema::dropIfExists("pizzas");
        Schema::enableForeignKeyConstraints();
    }
}
