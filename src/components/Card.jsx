import './Card.css';
import PropTypes from "prop-types";
import memoryGamesLogo from "../assets/img/Memory_Game_logo.png";
export default function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (disabled) return;
    handleChoice(card)
  }
  return (
    <div className={flipped ? "flipped card" : "card"}>
      <img className="card_front" src={card.src} alt="card-Img" />
      <img
        className="card_back"
        src={memoryGamesLogo}
        alt="Memory Game"
        onClick={handleClick}
        disabled={disabled}
      />
    </div>
  );
}
Card.propTypes = {
  card: PropTypes.shape({
    src: PropTypes.string.isRequired,
  }).isRequired,
  handleChoice: PropTypes.func.isRequired,
  flipped: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};
