<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("carts", function (Blueprint $table) {
            $table->id();
            $table->string("currency_code", 10);
            $table->decimal("delivery_cost", 8, 2);
        });
        Schema::create("carts_pizzas", function (Blueprint $table) {
            $table->unsignedBigInteger("cart_id");
            $table->unsignedBigInteger("pizza_id");
            $table->decimal("price", 8, 2);
            $table->foreign("cart_id")->references("id")->on("carts");
            $table->foreign("pizza_id")->references("id")->on("pizzas");
        });
        Schema::table("orders", function (Blueprint $table) {
            $table->unsignedBigInteger("cart_id");
            $table->foreign("cart_id")->references("id")->on("carts");
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
        Schema::table("orders", function (Blueprint $table) {
            $table->dropForeign("cart_id");
            $table->dropColumn("cart_id");
        });
        Schema::dropIfExists("carts_pizzas");
        Schema::dropIfExists("carts");
        Schema::enableForeignKeyConstraints();
    }
}
