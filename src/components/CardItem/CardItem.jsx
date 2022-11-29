import { useState } from "react";
import "./cardItem.scss";
import editProfileLogo from "../../assets/img/edit-profile.jpeg";
import saveProfileLogo from "../../assets/img/save-profile.png";
const CardItem = ({ cardData, onChange }) => {
  const [isEditModeOn, setEditModeOn] = useState(false);

  const handleEditCard = () => {
    setEditModeOn(true);
  };

  const handleSaveCard = () => {
    setEditModeOn(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        {isEditModeOn ? (
          <img
            src={saveProfileLogo}
            onClick={handleSaveCard}
            className="save-ico"
            width={14}
            height={12}
            alt="edit-profile"
          />
        ) : (
          <img
            src={editProfileLogo}
            onClick={handleEditCard}
            className="edit-ico"
            width={18}
            height={18}
            alt="edit-profile"
          />
        )}
        {isEditModeOn ? (
          <input
            className={"edit-input"}
            value={cardData.name}
            onChange={(e) => onChange(e, cardData.id, "name")}
          />
        ) : (
          <div className="card-title">{cardData.name}</div>
        )}
      </div>
      <div
        className="pictureCircleContainer"
        style={{
          backgroundImage: `url(${cardData.picture})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <div className="card-item">
        {isEditModeOn ? (
          <input
            className={"edit-input"}
            value={cardData.email}
            onChange={(e) => onChange(e, cardData.id, "email")}
          />
        ) : (
          cardData.email
        )}
      </div>
      <div className="card-item">
        {isEditModeOn ? (
          <input
            className={"edit-input"}
            value={cardData.phone}
            onChange={(e) => onChange(e, cardData.id, "phone")}
          />
        ) : (
          cardData.phone
        )}
      </div>
      <div className="card-item">
        {isEditModeOn ? (
          <input
            className={"edit-input"}
            value={cardData.location}
            onChange={(e) => onChange(e, cardData.id, "location")}
          />
        ) : (
          cardData.location
        )}
      </div>
    </div>
  );
};
export default CardItem;
