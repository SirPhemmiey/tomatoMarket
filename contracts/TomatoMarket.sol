pragma solidity 0.5.0;

contract TomatoMarket {

    struct Tomato {
        uint8 id;
        string displayName;
        string description;
        uint8 price;
        TomatoStatus status;
        string photoHash;
    }

    uint8 tomatoCount;
    uint8[] tomatoIds;
    mapping (uint => Tomato) tomatoes;

    enum TomatoStatus {
        Rotten,
        Fresh
    }
    event TomatoAdded (string message);

    function getTomatoCount () public view returns (uint8) {
        return tomatoCount;
    }

    function addTomato(string memory displayName, string memory description, uint8 price, TomatoStatus status, string memory photoHash) public {

    }

}