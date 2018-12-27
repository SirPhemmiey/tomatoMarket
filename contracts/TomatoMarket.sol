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
        Fresh,
        Rotten
    }
    event TomatoAdded (string message);

    function getTomatoCount () public view returns (uint8) {
        return tomatoCount;
    }

    function addTomato(string memory displayName, string memory description, uint8 price, TomatoStatus status, string memory photoHash) public {
        tomatoes[tomatoCount] = Tomato(tomatoCount, displayName, description, price, status, photoHash);
        tomatoIds.push(tomatoCount);
        tomatoCount++;
        emit TomatoAdded("Tomato Added");
    }

    function getTomato(uint8 tomatoId) public view returns (string memory displayName, string memory description, uint8 price, string memory photoHash) {
        Tomato memory currentTomato = tomatoes[tomatoId];
        return (currentTomato.displayName, currentTomato.description, currentTomato.price, currentTomato.photoHash);
    }

}