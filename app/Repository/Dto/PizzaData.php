<?php


namespace App\Repository\Dto;


class PizzaData
{
    private int $id;
    private string $name;
    private string $description;
    private float $priceUsd;
    private float $priceEur;
    private string $imageUrl;

    private IngredientDataCollection $ingredientsCollection;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return PizzaData
     */
    public function setId(int $id): PizzaData
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return PizzaData
     */
    public function setName(string $name): PizzaData
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * @param string $description
     * @return PizzaData
     */
    public function setDescription(string $description): PizzaData
    {
        $this->description = $description;
        return $this;
    }

    /**
     * @return float
     */
    public function getPriceUsd(): float
    {
        return $this->priceUsd;
    }

    /**
     * @param float $priceUsd
     * @return PizzaData
     */
    public function setPriceUsd(float $priceUsd): PizzaData
    {
        $this->priceUsd = $priceUsd;
        return $this;
    }

    /**
     * @return float
     */
    public function getPriceEur(): float
    {
        return $this->priceEur;
    }

    /**
     * @param float $priceEur
     * @return PizzaData
     */
    public function setPriceEur(float $priceEur): PizzaData
    {
        $this->priceEur = $priceEur;
        return $this;
    }

    /**
     * @return string
     */
    public function getImageUrl(): string
    {
        return $this->imageUrl;
    }

    /**
     * @param string $imageUrl
     * @return PizzaData
     */
    public function setImageUrl(string $imageUrl): PizzaData
    {
        $this->imageUrl = $imageUrl;
        return $this;
    }

    /**
     * @return array
     */
    public function getIngredientsCollection(): IngredientDataCollection
    {
        return $this->ingredientsCollection;
    }

    /**
     * @param array $ingredientsCollection
     * @return PizzaData
     */
    public function setIngredientsCollection(IngredientDataCollection $ingredientsCollection): PizzaData
    {
        $this->ingredientsCollection = $ingredientsCollection;
        return $this;
    }
}
