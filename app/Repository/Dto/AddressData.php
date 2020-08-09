<?php


namespace App\Repository\Dto;


class AddressData
{
    private int $id;
    private int $zip;
    private string $streetAddress;
    private int $apartment;
    private int $userId;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return AddressData
     */
    public function setId(int $id): AddressData
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return int
     */
    public function getZip(): int
    {
        return $this->zip;
    }

    /**
     * @param int $zip
     * @return AddressData
     */
    public function setZip(int $zip): AddressData
    {
        $this->zip = $zip;
        return $this;
    }

    /**
     * @return string
     */
    public function getStreetAddress(): string
    {
        return $this->streetAddress;
    }

    /**
     * @param string $streetAddress
     * @return AddressData
     */
    public function setStreetAddress(string $streetAddress): AddressData
    {
        $this->streetAddress = $streetAddress;
        return $this;
    }

    /**
     * @return int
     */
    public function getApartment(): int
    {
        return $this->apartment;
    }

    /**
     * @param int $apartment
     * @return AddressData
     */
    public function setApartment(int $apartment): AddressData
    {
        $this->apartment = $apartment;
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
     * @return AddressData
     */
    public function setUserId(int $userId): AddressData
    {
        $this->userId = $userId;
        return $this;
    }

    public function toArray() : array
    {
        return [
            "id" => $this->getId(),
            "zip" => $this->getZip(),
            "street_address" => $this->getStreetAddress(),
            "apartment" => $this->getApartment(),
            "user_id" => $this->getUserId()
        ];
    }
}
