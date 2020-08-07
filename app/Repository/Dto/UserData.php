<?php


namespace App\Repository\Dto;


class UserData
{
    private int $id;
    private string $name;
    private string $email;
    private string $password;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return UserData
     */
    public function setId(int $id): UserData
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
     * @return UserData
     */
    public function setName(string $name): UserData
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     * @return UserData
     */
    public function setEmail(string $email): UserData
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * @param string $password
     * @return UserData
     */
    public function setPassword(string $password): UserData
    {
        $this->password = $password;
        return $this;
    }
}
