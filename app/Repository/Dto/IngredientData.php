<?php


namespace App\Repository\Dto;


class IngredientData
{
    private int $id;
    private string $name;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return IngredientData
     */
    public function setId(int $id): IngredientData
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
     * @return IngredientData
     */
    public function setName(string $name): IngredientData
    {
        $this->name = $name;
        return $this;
    }
}
