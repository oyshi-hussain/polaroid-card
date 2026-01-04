import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function Card() {

    const { id } = useParams();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCard = async () => {
            const docRef = doc(db, "cards", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setCard(docSnap.data());
            }

            setLoading(false);
        };

        fetchCard();

    }, [id]);

    if (loading) return <p>Loading card...</p>;
    if (!card) return <p>Card not found</p>;

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
    <h1>Polaroid Card</h1>

    <div>
      <img
        src={card.imageURL}
        alt="Polaroid"
        style={{ width: "250px", borderRadius: "8px" }}
      />
      <p>{card.message}</p>
    </div>
  </div>
  );
}

export default Card