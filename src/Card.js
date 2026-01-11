import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import frame from "./assets/Frame.png";

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

    <div className="polaroidWrap">
      <div className="photoWindow">
      <img
        src={card.imageURL}
        alt="Polaroid"
      />
      </div>
      <img
      className="polaroidFrame"
      src={frame}
      alt="Polaroid Frame"
      />
      <p className="polaroidMessage">{card.message}</p>
    </div>
    <a href="/" style={{display: "inline-block", marginTop: "20px" }}>
    Create your own Polaroid!
    </a>
  </div>
  );
}

export default Card