import React from "react";

const cardsData = [
  { id: 1, title: "Card 1" },
  { id: 2, title: "Card 2" },
  { id: 3, title: "Card 3" },
  { id: 4, title: "Card 4" },
  { id: 5, title: "Card 5" },
  { id: 6, title: "Card 6" },
  { id: 7, title: "Card 7" },
  { id: 8, title: "Card 7" },
  { id: 9, title: "Card 7" },
];

function Page() {
  return (
    <div
      style={{
        display: "flex",
        height: "316px",
        width: "600px",
        overflowX: "scroll",
        overscrollBehaviorX: "contain",
        scrollSnapType: "x proximity",
      }}
    >
      <div className="flex flex-row gap-4 border justify-center">
        {cardsData.map((card) => (
          <div key={card.id} className="w-28 h-40 bg-gray-400">
            {card.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
