<?php


namespace App\Repository\Dto;


class OrderData
{
    private AddressData $address;
    private int $userId;

    private CartData $cartData;

    private string $createdAt;

    /**
     * @return AddressData
     */
    public function getAddress(): AddressData
    {
        return $this->address;
    }

    /**
     * @param AddressData $address
     * @return OrderData
     */
    public function setAddress(AddressData $address): OrderData
    {
        $this->address = $address;
        return $this;
    }

    /**
     * @return int
     */
    public function getUserId(): int
    {
        return $this->userId;
    }

    /**
     * @param int $userId
     * @return OrderData
     */
    public function setUserId(int $userId): OrderData
    {
        $this->userId = $userId;
        return $this;
    }

    /**
     * @return CartData
     */
    public function getCartData(): CartData
    {
        return $this->cartData;
    }

    /**
     * @param CartData $cartData
     * @return OrderData
     */
    public function setCartData(CartData $cartData): OrderData
    {
        $this->cartData = $cartData;
        return $this;
    }

    /**
     * @return string
     */
    public function getCreatedAt(): string
    {
        return $this->createdAt;
    }

    /**
     * @param string $createdAt
     * @return OrderData
     */
    public function setCreatedAt(string $createdAt): OrderData
    {
        $this->createdAt = $createdAt;
        return $this;
    }
}
