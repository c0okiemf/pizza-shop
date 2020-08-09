<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get("pizza", "PizzaController@all");
Route::get("order/delivery-cost", "OrderController@showDeliveryCost");

Route::post("order", "OrderController@place");


Route::group(["middleware" => "auth:api"], function () {
    Route::get("address", "AddressController@showUserAddresses");
    Route::get("order", "OrderController@showPlacedByUser");
});

Route::group(
    [
        "prefix" => "auth"
    ],
    function () {
        Route::post("login", "AuthController@login");
        Route::post("register", "AuthController@register");

        Route::group(
            [
                "middleware" => "auth:api"
            ],
            function () {
                Route::get("logout", "AuthController@logout");
            }
        );
    }
);
