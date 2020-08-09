<?php

namespace App\Http\Controllers;

use App\Currency\Converter;
use App\Currency\CurrencyEnum;
use App\Http\Requests\PlaceOrderRequest;
use App\Repository\Dto\AddressData;
use App\Repository\Dto\CartData;
use App\Repository\Dto\OrderData;
use App\Repository\Dto\PizzaData;
use App\Repository\Dto\PizzaDataCollection;
use App\Repository\EloquentOrderRepository;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function place(PlaceOrderRequest $request, EloquentOrderRepository $orderRepository)
    {
        $orderData = $this->packOrderData($request);

        $orderRepository->place($orderData);

        return response()->json([
            "success" => true
        ]);
    }

    private function packOrderData(PlaceOrderRequest $request) : OrderData
    {
        $orderData = new OrderData();
        if ($user = auth('api')->user()) {
            $orderData->setUserId($user->id);
        }

        $pizzaDataCollection = $this->makePizzaDataCollection($request);

        $cartData = $this->makeCartData($request, $pizzaDataCollection);

        $addressData = $this->makeAddressData($request);

        $orderData
            ->setAddress($addressData)
            ->setCartData($cartData);

        return $orderData;
    }

    private function makeCartData(PlaceOrderRequest $request, PizzaDataCollection $pizzaDataCollection)
    {
        return (new CartData())
            ->setCurrencyCode($request->currency)
            ->setPizzaDataCollection($pizzaDataCollection);
    }

    private function makePizzaDataCollection(PlaceOrderRequest $request) : PizzaDataCollection
    {
        $pizzaDataCollection = new PizzaDataCollection();
        foreach ($request->pizzas as $pizza) {
            $pizzaDataCollection->add(
                (new PizzaData())
                    ->setId($pizza["id"])
                    ->setCartQuantity($pizza["quantity"])
            );
        }
        return $pizzaDataCollection;
    }

    private function makeAddressData(PlaceOrderRequest $request) : AddressData
    {
        $addressData = new AddressData();
        if ($request->address_id) {
            $addressData->setId($request->address_id);
        } else {
            if ($user = auth('api')->user()) {
                $addressData->setUserId($user->id);
            }
            $addressData
                ->setZip($request->address["zip"])
                ->setStreetAddress($request->address["street_address"])
                ->setApartment($request->address["apartment"]);
        }
        return $addressData;
    }

    public function showPlacedByUser(EloquentOrderRepository $orderRepository)
    {
        $orderDataCollection = $orderRepository->showPlacedByUser(
            Auth::id()
        );

        return response()->json([
            "success" => true,
            "items" => $orderDataCollection->toArray()
        ]);
    }

    public function showDeliveryCost()
    {
        return response()->json([
            "success" => true,
            "items" => [
                CurrencyEnum::USD()->getValue() => config("app.delivery_cost_usd"),
                CurrencyEnum::EUR()->getValue() => Converter::calculateCostInCurrency(
                    config("app.delivery_cost_usd"),
                    CurrencyEnum::EUR()
                )
            ]
        ]);
    }
}
