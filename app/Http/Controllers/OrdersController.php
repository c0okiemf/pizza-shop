<?php

namespace App\Http\Controllers;

use App\Http\Clients\ExchangeRatesApiUsdToEurClient;
use App\Http\Requests\OrderRequest;
use App\Repository\Dto\AddressData;
use App\Repository\Dto\OrderData;
use App\Repository\Dto\PizzaData;
use App\Repository\Dto\PizzaDataCollection;
use App\Repository\EloquentOrderRepository;
use App\Repository\EloquentPizzaRepository;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Auth;

class OrdersController extends Controller
{
    public function place(OrderRequest $request, EloquentOrderRepository $orderRepository)
    {
        $orderData = new OrderData();
        if ($id = Auth::id()) {
            $orderData->setUserId($id);
        }

        $pizzaDataCollection = new PizzaDataCollection();
        foreach ($request->pizzas_ids as $pizzaId) {
            $pizzaDataCollection->add(
                (new PizzaData())
                    ->setId($pizzaId)
            );
        }
        $orderData->setPizzas($pizzaDataCollection);

        $addressData = new AddressData();
        if ($request->address_id) {
            $addressData->setId($request->address_id);
        } else {
            if ($id = Auth::id()) {
                $addressData->setUserId($id);
            }
            $addressData
                ->setZip($request->get("address.zip"))
                ->setStreetAddress($request->get("address.street_address"))
                ->setApartment($request->get("address.apartment"));
        }

        $orderRepository->place($orderData);

        return response()->json([
            'success' => true
        ]);
    }
}
