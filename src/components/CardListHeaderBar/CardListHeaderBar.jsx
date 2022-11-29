import "./cardListHeaderBar.scss";
const CardListHeaderBar = ({ onFilter, onSort, sortValue }) => {
  const prefixFilter = "Order By";
  return (
    <div className="container">
      <input type="text" onChange={onFilter} placeholder="Type to filter..." />
      <select className="sort-select" value={sortValue} onChange={onSort}>
        <option value="name">{prefixFilter} Name</option>
        <option value="email">{prefixFilter} Email </option>
        <option value="phone">{prefixFilter} Phone </option>
        <option value="location">{prefixFilter} Location </option>
      </select>
    </div>
  );
};
export default CardListHeaderBar;
