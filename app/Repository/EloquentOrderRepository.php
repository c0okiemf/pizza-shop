<?php


namespace App\Repository;


use App\Currency\Converter;
use App\Currency\CurrencyEnum;
use App\Http\Clients\CachedClient;
use App\Http\Clients\ExchangeRatesApiUsdToEurClient;
use App\Model\Address;
use App\Model\Cart;
use App\Model\Ingredient;
use App\Model\Order;
use App\Model\Pizza;
use App\Model\User;
use App\Repository\Dto\AddressData;
use App\Repository\Dto\CartData;
use App\Repository\Dto\IngredientData;
use App\Repository\Dto\IngredientDataCollection;
use App\Repository\Dto\OrderData;
use App\Repository\Dto\OrderDataCollection;
use App\Repository\Dto\PizzaData;
use App\Repository\Dto\PizzaDataCollection;
use Error;
use Illuminate\Database\Eloquent\Collection;

class EloquentOrderRepository implements OrderRepositoryInterface
{

    public function place(OrderData $orderData): void
    {
        $addressId = $this->makeAddressOrFindExisting($orderData);
        $cart = $this->makeCart($orderData);
        $this->makeOrder($orderData, $addressId, $cart->id);
    }

    private function makeAddressOrFindExisting(OrderData $orderData) : int
    {
        $addressData = $orderData->getAddress();

        try {
            $addressId = $addressData->getId();
        } catch (Error $e) {
            $addressId = $this->makeAddress($addressData);
        }
        return $addressId;
    }

    private function makeCart(OrderData $orderData) : Cart
    {
        $cartData = $orderData->getCartData();
        $cart = new Cart();
        $cart->currency_code = $cartData->getCurrencyCode();
        $cart->delivery_cost = Converter::calculateCostInCurrency(
            config("app.delivery_cost_usd"),
            new CurrencyEnum($cartData->getCurrencyCode())
        );
        $cart->save();
        $this->attachPizzasToCart($cartData, $cart);
        return $cart;
    }



    private function attachPizzasToCart(CartData $cartData, Cart $cart) : void
    {
        $pizzaPrices = $this->extractPizzaPrices($cartData);
        $cartData->getPizzaDataCollection()->each(
            function (PizzaData $pizzaData) use ($cart, $pizzaPrices, $cartData) {
                $cart->pizzas()->attach(
                    $pizzaData->getId(),
                    [
                        "price" => Converter::calculateCostInCurrency(
                            $pizzaPrices[$pizzaData->getId()]["price_usd"],
                            new CurrencyEnum($cartData->getCurrencyCode())
                        ),
                        "quantity" => $pizzaData->getCartQuantity()
                    ]
                );
            }
        );
    }

    private function extractPizzaPrices(CartData $cartData)
    {
        return Pizza::select(["id", "price_usd"])
            ->whereIn("id", $cartData->getPizzaDataCollection()->getIds())
            ->get()
            ->keyBy("id")
            ->toArray();
    }

    private function makeAddress(AddressData $addressData) : int
    {
        $address = new Address();
        $address->zip = $addressData->getZip();
        $address->street_address = $addressData->getStreetAddress();
        $address->apartment = $addressData->getApartment();

        try {
            $address->user_id = $addressData->getUserId();
        } catch (Error $e) {}

        $address->save();
        return $address->id;
    }

    private function makeOrder(OrderData $orderData, int $addressId, int $cartId) : Order
    {
        $order = new Order();

        try {
            $order->user_id = $orderData->getUserId();
        } catch (Error $e) {}

        $order->address_id = $addressId;
        $order->cart_id = $cartId;
        $order->save();
        return $order;
    }

    public function showPlacedByUser(int $userId): OrderDataCollection
    {
        $orderDataCollection = (new OrderDataCollection())
            ->setUserId($userId);
        $userId = $orderDataCollection->getUserId();
        $user = User::find($userId);
        $userOrders = $user->orders;
        return $this->fillOrderCollection(
            $orderDataCollection,
            $userOrders
        );
    }

    private function fillOrderCollection(
        OrderDataCollection $orderDataCollection,
        Collection $userOrders
    ) {
        $userOrders->each(function (Order $order) use ($orderDataCollection) {
            $orderDataCollection->add(
                $this->makeOrderData($order)
            );
        });
        return $orderDataCollection;
    }

    private function makeOrderData(Order $order) : OrderData
    {
        return (new OrderData())
            ->setUserId($order->user_id)
            ->setAddress($this->makeAddressData($order))
            ->setCartData($this->makeCartData($order));
    }

    private function makeCartData(Order $order) : CartData
    {
        $cart = $order->cart;
        return (new CartData())
            ->setId($cart->id)
            ->setCurrencyCode($cart->currency_code)
            ->setDeliveryCost($cart->delivery_cost)
            ->setPizzaDataCollection($this->makePizzaDataCollection($cart));
    }

    private function makePizzaDataCollection(Cart $cart): PizzaDataCollection
    {
        $pizzaDataCollection = new PizzaDataCollection();
        $cart
            ->pizzas()
            ->withPivot(["price", "quantity"])
            ->each(
                function (Pizza $pizza) use ($pizzaDataCollection) {
                    $pizzaDataCollection->add(
                        $this->makePizzaData($pizza)
                    );
                }
            );
        return $pizzaDataCollection;
    }

    private function makePizzaData(Pizza $pizza): PizzaData
    {
        return (new PizzaData())
            ->setId($pizza->id)
            ->setName($pizza->name)
            ->setPriceUsd($pizza->price_usd)
            ->setCartPrice($pizza->getRelation("pivot")->price)
            ->setCartQuantity($pizza->getRelation("pivot")->quantity)
            ->setDescription($pizza->description)
            ->setImageUrl($pizza->getFullImagePath())
            ->setIngredientsCollection(
                $this->makeIngredientCollection($pizza)
            );
    }

    private function makeAddressData(Order $order) : AddressData
    {
        $address = $order->address;
        return (new AddressData())
            ->setId($address->id)
            ->setUserId($address->user_id)
            ->setZip($address->zip)
            ->setStreetAddress($address->street_address)
            ->setApartment($address->apartment);
    }

    private function makeIngredientCollection(Pizza $pizza) : IngredientDataCollection
    {
        $ingredientDataCollection = new IngredientDataCollection();
        $pizza->ingredients->each(function (Ingredient $ingredient) use ($ingredientDataCollection) {
            $ingredientData = (new IngredientData())
                ->setId($ingredient->id)
                ->setName($ingredient->name);
            $ingredientDataCollection->add($ingredientData);
        });
        return $ingredientDataCollection;
    }
}
